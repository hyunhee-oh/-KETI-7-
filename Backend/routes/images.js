/**
 * routes/images.js
 * POST   /api/image/upload  — 이미지 → Cloudinary 업로드 (즉시 업로드, DB 기록 없음)
 * POST   /api/caps/upload   — 이미지 → Cloudinary + caps DB 레코드 저장
 * DELETE /api/caps/:id      — 보유역량 삭제 (Cloudinary 이미지 + DB 레코드)
 *
 * Cloudinary 폴더 구조: KETI/AI/{기술분류}/
 */
const express    = require('express');
const router     = express.Router();
const multer     = require('multer');
const cloudinary = require('cloudinary').v2;
const pool       = require('../db');
const { logAudit } = require('./audit');

// ── Cloudinary 설정 ────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 카테고리 → Cloudinary 폴더명 매핑
const CATEGORY_FOLDER = {
  core:         'AI 핵심기술',
  base:         'AI 기반기술',
  fusion:       'AI 융합기술',
  fusion_left:  'AI 융합기술',
  fusion_right: 'AI 융합기술',
};

// multer: 메모리에 임시 저장 후 Cloudinary로 전송
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('이미지 파일만 업로드 가능합니다'));
  }
});

/**
 * Cloudinary에 이미지 업로드하는 헬퍼 함수
 * @returns {Promise<{url: string, public_id: string}>}
 */
function uploadToCloudinary(buffer, title, category) {
  const folderName = CATEGORY_FOLDER[category] || 'AI 핵심기술';
  const folder     = `KETI/AI/${folderName}`;
  const publicId   = title
    ? title.replace(/[<>:"/\\|?*\s]/g, '_').slice(0, 80) + '_' + Date.now()
    : 'image_' + Date.now();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, overwrite: false },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// ── 파일만 Cloudinary 저장 (DB 레코드 없음) - 편집 모달 즉시 업로드 ──
router.post('/image/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: '파일 없음' });
    const category = req.body.category || 'core';
    const title    = req.body.title || 'image';

    const { url, public_id } = await uploadToCloudinary(req.file.buffer, title, category);
    res.json({ image_url: url, public_id });
  } catch (err) {
    console.error('POST /api/image/upload 오류:', err);
    res.status(500).json({ error: '이미지 업로드 실패: ' + err.message });
  }
});

// ── 이미지 업로드 + caps 레코드 저장 ───────────────────────
router.post('/caps/upload', upload.single('file'), async (req, res) => {
  try {
    const { tech_id, title, category, sort_order } = req.body;
    if (!req.file) return res.status(400).json({ error: '파일 없음' });
    if (!tech_id)  return res.status(400).json({ error: 'tech_id 필수' });

    const { url } = await uploadToCloudinary(req.file.buffer, title, category || 'core');

    const capRes = await pool.query(
      `INSERT INTO caps (tech_id, title, image_path, sort_order)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [tech_id, title || '', url, parseInt(sort_order) || 0]
    );

    await logAudit('admin', 'CREATE', 'cap', String(capRes.rows[0].id), null, capRes.rows[0]);
    res.status(201).json({ ...capRes.rows[0], image_url: url });
  } catch (err) {
    console.error('POST /api/caps/upload 오류:', err);
    res.status(500).json({ error: '이미지 업로드 실패: ' + err.message });
  }
});

// ── 보유역량 삭제 (Cloudinary 이미지 + DB 레코드) ──────────
router.delete('/caps/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const before = await pool.query('SELECT * FROM caps WHERE id=$1', [id]);
    if (!before.rows.length) return res.status(404).json({ error: '역량 없음' });

    const cap = before.rows[0];

    // Cloudinary 이미지 삭제 (URL이 Cloudinary URL인 경우)
    if (cap.image_path && cap.image_path.includes('cloudinary.com')) {
      try {
        // URL에서 public_id 추출: .../KETI/AI/.../파일명.확장자 → KETI/AI/.../파일명
        const urlParts   = cap.image_path.split('/upload/');
        if (urlParts[1]) {
          const withoutVersion = urlParts[1].replace(/^v\d+\//, '');
          const publicId       = withoutVersion.replace(/\.[^/.]+$/, ''); // 확장자 제거
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (e) {
        console.warn('Cloudinary 이미지 삭제 실패 (무시):', e.message);
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
