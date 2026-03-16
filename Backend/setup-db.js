/**
 * Railway DB에 schema.sql을 실행하는 스크립트
 * 사용법: node setup-db.js
 */
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'keti_dashboard',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
    });

async function setupDB() {
  const client = await pool.connect();
  try {
    console.log('DB 연결 성공!');
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('schema.sql 실행 중...');
    await client.query(sql);
    console.log('✔ 테이블 생성 완료!');
    console.log('  - map_items, techs, caps, audit_logs');
  } catch (err) {
    console.error('스키마 실행 오류:', err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDB();
