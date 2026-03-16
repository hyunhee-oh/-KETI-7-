-- =====================================================
--  KETI 7대 전략기술 역량 대시보드 - DB 스키마 v2
--  권한 체계 + 승인 워크플로 추가
-- =====================================================

-- 신규 테이블 삭제 (재실행 시)
DROP TABLE IF EXISTS permission_logs  CASCADE;
DROP TABLE IF EXISTS pending_changes  CASCADE;
DROP TABLE IF EXISTS users            CASCADE;

-- 기존 테이블 삭제 (재실행 시)
DROP TABLE IF EXISTS audit_logs  CASCADE;
DROP TABLE IF EXISTS caps        CASCADE;
DROP TABLE IF EXISTS techs       CASCADE;
DROP TABLE IF EXISTS map_items   CASCADE;

-- ══════════════════════════════════════════════════════
--  기존 테이블 (변경 없음)
-- ══════════════════════════════════════════════════════

CREATE TABLE map_items (
  id          TEXT        PRIMARY KEY,
  section     TEXT        NOT NULL CHECK (section IN ('core','base','fusion_left','fusion_right')),
  name        TEXT        NOT NULL,
  count       INT         DEFAULT 0,
  centers     TEXT[]      DEFAULT '{}',
  mgr_a       TEXT        DEFAULT '',
  mgr_b       TEXT        DEFAULT '',
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE techs (
  id          TEXT        PRIMARY KEY,
  item_id     TEXT        NOT NULL REFERENCES map_items(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  asis        TEXT        DEFAULT '',
  tobe        TEXT        DEFAULT '',
  centers     TEXT[]      DEFAULT '{}',
  mgr_a       TEXT        DEFAULT '',
  mgr_b       TEXT        DEFAULT '',
  sort_order  INT         DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE caps (
  id          SERIAL      PRIMARY KEY,
  tech_id     TEXT        NOT NULL REFERENCES techs(id) ON DELETE CASCADE,
  title       TEXT        DEFAULT '',
  image_path  TEXT        DEFAULT NULL,
  sort_order  INT         DEFAULT 0
);

CREATE TABLE audit_logs (
  id          SERIAL      PRIMARY KEY,
  actor       TEXT        NOT NULL DEFAULT 'admin',
  action      TEXT        NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE')),
  target_type TEXT        NOT NULL,
  target_id   TEXT        NOT NULL,
  before_data JSONB,
  after_data  JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════
--  신규 테이블: 사용자 / 승인 / 권한이력
-- ══════════════════════════════════════════════════════

CREATE TABLE users (
  id            SERIAL      PRIMARY KEY,
  name          TEXT        NOT NULL UNIQUE,
  email         TEXT        DEFAULT '',
  password_hash TEXT        NOT NULL,
  role          TEXT        NOT NULL DEFAULT 'manager' CHECK (role IN ('admin','manager')),
  is_active     BOOLEAN     DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pending_changes (
  id             SERIAL      PRIMARY KEY,
  requester_id   INT         NOT NULL REFERENCES users(id),
  target_type    TEXT        NOT NULL,
  target_id      TEXT        NOT NULL,
  action         TEXT        NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE')),
  before_data    JSONB,
  after_data     JSONB,
  status         TEXT        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  reviewer_id    INT         REFERENCES users(id),
  review_comment TEXT        DEFAULT '',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at    TIMESTAMPTZ
);

CREATE TABLE permission_logs (
  id              SERIAL      PRIMARY KEY,
  actor_id        INT         NOT NULL REFERENCES users(id),
  target_user_id  INT         NOT NULL REFERENCES users(id),
  action          TEXT        NOT NULL,
  detail          JSONB,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════
--  인덱스
-- ══════════════════════════════════════════════════════
CREATE INDEX idx_techs_item_id      ON techs(item_id);
CREATE INDEX idx_caps_tech_id       ON caps(tech_id);
CREATE INDEX idx_audit_target       ON audit_logs(target_type, target_id);
CREATE INDEX idx_audit_created      ON audit_logs(created_at DESC);
CREATE INDEX idx_pending_status     ON pending_changes(status);
CREATE INDEX idx_pending_requester  ON pending_changes(requester_id);
CREATE INDEX idx_pending_target     ON pending_changes(target_type, target_id);
CREATE INDEX idx_perm_log_actor     ON permission_logs(actor_id);

-- ══════════════════════════════════════════════════════
--  트리거: updated_at 자동갱신
-- ══════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_map_items_updated
  BEFORE UPDATE ON map_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_techs_updated
  BEFORE UPDATE ON techs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
