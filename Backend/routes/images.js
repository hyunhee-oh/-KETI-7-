/**
 * routes/images.js
 * POST   /api/caps/upload  — 이미지 업로드 → Image/AI/{기술분류}/{파일명} 저장
 * DELETE /api/caps/:id     — 보유역량 삭제 (이미지 파일도 함께 삭제)
 *
 * 폴더 구조: Image/AI/AI 핵심기술/ | AI 기반기술/ | AI 융합기술/
 * 요청 multipart/form-data 필드:
 *   - file       : 이미지 파일
 *   - tech_id    : 유망기술 ID
 *   - title      : 보유역량 제목
 *   - category   : 'core' | 'base' | 'fusion' (선택, 기본 핵심기술)
 *   - sort_order : 정렬 순서 (선택)
 */
const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const pool    = require('../db');
const { logAudit } = require('./audit');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

// 카테고리 → 폴더명 매핑
const CATEGORY_FOLDER = {
  core:    'AI 핵심기술',
  base:    'AI 기반기술',
  fusion:  'AI 융합기술',
  fusion_left:  'AI 융합기술',
  fusion_right: 'AI 융합기술',
};

// multer: 업로드 폴더를 category에 따라 동적으로 결정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.body.category || 'core';
    const folderName = CATEGORY_FOLDER[category] || 'AI 핵심기술';
    const destDir = path.join(PROJECT_ROOT, 'Image', 'AI', folderName);

    // 폴더가 없으면 자동 생성
    fs.mkdirSync(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename: function (req, file, cb) {
    const title = req.body.title;
    const ext   = path.extname(file.originalname);
    // 타임스탬프로 중복 방지, 제목이 있으면 뒤에 붙임
    const ts   = Date.now();
    const base = title ? title.replace(/[<>:"/\\|?*]/g, '_') : 'image';
    cb(null, base + '_' + ts + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('이미지 파일만 업로드 가능합니다'));
  }
});

// ── 파일만 저장 (DB 레코드 없음) - 편집 모달에서 즉시 업로드 용 ──
router.post('/image/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: '파일 없음' });
    const category  = req.body.category || 'core';
    const folderName = CATEGORY_FOLDER[category] || 'AI 핵심기술';
    const image_path = ('Image/AI/' + folderName + '/' + req.file.filename).replace(/\\/g, '/');
    res.json({ image_url: '/' + image_path, image_path });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// ── 이미지 업로드 + caps 레코드 저장 ───────────────────────
router.post('/caps/upload', upload.single('file'), async (req, res) => {
  try {
    const { tech_id, title, category, sort_order } = req.body;

    if (!req.file) return res.status(400).json({ error: '파일 없음' });
    if (!tech_id) return res.status(400).json({ error: 'tech_id 필수' });

    // 저장된 파일의 프로젝트 루트 기준 상대 경로
    const folderName = CATEGORY_FOLDER[category || 'core'] || 'AI 핵심기술';
    const image_path = path.join('Image', 'AI', folderName, req.file.filename);
    // Windows 경로 구분자를 슬래시로 통일
    const image_path_unix = image_path.replace(/\\/g, '/');

    const capRes = await pool.query(
      `INSERT INTO caps (tech_id, title, image_path, sort_order)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [tech_id, title||'', image_path_unix, parseInt(sort_order)||0]
    );

    await logAudit('admin', 'CREATE', 'cap', String(capRes.rows[0].id), null, capRes.rows[0]);

    res.status(201).json({
      ...capRes.rows[0],
      // 프론트에서 사용할 경로 (서버 정적 서빙 기준)
      image_url: '/' + image_path_unix
    });
  } catch (err) {
    console.error('POST /api/caps/upload 오류:', err);
    res.status(500).json({ error: '이미지 업로드 실패: ' + err.message });
  }
});

// ── 보유역량 삭제 (이미지 파일 + DB 레코드) ───────────────
router.delete('/caps/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const before = await pool.query('SELECT * FROM caps WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '역량 없음' });

    const cap = before.rows[0];

    // 이미지 파일 삭제
    if (cap.image_path) {
      const filePath = path.join(PROJECT_ROOT, cap.image_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query('DELETE FROM caps WHERE id=$1', [id]);
    await logAudit('admin', 'DELETE', 'cap', String(id), cap, null);
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/caps/:id 오류:', err);
    res.status(500).json({ error: '역량 삭제 실패' });
  }
});

module.exports = router;
