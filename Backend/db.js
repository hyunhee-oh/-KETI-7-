const { Pool } = require('pg');
require('dotenv').config();

// Railway는 DATABASE_URL 환경변수 하나로 제공, 로컬은 개별 변수 사용
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }  // Railway SSL 필수
    })
  : new Pool({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME     || 'keti_dashboard',
      user:     process.env.DB_USER     || 'postgres',
      password: process.env.DB_PASSWORD || '',
    });

pool.on('error', (err) => {
  console.error('PostgreSQL 연결 오류:', err);
});

module.exports = pool;
