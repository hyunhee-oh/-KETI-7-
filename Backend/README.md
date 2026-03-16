# KETI 7대 전략기술 역량 대시보드 — 백엔드 설치 가이드

## 사전 요구사항

- **Node.js** 18 이상: https://nodejs.org (LTS 버전 설치)
- **PostgreSQL** 14 이상: https://www.postgresql.org/download/windows/

---

## 1. PostgreSQL 데이터베이스 생성

PostgreSQL에 접속 후 아래 명령 실행:

```sql
CREATE DATABASE keti_dashboard;
```

---

## 2. 스키마 생성

```bash
# psql 사용 시
psql -U postgres -d keti_dashboard -f schema.sql

# 또는 pgAdmin에서 schema.sql 파일 내용을 Query Tool에 붙여넣고 실행
```

---

## 3. 환경 변수 설정

`.env` 파일을 열어 DB 연결 정보를 실제 값으로 변경:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=keti_dashboard
DB_USER=postgres
DB_PASSWORD=실제비밀번호
PORT=3000
IMAGE_ROOT=../Image
```

---

## 4. 패키지 설치

```bash
cd Backend
npm install
```

---

## 5. 초기 데이터 삽입 (최초 1회)

```bash
node seed.js
```

---

## 6. 서버 실행

```bash
# 일반 실행
node server.js

# 개발 모드 (코드 변경 시 자동 재시작, nodemon 사용)
npm run dev
```

서버 실행 후 브라우저에서 접속:
**http://localhost:3000**

---

## 폴더 구조

```
7대전략기술/
├── Frontend/         ← 프론트엔드 (HTML, CSS, JS)
├── Backend/          ← Node.js 백엔드
│   ├── server.js     ← Express 서버 진입점
│   ├── db.js         ← PostgreSQL 연결
│   ├── schema.sql    ← DB 스키마 (최초 1회 실행)
│   ├── seed.js       ← 초기 데이터 삽입 (최초 1회 실행)
│   ├── .env          ← 환경 변수 (DB 비밀번호 등)
│   └── routes/
│       ├── mapItems.js  ← 역량맵 CRUD API
│       ├── techs.js     ← 유망기술 CRUD API
│       ├── images.js    ← 이미지 업로드 API
│       └── audit.js     ← 이력 관리 API
└── Image/
    └── AI/
        ├── AI 핵심기술/  ← 이미지 자동 저장 폴더
        ├── AI 기반기술/
        └── AI 융합기술/
```

---

## API 목록

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/map | 전체 데이터 조회 |
| POST | /api/map/items | 역량맵 아이템 추가 |
| PUT | /api/map/items/:id | 역량맵 아이템 수정 |
| DELETE | /api/map/items/:id | 역량맵 아이템 삭제 |
| POST | /api/techs | 유망기술 추가 |
| PUT | /api/techs/:id | 유망기술 수정 |
| DELETE | /api/techs/:id | 유망기술 삭제 |
| POST | /api/caps/upload | 이미지 업로드 |
| DELETE | /api/caps/:id | 보유역량 삭제 |
| GET | /api/audit | 변경 이력 조회 |
| GET | /api/health | 서버 상태 확인 |

---

## 동작 방식

- **파일로 직접 열기** (`file://`): localStorage 모드로 동작 (기존과 동일)
- **서버를 통해 접속** (`http://localhost:3000`): PostgreSQL API 모드로 동작

이미지 업로드 시 `Image/AI/AI 핵심기술/`, `Image/AI/AI 기반기술/`, `Image/AI/AI 융합기술/` 폴더에 자동 저장됩니다.
