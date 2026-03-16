/**
 * routes/mapItems.js
 * GET  /api/map            — 전체 MAP_DATA 조회 (기존 프론트 구조와 동일한 포맷)
 * POST /api/map/items      — 역량맵 아이템 추가
 * PUT  /api/map/items/:id  — 역량맵 아이템 수정
 * DELETE /api/map/items/:id — 역량맵 아이템 삭제
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

// ── 전체 MAP_DATA 조회 ──────────────────────────────────────
// 기존 dashboard.js의 MAP_DATA 구조와 동일하게 반환
router.get('/map', async (req, res) => {
  try {
    const itemsRes = await pool.query(
      'SELECT * FROM map_items ORDER BY sort_order ASC'
    );
    const techsRes = await pool.query(
      'SELECT * FROM techs ORDER BY sort_order ASC'
    );
    const capsRes = await pool.query(
      'SELECT * FROM caps ORDER BY sort_order ASC'
    );

    // caps를 tech_id 기준으로 그룹핑
    const capsByTech = {};
    for (const cap of capsRes.rows) {
      if (!capsByTech[cap.tech_id]) capsByTech[cap.tech_id] = [];
      capsByTech[cap.tech_id].push({
        id:    cap.id,
        title: cap.title,
        // Cloudinary URL은 그대로, 로컬 파일 경로는 /Image/... 형태로 변환
        image: cap.image_path
          ? (cap.image_path.startsWith('http') ? cap.image_path : '/' + cap.image_path)
          : null
      });
    }

    // techs를 item_id 기준으로 그룹핑
    const techsByItem = {};
    for (const tech of techsRes.rows) {
      if (!techsByItem[tech.item_id]) techsByItem[tech.item_id] = [];
      techsByItem[tech.item_id].push({
        id:      tech.id,
        title:   tech.title,
        asis:    tech.asis,
        tobe:    tech.tobe,
        centers: tech.centers || [],
        mgr_a:   tech.mgr_a,
        mgr_b:   tech.mgr_b,
        caps:    capsByTech[tech.id] || []
      });
    }

    // section별로 MAP_DATA 구조 조립
    const MAP_DATA = { core: [], base: [], fusion_left: [], fusion_right: [] };
    for (const item of itemsRes.rows) {
      const sec = item.section;
      if (!MAP_DATA[sec]) continue;
      MAP_DATA[sec].push({
        id:      item.id,
        name:    item.name,
        count:   item.count,
        centers: item.centers || [],
        mgr_a:   item.mgr_a,
        mgr_b:   item.mgr_b,
        techs:   techsByItem[item.id] || []
      });
    }

    res.json(MAP_DATA);
  } catch (err) {
    console.error('GET /api/map 오류:', err);
    res.status(500).json({ error: '데이터 조회 실패' });
  }
});

// ── 역량맵 아이템 추가 ──────────────────────────────────────
router.post('/map/items', requireAuth, async (req, res) => {
  const { id, section, name, count, centers, mgr_a, mgr_b, sort_order } = req.body;
  if (!id || !section || !name) {
    return res.status(400).json({ error: 'id, section, name 필수' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO map_items (id, section, name, count, centers, mgr_a, mgr_b, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [id, section, name, count||0, centers||[], mgr_a||'', mgr_b||'', sort_order||0]
    );
    await logAudit(req.user?.name || 'admin', 'CREATE', 'map_item', id, null, result.rows[0]);
    await logAdminChange(req.user?.id, 'map_item', id, 'CREATE', null, result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('POST /api/map/items 오류:', err);
    res.status(500).json({ error: '아이템 추가 실패' });
  }
});

// ── 역량맵 아이템 수정 ──────────────────────────────────────
router.put('/map/items/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, count, centers, mgr_a, mgr_b } = req.body;
  try {
    const before = await pool.query('SELECT * FROM map_items WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '아이템 없음' });

    const result = await pool.query(
      `UPDATE map_items SET name=$1, count=$2, centers=$3, mgr_a=$4, mgr_b=$5
       WHERE id=$6 RETURNING *`,
      [name, count, centers||[], mgr_a||'', mgr_b||'', id]
    );
    await logAudit(req.user?.name || 'admin', 'UPDATE', 'map_item', id, before.rows[0], result.rows[0]);
    await logAdminChange(req.user?.id, 'map_item', id, 'UPDATE', before.rows[0], result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('PUT /api/map/items/:id 오류:', err);
    res.status(500).json({ error: '아이템 수정 실패' });
  }
});

// ── 역량맵 아이템 삭제 ──────────────────────────────────────
router.delete('/map/items/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const before = await pool.query('SELECT * FROM map_items WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '아이템 없음' });

    await pool.query('DELETE FROM map_items WHERE id=$1', [id]);
    await logAudit(req.user?.name || 'admin', 'DELETE', 'map_item', id, before.rows[0], null);
    await logAdminChange(req.user?.id, 'map_item', id, 'DELETE', before.rows[0], null);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/map/items/:id 오류:', err);
    res.status(500).json({ error: '아이템 삭제 실패' });
  }
});

module.exports = router;
