-- ==========================================
-- MIGRATION FROM EXCEL: LOKASI RUMUS 2026.xlsx
-- Generated: 2026-10-07T15:04:20.606Z
-- Kategori: 11 | Rak: 85 | Produk: 248 | Transaksi: 1225
-- ==========================================

-- ===== 1. KATEGORI =====
INSERT INTO categories (name, description) VALUES ('GBBX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('HXDX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('KSDK', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('LQSLN', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('LQT', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('NJX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('NSBX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('SLNDX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('SXT', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('TLDX', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;
INSERT INTO categories (name, description) VALUES ('TZSLN', 'Auto-import')
  ON CONFLICT (name) DO NOTHING;

-- ===== 2. LOKASI RAK =====
INSERT INTO locations (code, description) VALUES ('A1', 'Rak A1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('A2', 'Rak A2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('A3', 'Rak A3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('A4', 'Rak A4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('A5', 'Rak A5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('A6', 'Rak A6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B1', 'Rak B1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B2', 'Rak B2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B3', 'Rak B3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B4', 'Rak B4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B5', 'Rak B5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('B6', 'Rak B6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C1', 'Rak C1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C2', 'Rak C2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C3', 'Rak C3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C4', 'Rak C4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C5', 'Rak C5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('C6', 'Rak C6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D1', 'Rak D1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D2', 'Rak D2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D3', 'Rak D3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D4', 'Rak D4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D5', 'Rak D5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('D6', 'Rak D6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E1', 'Rak E1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E2', 'Rak E2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E3', 'Rak E3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E4', 'Rak E4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E5', 'Rak E5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('E6', 'Rak E6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F1', 'Rak F1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F2', 'Rak F2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F3', 'Rak F3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F4', 'Rak F4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F5', 'Rak F5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('F6', 'Rak F6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G1', 'Rak G1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G2', 'Rak G2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G3', 'Rak G3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G4', 'Rak G4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G5', 'Rak G5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('G6', 'Rak G6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H1', 'Rak H1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H2', 'Rak H2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H3', 'Rak H3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H4', 'Rak H4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H5', 'Rak H5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('H6', 'Rak H6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('I1', 'Rak I1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('I2', 'Rak I2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('I3', 'Rak I3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('I4', 'Rak I4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('I5', 'Rak I5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J1', 'Rak J1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J2', 'Rak J2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J3', 'Rak J3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J4', 'Rak J4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J5', 'Rak J5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('J6', 'Rak J6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('K1', 'Rak K1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('K2', 'Rak K2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('K3', 'Rak K3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('K4', 'Rak K4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('K5', 'Rak K5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L1', 'Rak L1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L2', 'Rak L2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L3', 'Rak L3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L4', 'Rak L4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L5', 'Rak L5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L6', 'Rak L6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L7', 'Rak L7')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L8', 'Rak L8')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('L9', 'Rak L9')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('M1', 'Rak M1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('M2', 'Rak M2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('M3', 'Rak M3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('M4', 'Rak M4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('M5', 'Rak M5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N1', 'Rak N1')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N2', 'Rak N2')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N3', 'Rak N3')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N4', 'Rak N4')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N5', 'Rak N5')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N6', 'Rak N6')
  ON CONFLICT (code) DO NOTHING;
INSERT INTO locations (code, description) VALUES ('N7', 'Rak N7')
  ON CONFLICT (code) DO NOTHING;

-- ===== 3. PRODUK (Auto-SKU) =====
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-WH', id, 'XXL', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-WH', id, 'XXXL', 'WH', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-BK', id, 'XXL', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-BK', id, 'XXXL', 'BK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-APR', id, 'S', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-APR', id, 'M', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-APR', id, 'L', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-APR', id, 'XL', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-APR', id, 'XXL', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-APR', id, 'XXXL', 'APR', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-BN', id, 'S', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-BN', id, 'M', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-BN', id, 'L', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-BN', id, 'XL', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-BN', id, 'XXL', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-BN', id, 'XXXL', 'BN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-PK', id, 'S', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-PK', id, 'M', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-PK', id, 'L', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-PK', id, 'XL', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-PK', id, 'XXL', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-PK', id, 'XXXL', 'PK', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-GY', id, 'S', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-GY', id, 'M', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-GY', id, 'L', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-GY', id, 'XL', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-GY', id, 'XXL', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-GY', id, 'XXXL', 'GY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-RD', id, 'S', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-RD', id, 'M', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-RD', id, 'L', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-RD', id, 'XL', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-RD', id, 'XXL', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-RD', id, 'XXXL', 'RD', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-GN', id, 'S', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-GN', id, 'M', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-GN', id, 'L', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-GN', id, 'XL', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-GN', id, 'XXL', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-GN', id, 'XXXL', 'GN', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-BU', id, 'S', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-BU', id, 'M', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-BU', id, 'L', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-BU', id, 'XL', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-BU', id, 'XXL', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-BU', id, 'XXXL', 'BU', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-S-FGY', id, 'S', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-M-FGY', id, 'M', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-L-FGY', id, 'L', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XL-FGY', id, 'XL', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXL-FGY', id, 'XXL', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SLNDX-XXXL-FGY', id, 'XXXL', 'FGY', 10
  FROM categories WHERE name = 'SLNDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SXT-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'SXT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SXT-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'SXT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SXT-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'SXT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SXT-XXL-BK', id, 'XXL', 'BK', 10
  FROM categories WHERE name = 'SXT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'SXT-XXXL-BK', id, 'XXXL', 'BK', 10
  FROM categories WHERE name = 'SXT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-WH', id, '90', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-WH', id, '100', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-WH', id, '110', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-WH', id, '120', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-WH', id, '130', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-WH', id, '140', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-WH', id, '150', 'WH', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-BK', id, '90', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-BK', id, '100', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-BK', id, '110', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-BK', id, '120', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-BK', id, '130', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-BK', id, '140', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-BK', id, '150', 'BK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-APR', id, '90', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-APR', id, '100', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-APR', id, '110', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-APR', id, '120', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-APR', id, '130', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-APR', id, '140', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-APR', id, '150', 'APR', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-RD', id, '90', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-RD', id, '100', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-RD', id, '110', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-RD', id, '120', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-RD', id, '130', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-RD', id, '140', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-RD', id, '150', 'RD', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-PK', id, '90', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-PK', id, '100', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-PK', id, '110', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-PK', id, '120', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-PK', id, '130', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-PK', id, '140', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-PK', id, '150', 'PK', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-BN', id, '90', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-BN', id, '100', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-BN', id, '110', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-BN', id, '120', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-BN', id, '130', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-BN', id, '140', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-BN', id, '150', 'BN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-GN', id, '90', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-GN', id, '100', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-GN', id, '110', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-GN', id, '120', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-GN', id, '130', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-GN', id, '140', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-GN', id, '150', 'GN', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-BU', id, '90', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-BU', id, '100', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-BU', id, '110', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-BU', id, '120', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-BU', id, '130', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-BU', id, '140', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-BU', id, '150', 'BU', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-90-VT', id, '90', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-100-VT', id, '100', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-110-VT', id, '110', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-120-VT', id, '120', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-130-VT', id, '130', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-140-VT', id, '140', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TZSLN-150-VT', id, '150', 'VT', 10
  FROM categories WHERE name = 'TZSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-S-PK', id, 'S', 'PK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-M-PK', id, 'M', 'PK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-L-PK', id, 'L', 'PK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-S-BN', id, 'S', 'BN', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-M-BN', id, 'M', 'BN', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-L-BN', id, 'L', 'BN', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-S-FGY', id, 'S', 'FGY', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-M-FGY', id, 'M', 'FGY', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-L-FGY', id, 'L', 'FGY', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'KSDK-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'KSDK'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-S-APR', id, 'S', 'APR', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-M-APR', id, 'M', 'APR', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-L-APR', id, 'L', 'APR', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQT-XL-APR', id, 'XL', 'APR', 10
  FROM categories WHERE name = 'LQT'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-S-APR', id, 'S', 'APR', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-M-APR', id, 'M', 'APR', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-L-APR', id, 'L', 'APR', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-XL-APR', id, 'XL', 'APR', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-S-DRD', id, 'S', 'DRD', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-M-DRD', id, 'M', 'DRD', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-L-DRD', id, 'L', 'DRD', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'TLDX-XL-DRD', id, 'XL', 'DRD', 10
  FROM categories WHERE name = 'TLDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-100-BK', id, '100', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-110-BK', id, '110', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-120-BK', id, '120', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-130-BK', id, '130', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-140-BK', id, '140', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-150-BK', id, '150', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-160-BK', id, '160', 'BK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-100-VT', id, '100', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-110-VT', id, '110', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-120-VT', id, '120', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-130-VT', id, '130', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-140-VT', id, '140', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-150-VT', id, '150', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-160-VT', id, '160', 'VT', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-100-PK', id, '100', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-110-PK', id, '110', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-120-PK', id, '120', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-130-PK', id, '130', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-140-PK', id, '140', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-150-PK', id, '150', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-160-PK', id, '160', 'PK', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-100-GN', id, '100', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-110-GN', id, '110', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-120-GN', id, '120', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-130-GN', id, '130', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-140-GN', id, '140', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-150-GN', id, '150', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NJX-160-GN', id, '160', 'GN', 10
  FROM categories WHERE name = 'NJX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XXL-WH', id, 'XXL', 'WH', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XXL-BK', id, 'XXL', 'BK', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-S-DRD', id, 'S', 'DRD', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-M-DRD', id, 'M', 'DRD', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-L-DRD', id, 'L', 'DRD', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XL-DRD', id, 'XL', 'DRD', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'HXDX-XXL-DRD', id, 'XXL', 'DRD', 10
  FROM categories WHERE name = 'HXDX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XXL-WH', id, 'XXL', 'WH', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XXXL-WH', id, 'XXXL', 'WH', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XXL-BK', id, 'XXL', 'BK', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'NSBX-XXXL-BK', id, 'XXXL', 'BK', 10
  FROM categories WHERE name = 'NSBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-S-DBD', id, 'S', 'DBD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-M-DBD', id, 'M', 'DBD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-L-DBD', id, 'L', 'DBD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-S-DRD', id, 'S', 'DRD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-M-DRD', id, 'M', 'DRD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'GBBX-L-DRD', id, 'L', 'DRD', 10
  FROM categories WHERE name = 'GBBX'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-S-WH', id, 'S', 'WH', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-M-WH', id, 'M', 'WH', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-L-WH', id, 'L', 'WH', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-XL-WH', id, 'XL', 'WH', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-S-BK', id, 'S', 'BK', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-M-BK', id, 'M', 'BK', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-L-BK', id, 'L', 'BK', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-XL-BK', id, 'XL', 'BK', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-S-APR', id, 'S', 'APR', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-M-APR', id, 'M', 'APR', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-L-APR', id, 'L', 'APR', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;
INSERT INTO products (sku, category_id, size, color, min_stock)
  SELECT 'LQSLN-XL-APR', id, 'XL', 'APR', 10
  FROM categories WHERE name = 'LQSLN'
  ON CONFLICT (sku) DO NOTHING;

-- ===== 4. TRANSAKSI =====
-- Menggunakan subquery untuk lookup product_id & location_id

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-S-WH', 'A1', 'IN', 5419, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'IN', 15004, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 14062, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'IN', 21120, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 17931, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'IN', 3545, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'IN', 2569, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'IN', 6076, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'IN', 14589, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'IN', 3882, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'IN', 3400, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 4184, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 3148, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 6983, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 12285, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 8023, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'IN', 9687, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'IN', 7483, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'IN', 540, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'IN', 3269, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 3904, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'IN', 5676, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 3346, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 2405, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'IN', 3752, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 4665, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 8156, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 7624, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'IN', 7591, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'IN', 5477, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'IN', 455, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'IN', 2746, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 4572, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 4678, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'IN', 2436, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'IN', 2711, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-RD', 'G1', 'IN', 600, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'IN', 2529, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 1120, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 944, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'IN', 1509, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'IN', 870, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-GN', 'H1', 'IN', 1795, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'IN', 1637, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'IN', 3255, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'IN', 2402, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'IN', 2375, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'IN', 2989, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-BU', 'I1', 'IN', 100, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-BU', 'I2', 'IN', 100, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'IN', 500, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-BU', 'I4', 'IN', 1044, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-BU', 'I5', 'IN', 100, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-BU', 'I5', 'IN', 500, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-S-FGY', 'J1', 'IN', 400, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-M-FGY', 'J2', 'IN', 700, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'IN', 1200, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'IN', 1200, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-FGY', 'J5', 'IN', 1744, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXXL-FGY', 'J6', 'IN', 1712, '2026-08-27T00:00:00.000Z'),
  ('SXT-M-BK', 'K1', 'IN', 4740, '2026-08-27T00:00:00.000Z'),
  ('SXT-L-BK', 'K2', 'IN', 6597, '2026-08-27T00:00:00.000Z'),
  ('SXT-XL-BK', 'K3', 'IN', 9145, '2026-08-27T00:00:00.000Z'),
  ('SXT-XXL-BK', 'K4', 'IN', 4340, '2026-08-27T00:00:00.000Z'),
  ('SXT-XXXL-BK', 'K5', 'IN', 3947, '2026-08-27T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 200, '2026-08-27T00:00:00.000Z'),
  ('TZSLN-90-WH', 'L1', 'IN', 4572, '2026-08-27T00:00:00.000Z'),
  ('TZSLN-100-WH', 'L1', 'IN', 5569, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-WH', 'L1', 'IN', 2224, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-WH', 'L1', 'IN', 2598, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-WH', 'L1', 'IN', 986, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-WH', 'L1', 'IN', 2258, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-WH', 'L1', 'IN', 414, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-BK', 'L2', 'IN', 8288, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-BK', 'L2', 'IN', 6631, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-BK', 'L2', 'IN', 4342, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-BK', 'L2', 'IN', 3480, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-BK', 'L2', 'IN', 3948, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-BK', 'L2', 'IN', 1344, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-BK', 'L2', 'IN', 840, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-APR', 'L3', 'IN', 9421, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'IN', 8729, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-APR', 'L3', 'IN', 5894, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-APR', 'L3', 'IN', 6369, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-APR', 'L3', 'IN', 3398, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-APR', 'L3', 'IN', 3040, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-APR', 'L3', 'IN', 3231, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-RD', 'L4', 'IN', 3261, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-RD', 'L4', 'IN', 1100, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-RD', 'L4', 'IN', 2262, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-RD', 'L4', 'IN', 1631, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-RD', 'L4', 'IN', 1889, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-RD', 'L4', 'IN', 2045, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-RD', 'L4', 'IN', 2797, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-PK', 'L5', 'IN', 800, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-PK', 'L5', 'IN', 1400, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-PK', 'L5', 'IN', 1955, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-PK', 'L5', 'IN', 981, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-PK', 'L5', 'IN', 873, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-PK', 'L5', 'IN', 417, '2026-08-28T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('TZSLN-90-BN', 'L6', 'IN', 1410, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-BN', 'L6', 'IN', 1200, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-BN', 'L6', 'IN', 2097, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-BN', 'L6', 'IN', 560, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-BN', 'L6', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-BN', 'L6', 'IN', 787, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-BN', 'L6', 'IN', 1356, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-GN', 'L7', 'IN', 1150, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-GN', 'L7', 'IN', 1700, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-GN', 'L7', 'IN', 1260, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-GN', 'L7', 'IN', 989, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-GN', 'L7', 'IN', 1432, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-GN', 'L7', 'IN', 441, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-GN', 'L7', 'IN', 920, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-BU', 'L8', 'IN', 480, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-BU', 'L8', 'IN', 1131, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-BU', 'L8', 'IN', 560, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-BU', 'L8', 'IN', 504, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-BU', 'L8', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-BU', 'L8', 'IN', 800, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-90-VT', 'L9', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-100-VT', 'L9', 'IN', 1000, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-110-VT', 'L9', 'IN', 3240, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-120-VT', 'L9', 'IN', 4720, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-130-VT', 'L9', 'IN', 1900, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-140-VT', 'L9', 'IN', 1820, '2026-08-28T00:00:00.000Z'),
  ('TZSLN-150-VT', 'L9', 'IN', 900, '2026-08-28T00:00:00.000Z'),
  ('KSDK-S-WH', 'M1', 'IN', 1260, '2026-08-28T00:00:00.000Z'),
  ('KSDK-M-WH', 'M1', 'IN', 1660, '2026-08-28T00:00:00.000Z'),
  ('KSDK-L-WH', 'M1', 'IN', 920, '2026-08-28T00:00:00.000Z'),
  ('KSDK-S-PK', 'M2', 'IN', 380, '2026-08-28T00:00:00.000Z'),
  ('KSDK-M-PK', 'M2', 'IN', 437, '2026-08-28T00:00:00.000Z'),
  ('KSDK-L-PK', 'M2', 'IN', 227, '2026-08-28T00:00:00.000Z'),
  ('KSDK-S-BN', 'M3', 'IN', 693, '2026-08-28T00:00:00.000Z'),
  ('KSDK-M-BN', 'M3', 'IN', 1017, '2026-08-28T00:00:00.000Z'),
  ('KSDK-L-BN', 'M3', 'IN', 560, '2026-08-28T00:00:00.000Z'),
  ('KSDK-S-FGY', 'M4', 'IN', 692, '2026-08-28T00:00:00.000Z'),
  ('KSDK-M-FGY', 'M4', 'IN', 980, '2026-08-28T00:00:00.000Z'),
  ('KSDK-L-FGY', 'M4', 'IN', 680, '2026-08-28T00:00:00.000Z'),
  ('KSDK-S-BK', 'M5', 'IN', 1497, '2026-08-28T00:00:00.000Z'),
  ('KSDK-M-BK', 'M5', 'IN', 1500, '2026-08-28T00:00:00.000Z'),
  ('KSDK-L-BK', 'M5', 'IN', 1440, '2026-08-28T00:00:00.000Z'),
  ('LQT-S-WH', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-M-WH', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-L-WH', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-XL-WH', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-S-BK', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-M-BK', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-L-BK', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-XL-BK', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-S-APR', 'N1', 'IN', 199, '2026-08-28T00:00:00.000Z'),
  ('LQT-M-APR', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-L-APR', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('LQT-XL-APR', 'N1', 'IN', 300, '2026-08-28T00:00:00.000Z'),
  ('TLDX-S-WH', 'N2', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TLDX-M-WH', 'N2', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TLDX-L-WH', 'N2', 'IN', 439, '2026-08-28T00:00:00.000Z'),
  ('TLDX-XL-WH', 'N2', 'IN', 401, '2026-08-28T00:00:00.000Z'),
  ('TLDX-S-BK', 'N2', 'IN', 801, '2026-08-28T00:00:00.000Z'),
  ('TLDX-M-BK', 'N2', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TLDX-L-BK', 'N2', 'IN', 640, '2026-08-28T00:00:00.000Z'),
  ('TLDX-XL-BK', 'N2', 'IN', 411, '2026-08-28T00:00:00.000Z'),
  ('TLDX-S-APR', 'N2', 'IN', 488, '2026-08-28T00:00:00.000Z'),
  ('TLDX-M-APR', 'N2', 'IN', 440, '2026-08-28T00:00:00.000Z'),
  ('TLDX-L-APR', 'N2', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('TLDX-XL-APR', 'N2', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('TLDX-S-DRD', 'N2', 'IN', 500, '2026-08-28T00:00:00.000Z'),
  ('TLDX-M-DRD', 'N2', 'IN', 441, '2026-08-28T00:00:00.000Z'),
  ('TLDX-L-DRD', 'N2', 'IN', 430, '2026-08-28T00:00:00.000Z'),
  ('TLDX-XL-DRD', 'N2', 'IN', 381, '2026-08-28T00:00:00.000Z'),
  ('NJX-100-BK', 'N3', 'IN', 289, '2026-08-28T00:00:00.000Z'),
  ('NJX-110-BK', 'N3', 'IN', 351, '2026-08-28T00:00:00.000Z'),
  ('NJX-120-BK', 'N3', 'IN', 600, '2026-08-28T00:00:00.000Z'),
  ('NJX-130-BK', 'N3', 'IN', 440, '2026-08-28T00:00:00.000Z'),
  ('NJX-140-BK', 'N3', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('NJX-150-BK', 'N3', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('NJX-160-BK', 'N3', 'IN', 400, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 300, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 180, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 263, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 240, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 300, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 220, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 220, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 217, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 460, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 489, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'IN', 621, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-08-28T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 160, '2026-08-29T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-L-PK', 'E3', 'OUT', 230, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 280, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'IN', 574, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'IN', 300, '2026-08-29T00:00:00.000Z'),
  ('SXT-M-BK', 'K1', 'IN', 580, '2026-08-29T00:00:00.000Z'),
  ('SXT-XXL-BK', 'K4', 'IN', 460, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 286, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 257, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 299, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 301, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 200, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-08-29T00:00:00.000Z'),
  ('SXT-XL-BK', 'K3', 'OUT', 380, '2026-08-29T00:00:00.000Z'),
  ('SXT-XXXL-BK', 'K5', 'OUT', 340, '2026-08-29T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 340, '2026-08-30T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 220, '2026-08-30T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 200, '2026-08-30T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 160, '2026-08-30T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 224, '2026-08-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 464, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 239, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 260, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 240, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 220, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 300, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 260, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 234, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 500, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 201, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-FGY', 'J6', 'OUT', 182, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SXT-L-BK', 'K2', 'OUT', 320, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 249, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 223, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 231, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 180, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-08-31T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 237, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 240, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 240, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 160, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 200, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 320, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 160, '2026-09-01T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 340, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 180, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 257, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 100, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 140, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 240, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 264, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 251, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 250, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 160, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 246, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 240, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 224, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 220, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 200, '2026-09-02T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-03T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 240, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 360, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 238, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 300, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 217, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 220, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 264, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'OUT', 260, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 220, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 318, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 196, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 220, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 220, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXXL-BU', 'I5', 'OUT', 250, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 440, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 200, '2026-09-03T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 360, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 460, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 220, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 360, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 500, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'OUT', 500, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 218, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 300, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-S-GN', 'H1', 'OUT', 240, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'OUT', 260, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 300, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 264, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-M-FGY', 'J2', 'OUT', 350, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 220, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 220, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 200, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-04T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 360, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 400, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 245, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 485, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 160, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 166, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 160, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 120, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 280, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 220, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-05T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 260, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 240, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 260, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 280, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 280, '2026-09-06T00:00:00.000Z'),
  ('NJX-100-VT', 'N3', 'IN', 757, '2026-09-06T00:00:00.000Z'),
  ('NJX-110-VT', 'N3', 'IN', 336, '2026-09-06T00:00:00.000Z'),
  ('NJX-120-VT', 'N3', 'IN', 800, '2026-09-06T00:00:00.000Z'),
  ('NJX-130-VT', 'N3', 'IN', 600, '2026-09-06T00:00:00.000Z'),
  ('NJX-140-VT', 'N3', 'IN', 1070, '2026-09-06T00:00:00.000Z'),
  ('NJX-150-VT', 'N3', 'IN', 430, '2026-09-06T00:00:00.000Z'),
  ('NJX-160-VT', 'N3', 'IN', 648, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 388, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 247, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 1971, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 2313, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'IN', 39, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'IN', 591, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 360, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-09-06T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-06T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('NJX-110-PK', 'N3', 'IN', 200, '2026-09-07T00:00:00.000Z'),
  ('NJX-120-PK', 'N3', 'IN', 300, '2026-09-07T00:00:00.000Z'),
  ('NJX-140-PK', 'N3', 'IN', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'IN', 1318, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 1615, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 1166, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'IN', 2850, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-S-FGY', 'J1', 'IN', 608, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-FGY', 'J2', 'IN', 660, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'IN', 520, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'IN', 1000, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-FGY', 'J5', 'IN', 226, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 235, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 100, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 245, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 240, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 220, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 220, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 221, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXXL-FGY', 'J6', 'OUT', 210, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 208, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'IN', 1160, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-BU', 'I2', 'IN', 300, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'IN', 437, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 1881, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 500, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 1247, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 214, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 227, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 216, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 220, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-07T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 360, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 263, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 280, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 260, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XXL-FGY', 'J5', 'OUT', 200, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 301, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 260, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 500, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-08T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 220, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 220, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 342, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 460, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'IN', 73, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'IN', 300, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 982, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'IN', 1773, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 160, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 284, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 200, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 239, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 260, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 220, '2026-09-09T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 238, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 461, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 260, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 360, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 220, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'OUT', 100, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 232, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 217, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 220, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 100, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 256, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'OUT', 240, '2026-09-10T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 160, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 200, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'OUT', 250, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'OUT', 260, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 240, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'OUT', 280, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 240, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 204, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 420, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 400, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 300, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 300, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 200, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 217, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 469, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 200, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 280, '2026-09-10T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 259, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 220, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 221, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 246, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 213, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 246, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 217, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 243, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 221, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 200, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 280, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 280, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 258, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'IN', 192, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'IN', 1152, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 1744, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 181, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'IN', 1533, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'IN', 192, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'IN', 400, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'IN', 1092, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 736, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'IN', 1300, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 1248, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-GN', 'H1', 'IN', 287, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'IN', 384, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'IN', 2090, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'IN', 982, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'IN', 1152, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'IN', 306, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'IN', 343, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 612, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'IN', 366, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 321, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 410, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'IN', 320, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'IN', 321, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 287, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 1602, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'IN', 288, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-S-BU', 'I1', 'IN', 104, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-M-BU', 'I2', 'IN', 102, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'IN', 104, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-BU', 'I4', 'IN', 104, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXL-BU', 'I5', 'IN', 416, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XXXL-BU', 'I5', 'IN', 104, '2026-09-11T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'OUT', 480, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 514, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 200, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 200, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 200, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 220, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 220, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 300, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 237, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 260, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 204, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 220, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 219, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-09-12T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SXT-XXL-BK', 'K4', 'OUT', 460, '2026-09-12T00:00:00.000Z'),
  ('SXT-M-BK', 'K1', 'OUT', 320, '2026-09-12T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 231, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 256, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 220, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 228, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 299, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'OUT', 244, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 280, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 280, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 260, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 287, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 220, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 138, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-09-13T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'IN', 1618, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'IN', 660, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 780, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'IN', 241, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'IN', 526, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 480, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 767, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'IN', 967, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'IN', 504, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'IN', 600, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 240, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 200, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-M-BU', 'I2', 'OUT', 300, '2026-09-14T00:00:00.000Z'),
  ('SXT-L-BK', 'K2', 'OUT', 320, '2026-09-14T00:00:00.000Z'),
  ('SXT-XL-BK', 'K3', 'OUT', 280, '2026-09-14T00:00:00.000Z'),
  ('SXT-XXXL-BK', 'K5', 'OUT', 400, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 350, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 265, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 386, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-14T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 460, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 277, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 288, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 180, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 220, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 220, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 280, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 240, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 260, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 247, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 240, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 220, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 200, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 420, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'IN', 300, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'IN', 417, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'IN', 300, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'IN', 2240, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'IN', 620, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 520, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'IN', 279, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'IN', 350, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 2600, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'IN', 900, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 300, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'IN', 1120, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-GN', 'H1', 'IN', 240, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'IN', 720, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'IN', 1280, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'IN', 180, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'IN', 400, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 700, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 1308, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 3100, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'IN', 830, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 1400, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'IN', 1300, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 580, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 800, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 321, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 321, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 1000, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'IN', 296, '2026-09-15T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-M-GY', 'F2', 'IN', 592, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 888, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 900, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'IN', 300, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'IN', 592, '2026-09-15T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 320, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 240, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXL-BU', 'I5', 'OUT', 300, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 220, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 300, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 280, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'OUT', 200, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 207, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 280, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 212, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 321, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 320, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 110, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 220, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 280, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 220, '2026-09-16T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 240, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 220, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'OUT', 187, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 200, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 220, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 300, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 200, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 220, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 240, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 241, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 233, '2026-09-17T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 350, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 268, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'OUT', 240, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 244, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 279, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 200, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 42, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 217, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 220, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 160, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 320, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 188, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 350, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 200, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'OUT', 300, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 240, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-S-FGY', 'J1', 'IN', 202, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-FGY', 'J2', 'IN', 1582, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'IN', 718, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'IN', 480, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-FGY', 'J5', 'IN', 400, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXXL-FGY', 'J6', 'IN', 414, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'IN', 300, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'IN', 900, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 1560, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 1040, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXXL-BU', 'I5', 'IN', 220, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXL-BU', 'I5', 'IN', 173, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'IN', 289, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'IN', 280, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'IN', 724, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 520, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 300, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 462, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 600, '2026-09-18T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 179, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 1200, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 1821, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 300, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 441, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 440, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 731, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'IN', 300, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'IN', 518, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'IN', 260, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'IN', 600, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'IN', 220, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 220, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 272, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'OUT', 270, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 240, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 245, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-19T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-M-APR', 'C2', 'OUT', 142, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 390, '2026-09-19T00:00:00.000Z'),
  ('HXDX-XXL-WH', 'N4', 'IN', 440, '2026-09-19T00:00:00.000Z'),
  ('HXDX-S-BK', 'N4', 'IN', 662, '2026-09-19T00:00:00.000Z'),
  ('HXDX-M-BK', 'N4', 'IN', 276, '2026-09-19T00:00:00.000Z'),
  ('HXDX-L-BK', 'N4', 'IN', 240, '2026-09-19T00:00:00.000Z'),
  ('HXDX-XXL-BK', 'N4', 'IN', 440, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-BU', 'I4', 'OUT', 220, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 227, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 210, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 66, '2026-09-19T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'OUT', 300, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 350, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 350, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 160, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 68, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 288, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 238, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 300, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 338, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 263, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 202, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 251, '2026-09-20T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 350, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'OUT', 260, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 288, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 180, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 273, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 321, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 260, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 260, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 300, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 300, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 160, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 260, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'OUT', 260, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 312, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 350, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 350, '2026-09-21T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 400, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 350, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 240, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 100, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 300, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 200, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-22T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 177, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 220, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'IN', 1200, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 1670, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 2275, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'IN', 700, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'IN', 840, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'IN', 900, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 880, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'IN', 700, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-BK', 'B5', 'IN', 1180, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'IN', 2100, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 717, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 846, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'IN', 280, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'IN', 146, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'IN', 554, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 290, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 270, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'IN', 285, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'IN', 116, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'IN', 300, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 300, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-RD', 'G1', 'IN', 906, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'IN', 1408, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 1382, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 1154, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'IN', 1611, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'IN', 1264, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 326, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 350, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 1206, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 1800, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'IN', 1050, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'IN', 280, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 200, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 215, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-S-RD', 'G1', 'IN', 600, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 1220, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 480, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'IN', 880, '2026-09-23T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 117, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'OUT', 250, '2026-09-24T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-S-WH', 'A1', 'OUT', 343, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 350, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'IN', 83, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 172, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 865, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'IN', 223, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'IN', 296, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 300, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 280, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXXL-BK', 'B6', 'IN', 70, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-BK', 'B4', 'IN', 96, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'IN', 50, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 164, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'IN', 240, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'IN', 240, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXXL-BU', 'I5', 'IN', 444, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-M-BU', 'I2', 'IN', 606, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-BU', 'I4', 'IN', 486, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 1820, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'IN', 1440, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 700, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'IN', 198, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'IN', 262, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 245, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-M-FGY', 'J2', 'OUT', 350, '2026-09-24T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 250, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 300, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 220, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-09-25T00:00:00.000Z'),
  ('HXDX-L-DRD', 'N4', 'IN', 260, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 260, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 350, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 300, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 280, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-09-25T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 245, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 258, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 300, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 280, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 280, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 240, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 240, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 200, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-S-RD', 'G1', 'IN', 618, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'IN', 900, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'IN', 1821, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'IN', 820, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'IN', 1323, '2026-09-26T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 260, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 200, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 320, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'OUT', 300, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 263, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 350, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 320, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 281, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 288, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 300, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 262, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 204, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 300, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'OUT', 218, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 241, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 300, '2026-09-27T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 185, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 238, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 278, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-28T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'IN', 1222, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'IN', 600, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'IN', 732, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'IN', 939, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'IN', 441, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'IN', 440, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'IN', 490, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 480, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'IN', 457, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'IN', 240, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'IN', 223, '2026-09-29T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-XL-BN', 'D4', 'OUT', 300, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 200, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-M-RD', 'G2', 'OUT', 300, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 300, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 300, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 350, '2026-09-29T00:00:00.000Z'),
  ('TZSLN-100-BK', 'L2', 'OUT', 440, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 240, '2026-09-29T00:00:00.000Z'),
  ('TZSLN-130-APR', 'L3', 'OUT', 507, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 280, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'OUT', 260, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 223, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXXL-FGY', 'J6', 'OUT', 220, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 210, '2026-09-29T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 256, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 237, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 295, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-130-BK', 'L2', 'OUT', 490, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-90-BK', 'L2', 'OUT', 517, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-120-BU', 'L8', 'IN', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'IN', 500, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 282, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-130-BU', 'L8', 'IN', 100, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-110-APR', 'L3', 'IN', 500, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-BU', 'L8', 'IN', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-RD', 'L4', 'IN', 760, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-APR', 'L3', 'IN', 400, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-BN', 'L6', 'IN', 700, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-110-GN', 'L7', 'IN', 340, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-APR', 'L3', 'IN', 220, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-PK', 'L5', 'IN', 240, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-GN', 'L7', 'IN', 220, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-120-BN', 'L6', 'IN', 180, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-BU', 'L8', 'IN', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-BU', 'L8', 'IN', 420, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-BN', 'L6', 'IN', 540, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-WH', 'L1', 'IN', 300, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-130-APR', 'L3', 'IN', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 238, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-BU', 'I4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-GY', 'F1', 'OUT', 192, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-RD', 'G6', 'OUT', 223, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'OUT', 100, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 236, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 195, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SXT-XL-BK', 'K3', 'OUT', 140, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 252, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-S-WH', 'N7', 'IN', 500, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-M-WH', 'N7', 'IN', 500, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-L-WH', 'N7', 'IN', 300, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-XL-WH', 'N7', 'IN', 480, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-S-BK', 'N7', 'IN', 400, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-M-BK', 'N7', 'IN', 900, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-L-BK', 'N7', 'IN', 300, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-XL-BK', 'N7', 'IN', 300, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-S-APR', 'N7', 'IN', 400, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-M-APR', 'N7', 'IN', 400, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-L-APR', 'N7', 'IN', 500, '2026-09-30T00:00:00.000Z'),
  ('LQSLN-XL-APR', 'N7', 'IN', 600, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 146, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 264, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 381, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'OUT', 100, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 244, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 1844, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-APR', 'L3', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-110-GN', 'L7', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SXT-M-BK', 'K1', 'IN', 320, '2026-09-30T00:00:00.000Z'),
  ('SXT-L-BK', 'K2', 'IN', 880, '2026-09-30T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SXT-XL-BK', 'K3', 'IN', 1700, '2026-09-30T00:00:00.000Z'),
  ('SXT-XXL-BK', 'K4', 'IN', 820, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-BN', 'D1', 'OUT', 400, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-FGY', 'J5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-BN', 'L6', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 244, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-APR', 'L3', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 214, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'IN', 663, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'IN', 420, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'IN', 77, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'IN', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 250, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 116, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-PK', 'E1', 'OUT', 400, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-APR', 'C1', 'OUT', 412, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-FGY', 'J1', 'OUT', 302, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 102, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 150, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-GN', 'H2', 'OUT', 384, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-RD', 'G4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 320, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 156, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 232, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-GY', 'F5', 'OUT', 253, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BU', 'I3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-WH', 'A1', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-GN', 'H5', 'OUT', 180, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-RD', 'G5', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 96, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-120-APR', 'L3', 'OUT', 560, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 172, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-GY', 'F2', 'OUT', 242, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-110-APR', 'L3', 'OUT', 100, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-BN', 'L6', 'OUT', 420, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-90-APR', 'L3', 'OUT', 727, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-BU', 'I5', 'OUT', 201, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 240, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-BN', 'D2', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 248, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-GN', 'H6', 'OUT', 160, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 237, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 280, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-GY', 'F6', 'OUT', 180, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-RD', 'G3', 'OUT', 255, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-WH', 'A3', 'OUT', 242, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-S-BK', 'B1', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 260, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-GN', 'H3', 'OUT', 350, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 300, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 250, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 271, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 220, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 114, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XXXL-PK', 'E6', 'OUT', 200, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-100-APR', 'L3', 'OUT', 600, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-150-GN', 'L7', 'OUT', 420, '2026-09-30T00:00:00.000Z'),
  ('TZSLN-140-APR', 'L3', 'OUT', 400, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-FGY', 'J4', 'OUT', 100, '2026-09-30T00:00:00.000Z'),
  ('SLNDX-XL-GN', 'H4', 'OUT', 247, '2026-09-30T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;

INSERT INTO transactions (product_id, location_id, type, quantity, transaction_date, notes)
SELECT p.id, l.id, t.type, t.quantity, t.transaction_date::timestamptz, 'Migrasi Excel'
FROM (VALUES
  ('SLNDX-L-WH', 'A3', 'OUT', 300, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXXL-APR', 'C6', 'OUT', 214, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXL-BN', 'D5', 'OUT', 220, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XL-BN', 'D4', 'OUT', 300, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXL-WH', 'A5', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XL-WH', 'A4', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXL-APR', 'C5', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-M-BK', 'B2', 'OUT', 300, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-M-PK', 'E2', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-BN', 'D3', 'OUT', 260, '2026-10-06T00:00:00.000Z'),
  ('SXT-XL-BK', 'K3', 'OUT', 140, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXXL-WH', 'A6', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXXL-BN', 'D6', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-PK', 'E3', 'OUT', 260, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-GY', 'F3', 'OUT', 240, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-BK', 'B3', 'OUT', 252, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XL-PK', 'E4', 'OUT', 352, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XL-GY', 'F4', 'OUT', 240, '2026-10-06T00:00:00.000Z'),
  ('TZSLN-100-WH', 'L1', 'OUT', 542, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-FGY', 'J3', 'OUT', 278, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XL-APR', 'C4', 'OUT', 350, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-M-APR', 'C2', 'OUT', 300, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-L-APR', 'C3', 'OUT', 321, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-XXL-PK', 'E5', 'OUT', 200, '2026-10-06T00:00:00.000Z'),
  ('SLNDX-M-WH', 'A2', 'OUT', 260, '2026-10-06T00:00:00.000Z')
) AS t(sku, loc, type, quantity, transaction_date)
JOIN products p ON p.sku = t.sku
JOIN locations l ON l.code = t.loc;


-- ==========================================
-- SELESAI! Cek dengan query:
-- SELECT COUNT(*) FROM transactions;
-- SELECT COUNT(*) FROM products;
-- SELECT * FROM stocks LIMIT 10;
-- ==========================================
