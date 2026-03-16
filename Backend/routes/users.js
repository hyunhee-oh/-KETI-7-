const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const pool    = require('../db');
const { requireAdmin } = require('../middleware/auth');

const SALT_ROUNDS = 10;

// GET /api/users — 전체 사용자 목록 (Admin 전용)
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, is_active, created_at, updated_at FROM users ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users — 사용자 생성 (Admin 전용)
router.post('/users', requireAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: '이름과 비밀번호 필수' });
  }
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1,$2,$3,$4) RETURNING id, name, email, role, is_active, created_at`,
      [name, email || '', hash, role || 'manager']
    );
    await pool.query(
      `INSERT INTO permission_logs (actor_id, target_user_id, action, detail)
       VALUES ($1,$2,'GRANT_MANAGER',$3)`,
      [req.user.id, result.rows[0].id, JSON.stringify({ role: role || 'manager' })]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: '이미 존재하는 이름입니다' });
    }
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id — 사용자 수정 (Admin 전용)
router.put('/users/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, email, role, is_active, password } = req.body;
  try {
    const before = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '사용자 없음' });

    let query, params;
    if (password) {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      query = `UPDATE users SET name=$1, email=$2, role=$3, is_active=$4, password_hash=$5
               WHERE id=$6 RETURNING id, name, email, role, is_active, updated_at`;
      params = [name, email || '', role, is_active !== false, hash, id];
    } else {
      query = `UPDATE users SET name=$1, email=$2, role=$3, is_active=$4
               WHERE id=$5 RETURNING id, name, email, role, is_active, updated_at`;
      params = [name, email || '', role, is_active !== false, id];
    }
    const result = await pool.query(query, params);

    const oldRole = before.rows[0].role;
    const newRole = role;
    if (oldRole !== newRole) {
      await pool.query(
        `INSERT INTO permission_logs (actor_id, target_user_id, action, detail)
         VALUES ($1,$2,'CHANGE_ROLE',$3)`,
        [req.user.id, parseInt(id), JSON.stringify({ from: oldRole, to: newRole })]
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: '이미 존재하는 이름입니다' });
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/users/:id/toggle-active — 활성/비활성 토글 (Admin 전용)
router.patch('/users/:id/toggle-active', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE users SET is_active = NOT is_active, updated_at = NOW()
       WHERE id=$1 RETURNING id, name, is_active`,
      [id]
    );
    if (!result.rows.length) return res.status(404).json({ error: '사용자 없음' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id — 사용자 비활성화 (Admin 전용, 실제 삭제 안 함)
router.delete('/users/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE users SET is_active=false WHERE id=$1 RETURNING id, name, is_active', [id]
    );
    if (!result.rows.length) return res.status(404).json({ error: '사용자 없음' });
    await pool.query(
      `INSERT INTO permission_logs (actor_id, target_user_id, action, detail)
       VALUES ($1,$2,'REVOKE_MANAGER',$3)`,
      [req.user.id, parseInt(id), JSON.stringify({ deactivated: true })]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
