CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  calculator_id TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_created_at ON subscribers(created_at);

CREATE TABLE IF NOT EXISTS usage_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  calculator_name TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  financial_health_score REAL
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Insert default ad provider setting
INSERT OR IGNORE INTO site_settings (id, setting_key, setting_value, updated_at)
VALUES (1, 'ad_config', '{"provider":"google-adsense","googleAdSense":{"publisherId":"ca-pub-2928849251278370","enabled":true},"mediaNet":{"siteId":"","enabled":false},"propellerAds":{"zoneId":"","enabled":false},"adsterra":{"publisherId":"","enabled":false}}', datetime('now'));
