/**
 * routes/audit.js
 * GET /api/audit — 이력 조회
 *
 * logAudit() — 다른 라우터에서 import하여 사용
 */
const express = require('express');
const router  = express.Router();
const pool    = require('../db');

/**
 * 이력 기록 헬퍼 함수
 * @param {string} actor       - 행위자 (추후 인증 연동 시 실제 사용자 ID)
 * @param {string} action      - 'CREATE' | 'UPDATE' | 'DELETE'
 * @param {string} target_type - 'map_item' | 'tech' | 'cap'
 * @param {string} target_id   - 대상 레코드 ID
 * @param {object|null} before - 변경 전 데이터
 * @param {object|null} after  - 변경 후 데이터
 */
async function logAudit(actor, action, target_type, target_id, before, after) {
  try {
    await pool.query(
      `INSERT INTO audit_logs (actor, action, target_type, target_id, before_data, after_data)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        actor,
        action,
        target_type,
        String(target_id),
        before ? JSON.stringify(before) : null,
        after  ? JSON.stringify(after)  : null
      ]
    );
  } catch (err) {
    // 이력 기록 실패는 메인 트랜잭션에 영향을 주지 않도록 경고만 출력
    console.warn('audit_log 기록 실패:', err.message);
  }
}

// ── 이력 조회 API ───────────────────────────────────────────
// GET /api/audit?limit=50&target_type=tech&target_id=ct_ml
router.get('/audit', async (req, res) => {
  try {
    const limit       = Math.min(parseInt(req.query.limit) || 50, 200);
    const target_type = req.query.target_type;
    const target_id   = req.query.target_id;
    const actor       = req.query.actor;

    let query  = 'SELECT * FROM audit_logs WHERE 1=1';
    const params = [];
    let idx = 1;

    if (target_type) { query += ` AND target_type=$${idx++}`; params.push(target_type); }
    if (target_id)   { query += ` AND target_id=$${idx++}`;   params.push(target_id); }
    if (actor)       { query += ` AND actor=$${idx++}`;        params.push(actor); }

    query += ` ORDER BY created_at DESC LIMIT $${idx}`;
    params.push(limit);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('GET /api/audit 오류:', err);
    res.status(500).json({ error: '이력 조회 실패' });
  }
});

module.exports = router;
module.exports.logAudit = logAudit;
