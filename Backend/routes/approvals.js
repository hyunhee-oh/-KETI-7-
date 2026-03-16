const express = require('express');
const router  = express.Router();
const pool    = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { logAudit } = require('./audit');

// ── 이미지 경로 정규화 (techs.js와 동일) ──────────────────
function resolveImagePath(image) {
  if (!image) return null;
  if (image.startsWith('data:')) return null;
  if (image.startsWith('https://') || image.startsWith('http://')) return image;
  if (image.startsWith('/'))   return image.slice(1);
  if (image.startsWith('../')) return image.slice(3);
  return image;
}

// GET /api/approvals — 변경사항 목록 (Admin: 전체, Manager: 본인 것만)
router.get('/approvals', requireAuth, async (req, res) => {
  try {
    const status = req.query.status || 'pending';
    const limit  = Math.min(parseInt(req.query.limit) || 50, 200);

    let query, params;
    if (req.user.role === 'admin') {
      query = `SELECT pc.*, u.name as requester_name
               FROM pending_changes pc
               JOIN users u ON u.id = pc.requester_id
               WHERE pc.status = $1
               ORDER BY pc.created_at DESC LIMIT $2`;
      params = [status, limit];
    } else {
      query = `SELECT pc.*, u.name as requester_name
               FROM pending_changes pc
               JOIN users u ON u.id = pc.requester_id
               WHERE pc.status = $1 AND pc.requester_id = $2
               ORDER BY pc.created_at DESC LIMIT $3`;
      params = [status, req.user.id, limit];
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/approvals/pending-cards — 승인 대기 중인 카드 ID 목록
router.get('/approvals/pending-cards', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT target_type, target_id FROM pending_changes WHERE status='pending'`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/approvals — Manager가 변경사항 제출
router.post('/approvals', requireAuth, async (req, res) => {
  const { target_type, target_id, action, before_data, after_data } = req.body;
  if (!target_type || !target_id || !action) {
    return res.status(400).json({ error: 'target_type, target_id, action 필수' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO pending_changes (requester_id, target_type, target_id, action, before_data, after_data)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [req.user.id, target_type, target_id, action,
       before_data ? JSON.stringify(before_data) : null,
       after_data  ? JSON.stringify(after_data)  : null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/approvals/:id/approve — 승인 (Admin 전용)
router.post('/approvals/:id/approve', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const pcRes = await client.query('SELECT * FROM pending_changes WHERE id=$1', [id]);
    if (!pcRes.rows.length) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: '변경사항 없음' });
    }
    const pc = pcRes.rows[0];
    if (pc.status !== 'pending') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: '이미 처리된 변경사항입니다' });
    }

    // 실제 데이터 반영
    await applyChange(client, pc);

    // pending_changes 상태 업데이트
    await client.query(
      `UPDATE pending_changes SET status='approved', reviewer_id=$1, review_comment=$2, reviewed_at=NOW()
       WHERE id=$3`,
      [req.user.id, comment || '', id]
    );

    await client.query('COMMIT');
    await logAudit(req.user.name, pc.action, pc.target_type, pc.target_id, pc.before_data, pc.after_data);
    res.json({ ok: true, status: 'approved' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('승인 처리 오류:', err);
    res.status(500).json({ error: '승인 처리 실패: ' + err.message });
  } finally {
    client.release();
  }
});

// POST /api/approvals/:id/reject — 반려 (Admin 전용)
router.post('/approvals/:id/reject', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const result = await pool.query(
      `UPDATE pending_changes SET status='rejected', reviewer_id=$1, review_comment=$2, reviewed_at=NOW()
       WHERE id=$3 AND status='pending' RETURNING *`,
      [req.user.id, comment || '', id]
    );
    if (!result.rows.length) return res.status(404).json({ error: '처리할 변경사항 없음' });
    res.json({ ok: true, status: 'rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── 승인 시 실제 데이터에 반영하는 헬퍼 ──────────────────────
async function applyChange(client, pc) {
  const { target_type, target_id, action, after_data } = pc;
  const data = after_data || {};

  if (target_type === 'tech' && action === 'UPDATE') {
    await client.query(
      `UPDATE techs SET title=$1, asis=$2, tobe=$3, centers=$4, mgr_a=$5, mgr_b=$6
       WHERE id=$7`,
      [data.title, data.asis||'', data.tobe||'', data.centers||[], data.mgr_a||'', data.mgr_b||'', target_id]
    );
    if (data.caps !== undefined) {
      await client.query('DELETE FROM caps WHERE tech_id=$1', [target_id]);
      for (let i = 0; i < data.caps.length; i++) {
        const cap = data.caps[i];
        const imgPath = resolveImagePath(cap.image);
        await client.query(
          `INSERT INTO caps (tech_id, title, image_path, sort_order) VALUES ($1,$2,$3,$4)`,
          [target_id, cap.title||'', imgPath, i]
        );
      }
    }
  } else if (target_type === 'tech' && action === 'CREATE') {
    const d = data;
    await client.query(
      `INSERT INTO techs (id, item_id, title, asis, tobe, centers, mgr_a, mgr_b, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT (id) DO NOTHING`,
      [d.id, d.item_id, d.title, d.asis||'', d.tobe||'', d.centers||[], d.mgr_a||'', d.mgr_b||'', d.sort_order||0]
    );
    if (d.caps && d.caps.length) {
      for (let i = 0; i < d.caps.length; i++) {
        const cap = d.caps[i];
        await client.query(
          `INSERT INTO caps (tech_id, title, image_path, sort_order) VALUES ($1,$2,$3,$4)`,
          [d.id, cap.title||'', resolveImagePath(cap.image), i]
        );
      }
    }
  } else if (target_type === 'tech' && action === 'DELETE') {
    await client.query('DELETE FROM techs WHERE id=$1', [target_id]);
  } else if (target_type === 'map_item' && action === 'UPDATE') {
    await client.query(
      `UPDATE map_items SET name=$1, count=$2, centers=$3, mgr_a=$4, mgr_b=$5
       WHERE id=$6`,
      [data.name, data.count||0, data.centers||[], data.mgr_a||'', data.mgr_b||'', target_id]
    );
  } else if (target_type === 'map_item' && action === 'DELETE') {
    await client.query('DELETE FROM map_items WHERE id=$1', [target_id]);
  }
}

module.exports = router;
