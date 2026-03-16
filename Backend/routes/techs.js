/**
 * routes/techs.js
 * POST   /api/techs       — 유망기술 추가
 * PUT    /api/techs/:id   — 유망기술 수정 (caps 포함 전체 교체)
 * DELETE /api/techs/:id   — 유망기술 삭제
 */
const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const { logAudit } = require('./audit');
const { requireAuth } = require('../middleware/auth');

async function logAdminChange(userId, targetType, targetId, action, beforeData, afterData) {
  if (!userId) return;
  try {
    await pool.query(
      `INSERT INTO pending_changes (requester_id, target_type, target_id, action, before_data, after_data, status, reviewer_id, reviewed_at)
       VALUES ($1,$2,$3,$4,$5,$6,'approved',$1,NOW())`,
      [userId, targetType, targetId, action,
       beforeData ? JSON.stringify(beforeData) : null,
       afterData ? JSON.stringify(afterData) : null]
    );
  } catch(e) { console.warn('Admin 변경 이력 기록 실패:', e.message); }
}

/**
 * 이미지 경로 정규화
 * - base64 DataURL (data:...) → null (DB에 저장하지 않음, 업로드 미완료 상태)
 * - /Image/...  → Image/... (선행 / 제거하여 DB에 저장)
 * - ../Image/... → Image/... (선행 ../ 제거)
 * - Image/...   → 그대로
 * - null/''     → null
 */
function resolveImagePath(image) {
  if (!image) return null;
  if (image.startsWith('data:')) return null;            // base64 미업로드 → 무시
  if (image.startsWith('https://')) return image;        // Cloudinary URL → 그대로 저장
  if (image.startsWith('http://'))  return image;        // 일반 URL → 그대로 저장
  if (image.startsWith('/'))    return image.slice(1);   // /Image/... → Image/...
  if (image.startsWith('../'))  return image.slice(3);   // ../Image/... → Image/...
  return image;
}

// ── 유망기술 단건 조회 (존재 여부 확인용) ──────────────────
router.get('/techs/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT id FROM techs WHERE id=$1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: '없음' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── 유망기술 추가 ───────────────────────────────────────────
router.post('/techs', requireAuth, async (req, res) => {
  // Manager → pending_changes로 분기
  if (req.user && req.user.role === 'manager') {
    try {
      const result = await pool.query(
        `INSERT INTO pending_changes (requester_id, target_type, target_id, action, after_data)
         VALUES ($1,'tech',$2,'CREATE',$3) RETURNING *`,
        [req.user.id, req.body.id, JSON.stringify(req.body)]
      );
      return res.status(201).json({ pending: true, change_id: result.rows[0].id });
    } catch (err) {
      return res.status(500).json({ error: '변경 요청 저장 실패' });
    }
  }
  return _createTech(req, res);
});
async function _createTech(req, res) {
  const { id, item_id, title, asis, tobe, centers, mgr_a, mgr_b, sort_order, caps } = req.body;
  if (!id || !item_id || !title) {
    return res.status(400).json({ error: 'id, item_id, title 필수' });
  }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const techRes = await client.query(
      `INSERT INTO techs (id, item_id, title, asis, tobe, centers, mgr_a, mgr_b, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [id, item_id, title, asis||'', tobe||'', centers||[], mgr_a||'', mgr_b||'', sort_order||0]
    );

    // caps 삽입
    const capsResult = [];
    if (caps && caps.length) {
      for (let i = 0; i < caps.length; i++) {
        const cap = caps[i];
        const imgPath = resolveImagePath(cap.image);
        const capRow = await client.query(
          `INSERT INTO caps (tech_id, title, image_path, sort_order) VALUES ($1,$2,$3,$4) RETURNING *`,
          [id, cap.title||'', imgPath, i]
        );
        capsResult.push(capRow.rows[0]);
      }
    }

    await client.query('COMMIT');
    await logAudit(req.user?.name || 'admin', 'CREATE', 'tech', id, null, techRes.rows[0]);
    await logAdminChange(req.user?.id, 'tech', id, 'CREATE', null, techRes.rows[0]);
    res.status(201).json({ ...techRes.rows[0], caps: capsResult });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('POST /api/techs 오류:', err);
    res.status(500).json({ error: '유망기술 추가 실패' });
  } finally {
    client.release();
  }
}

// ── 유망기술 수정 ───────────────────────────────────────────
router.put('/techs/:id', requireAuth, async (req, res) => {
  if (req.user && req.user.role === 'manager') {
    try {
      const before = await pool.query('SELECT * FROM techs WHERE id=$1', [req.params.id]);
      const result = await pool.query(
        `INSERT INTO pending_changes (requester_id, target_type, target_id, action, before_data, after_data)
         VALUES ($1,'tech',$2,'UPDATE',$3,$4) RETURNING *`,
        [req.user.id, req.params.id,
         before.rows[0] ? JSON.stringify(before.rows[0]) : null,
         JSON.stringify(req.body)]
      );
      return res.json({ pending: true, change_id: result.rows[0].id });
    } catch (err) {
      return res.status(500).json({ error: '변경 요청 저장 실패' });
    }
  }
  return _updateTech(req, res);
});
async function _updateTech(req, res) {
  const { id } = req.params;
  const { title, asis, tobe, centers, mgr_a, mgr_b, caps } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const before = await client.query('SELECT * FROM techs WHERE id=$1', [id]);
    if (!before.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: '유망기술 없음' });
    }

    const techRes = await client.query(
      `UPDATE techs SET title=$1, asis=$2, tobe=$3, centers=$4, mgr_a=$5, mgr_b=$6
       WHERE id=$7 RETURNING *`,
      [title, asis||'', tobe||'', centers||[], mgr_a||'', mgr_b||'', id]
    );

    // caps 전체 교체
    if (caps !== undefined) {
      await client.query('DELETE FROM caps WHERE tech_id=$1', [id]);
      for (let i = 0; i < caps.length; i++) {
        const cap = caps[i];
        const imgPath = resolveImagePath(cap.image);
        await client.query(
          `INSERT INTO caps (tech_id, title, image_path, sort_order) VALUES ($1,$2,$3,$4)`,
          [id, cap.title||'', imgPath, i]
        );
      }
    }

    await client.query('COMMIT');
    await logAudit(req.user?.name || 'admin', 'UPDATE', 'tech', id, before.rows[0], techRes.rows[0]);
    await logAdminChange(req.user?.id, 'tech', id, 'UPDATE', before.rows[0], techRes.rows[0]);
    res.json(techRes.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('PUT /api/techs/:id 오류:', err);
    res.status(500).json({ error: '유망기술 수정 실패' });
  } finally {
    client.release();
  }
}

// ── 유망기술 삭제 ───────────────────────────────────────────
router.delete('/techs/:id', requireAuth, async (req, res) => {
  if (req.user && req.user.role === 'manager') {
    try {
      const before = await pool.query('SELECT * FROM techs WHERE id=$1', [req.params.id]);
      const result = await pool.query(
        `INSERT INTO pending_changes (requester_id, target_type, target_id, action, before_data)
         VALUES ($1,'tech',$2,'DELETE',$3) RETURNING *`,
        [req.user.id, req.params.id,
         before.rows[0] ? JSON.stringify(before.rows[0]) : null]
      );
      return res.json({ pending: true, change_id: result.rows[0].id });
    } catch (err) {
      return res.status(500).json({ error: '변경 요청 저장 실패' });
    }
  }
  return _deleteTech(req, res);
});
async function _deleteTech(req, res) {
  const { id } = req.params;
  try {
    const before = await pool.query('SELECT * FROM techs WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '유망기술 없음' });

    // ON DELETE CASCADE로 caps도 자동 삭제됨
    await pool.query('DELETE FROM techs WHERE id=$1', [id]);
    await logAudit(req.user?.name || 'admin', 'DELETE', 'tech', id, before.rows[0], null);
    await logAdminChange(req.user?.id, 'tech', id, 'DELETE', before.rows[0], null);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/techs/:id 오류:', err);
    res.status(500).json({ error: '유망기술 삭제 실패' });
  }
}

module.exports = router;
