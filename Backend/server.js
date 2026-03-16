require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');

const mapItemsRouter  = require('./routes/mapItems');
const techsRouter     = require('./routes/techs');
const imagesRouter    = require('./routes/images');
const auditRouter     = require('./routes/audit');
const authRouter      = require('./routes/auth');
const usersRouter     = require('./routes/users');
const approvalsRouter = require('./routes/approvals');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── 미들웨어 ────────────────────────────────────────────
// GitHub Pages 및 로컬 개발 모두 허용
app.use(cors({
  origin: [
    'https://hyunhee-oh.github.io',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// 정적 파일 서빙: 프론트엔드 + 이미지
const PROJECT_ROOT = path.resolve(__dirname, '..');
app.use(express.static(path.join(PROJECT_ROOT, 'Frontend')));
app.use('/Image', express.static(path.join(PROJECT_ROOT, 'Image')));

// ─── API 라우터 ──────────────────────────────────────────
app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', approvalsRouter);
app.use('/api', mapItemsRouter);
app.use('/api', techsRouter);
app.use('/api', imagesRouter);
app.use('/api', auditRouter);

// ─── 헬스체크 ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ─── 프론트엔드 SPA fallback ────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(PROJECT_ROOT, 'Frontend', 'KETI_기술역량_대시보드.html'));
});

// ─── 서버 시작 ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`KETI 대시보드 서버 실행 중: http://localhost:${PORT}`);
});
