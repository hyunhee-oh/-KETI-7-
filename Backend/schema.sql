-- =====================================================
--  KETI 7대 전략기술 역량 대시보드 - DB 스키마
-- =====================================================

-- 기존 테이블 삭제 (재실행 시)
DROP TABLE IF EXISTS audit_logs  CASCADE;
DROP TABLE IF EXISTS caps        CASCADE;
DROP TABLE IF EXISTS techs       CASCADE;
DROP TABLE IF EXISTS map_items   CASCADE;

-- ── 역량맵 아이템 (학습지능, 언어지능 등) ──────────────
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

-- ── 유망기술 카드 ──────────────────────────────────────
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

-- ── 보유역량 (이미지 + 제목, 1 tech : N caps) ──────────
CREATE TABLE caps (
  id          SERIAL      PRIMARY KEY,
  tech_id     TEXT        NOT NULL REFERENCES techs(id) ON DELETE CASCADE,
  title       TEXT        DEFAULT '',
  -- image_path: Image/AI/AI 핵심기술/파일명.png  (프로젝트 루트 기준)
  image_path  TEXT        DEFAULT NULL,
  sort_order  INT         DEFAULT 0
);

-- ── 이력 관리 ─────────────────────────────────────────
CREATE TABLE audit_logs (
  id          SERIAL      PRIMARY KEY,
  actor       TEXT        NOT NULL DEFAULT 'admin',
  action      TEXT        NOT NULL CHECK (action IN ('CREATE','UPDATE','DELETE')),
  target_type TEXT        NOT NULL,   -- 'map_item' | 'tech' | 'cap'
  target_id   TEXT        NOT NULL,
  before_data JSONB,
  after_data  JSONB,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 인덱스 ────────────────────────────────────────────
CREATE INDEX idx_techs_item_id    ON techs(item_id);
CREATE INDEX idx_caps_tech_id     ON caps(tech_id);
CREATE INDEX idx_audit_target     ON audit_logs(target_type, target_id);
CREATE INDEX idx_audit_created    ON audit_logs(created_at DESC);

-- ── updated_at 자동갱신 트리거 ─────────────────────────
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
