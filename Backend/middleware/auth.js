const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'keti-dashboard-secret-2026';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '12h' }
  );
}

// 필수 인증: 토큰 없으면 401
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: '로그인이 필요합니다' });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: '토큰이 만료되었거나 유효하지 않습니다' });
  }
}

// Admin 전용: 토큰 + role=admin
function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: '관리자 권한이 필요합니다' });
    }
    next();
  });
}

// 선택적 인증: 토큰이 있으면 파싱, 없어도 통과
function optionalAuth(req, res, next) {
  const header = req.headers.authorization;
  if (header && header.startsWith('Bearer ')) {
    try { req.user = jwt.verify(header.slice(7), JWT_SECRET); } catch { /* ignore */ }
  }
  next();
}

module.exports = { generateToken, requireAuth, requireAdmin, optionalAuth, JWT_SECRET };
