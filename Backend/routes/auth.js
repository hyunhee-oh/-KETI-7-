const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt');
const pool    = require('../db');
const { generateToken, requireAuth } = require('../middleware/auth');

// POST /api/auth/login — 이름 + 비밀번호 로그인
router.post('/auth/login', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: '이름과 비밀번호를 입력해주세요' });
  }
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE name=$1 AND is_active=true', [name]
    );
    if (!result.rows.length) {
      return res.status(401).json({ error: '사용자를 찾을 수 없습니다' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다' });
    }
    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, name: user.name, role: user.role, email: user.email }
    });
  } catch (err) {
    console.error('POST /api/auth/login 오류:', err);
    res.status(500).json({ error: '로그인 처리 중 오류' });
  }
});

// GET /api/auth/me — 현재 로그인 사용자 정보
router.get('/auth/me', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, is_active FROM users WHERE id=$1', [req.user.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: '사용자 없음' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/managers — 로그인 모달 드롭다운용 사용자 목록 (이름만)
router.get('/auth/managers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, role FROM users WHERE is_active=true ORDER BY name ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
