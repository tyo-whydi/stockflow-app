BEGIN;

DO $$
BEGIN
  IF to_regclass('public.categories') IS NULL
     OR to_regclass('public.locations') IS NULL
     OR to_regclass('public.products') IS NULL
     OR to_regclass('public.stocks') IS NULL
     OR to_regclass('public.transactions') IS NULL
     OR to_regclass('public.profiles') IS NULL
     OR to_regclass('public.audit_logs') IS NULL THEN
    RAISE EXCEPTION 'StockFlow tenant migration requires all existing WMS tables';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.profiles profile
    LEFT JOIN auth.users auth_user ON auth_user.id = profile.id
    WHERE auth_user.id IS NULL
  ) THEN
    RAISE EXCEPTION 'StockFlow tenant migration found profiles without matching auth users';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.profiles profile
    JOIN auth.users auth_user ON auth_user.id = profile.id
    WHERE profile.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'StockFlow tenant migration requires at least one existing profile with the admin role';
  END IF;
END;
$$;

CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 120),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.company_memberships (
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'manager', 'staff')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (company_id, user_id)
);

ALTER TABLE public.categories ADD COLUMN company_id uuid;
ALTER TABLE public.locations ADD COLUMN company_id uuid;
ALTER TABLE public.products ADD COLUMN company_id uuid;
ALTER TABLE public.stocks ADD COLUMN company_id uuid;
ALTER TABLE public.transactions ADD COLUMN company_id uuid;
ALTER TABLE public.audit_logs ADD COLUMN company_id uuid;

DO $$
DECLARE
  v_company_id uuid;
BEGIN
  INSERT INTO public.companies (name, created_by)
  VALUES (
    'Perusahaan Utama',
    (
      SELECT id
      FROM public.profiles
      ORDER BY CASE WHEN role = 'admin' THEN 0 ELSE 1 END, created_at ASC NULLS LAST, id
      LIMIT 1
    )
  )
  RETURNING id INTO v_company_id;

  INSERT INTO public.company_memberships (company_id, user_id, role)
  SELECT
    v_company_id,
    id,
    CASE WHEN role IN ('admin', 'manager', 'staff') THEN role ELSE 'staff' END
  FROM public.profiles
  ON CONFLICT (company_id, user_id) DO NOTHING;

  UPDATE public.categories SET company_id = v_company_id WHERE company_id IS NULL;
  UPDATE public.locations SET company_id = v_company_id WHERE company_id IS NULL;
  UPDATE public.products SET company_id = v_company_id WHERE company_id IS NULL;
  UPDATE public.stocks SET company_id = v_company_id WHERE company_id IS NULL;
  UPDATE public.transactions SET company_id = v_company_id WHERE company_id IS NULL;
  UPDATE public.audit_logs SET company_id = v_company_id WHERE company_id IS NULL;
END;
$$;

ALTER TABLE public.categories ALTER COLUMN company_id SET NOT NULL;
ALTER TABLE public.locations ALTER COLUMN company_id SET NOT NULL;
ALTER TABLE public.products ALTER COLUMN company_id SET NOT NULL;
ALTER TABLE public.stocks ALTER COLUMN company_id SET NOT NULL;
ALTER TABLE public.transactions ALTER COLUMN company_id SET NOT NULL;
ALTER TABLE public.audit_logs ALTER COLUMN company_id SET NOT NULL;

ALTER TABLE public.categories
  ADD CONSTRAINT categories_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT,
  ADD CONSTRAINT categories_id_company_key UNIQUE (id, company_id);
ALTER TABLE public.locations
  ADD CONSTRAINT locations_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT,
  ADD CONSTRAINT locations_id_company_key UNIQUE (id, company_id);
ALTER TABLE public.products
  ADD CONSTRAINT products_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT,
  ADD CONSTRAINT products_id_company_key UNIQUE (id, company_id);
ALTER TABLE public.stocks
  ADD CONSTRAINT stocks_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT;
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT;
ALTER TABLE public.audit_logs
  ADD CONSTRAINT audit_logs_company_id_fkey
  FOREIGN KEY (company_id) REFERENCES public.companies(id) ON DELETE RESTRICT;

ALTER TABLE public.categories DROP CONSTRAINT categories_name_key;
ALTER TABLE public.locations DROP CONSTRAINT locations_code_key;
ALTER TABLE public.products DROP CONSTRAINT products_sku_key;

ALTER TABLE public.products DROP CONSTRAINT products_category_id_fkey;
ALTER TABLE public.stocks DROP CONSTRAINT stocks_product_id_fkey;
ALTER TABLE public.stocks DROP CONSTRAINT stocks_location_id_fkey;
ALTER TABLE public.transactions DROP CONSTRAINT transactions_product_id_fkey;
ALTER TABLE public.transactions DROP CONSTRAINT transactions_location_id_fkey;

ALTER TABLE public.products
  ADD CONSTRAINT categories_company_fkey
  FOREIGN KEY (category_id, company_id)
  REFERENCES public.categories(id, company_id) ON DELETE RESTRICT;
ALTER TABLE public.stocks
  ADD CONSTRAINT stocks_product_company_fkey
  FOREIGN KEY (product_id, company_id)
  REFERENCES public.products(id, company_id) ON DELETE RESTRICT,
  ADD CONSTRAINT stocks_location_company_fkey
  FOREIGN KEY (location_id, company_id)
  REFERENCES public.locations(id, company_id) ON DELETE RESTRICT,
  ADD CONSTRAINT stocks_company_product_location_key
  UNIQUE (company_id, product_id, location_id);
ALTER TABLE public.transactions
  ADD CONSTRAINT transactions_product_company_fkey
  FOREIGN KEY (product_id, company_id)
  REFERENCES public.products(id, company_id) ON DELETE RESTRICT,
  ADD CONSTRAINT transactions_location_company_fkey
  FOREIGN KEY (location_id, company_id)
  REFERENCES public.locations(id, company_id) ON DELETE RESTRICT;

CREATE UNIQUE INDEX categories_company_name_key ON public.categories (company_id, name);
CREATE UNIQUE INDEX locations_company_code_key ON public.locations (company_id, code);
CREATE UNIQUE INDEX products_company_sku_key ON public.products (company_id, sku);
CREATE INDEX categories_company_id_idx ON public.categories (company_id);
CREATE INDEX locations_company_id_idx ON public.locations (company_id);
CREATE INDEX products_company_id_idx ON public.products (company_id);
CREATE INDEX stocks_company_id_idx ON public.stocks (company_id);
CREATE INDEX transactions_company_date_idx ON public.transactions (company_id, transaction_date DESC);
CREATE INDEX audit_logs_company_created_idx ON public.audit_logs (company_id, created_at DESC);
CREATE INDEX company_memberships_user_id_idx ON public.company_memberships (user_id, company_id);

CREATE OR REPLACE FUNCTION public.is_company_member(p_company_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.company_memberships membership
    WHERE membership.company_id = p_company_id
      AND membership.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', split_part(NEW.email, '@', 1)),
    'staff'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.has_company_role(p_company_id uuid, p_roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.company_memberships membership
    WHERE membership.company_id = p_company_id
      AND membership.user_id = auth.uid()
      AND membership.role = ANY (p_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.can_access_profile(p_profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
  SELECT p_profile_id = auth.uid()
    OR EXISTS (
      SELECT 1
      FROM public.company_memberships viewer
      JOIN public.company_memberships target
        ON target.company_id = viewer.company_id
      WHERE viewer.user_id = auth.uid()
        AND viewer.role IN ('admin', 'manager')
        AND target.user_id = p_profile_id
    );
$$;

CREATE OR REPLACE FUNCTION public.create_company(p_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_company_id uuid;
  v_name text := btrim(p_name);
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM public.company_memberships membership
    WHERE membership.user_id = v_user_id
  ) AND NOT EXISTS (
    SELECT 1
    FROM public.company_memberships membership
    WHERE membership.user_id = v_user_id
      AND membership.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only a company admin can create another company' USING ERRCODE = '42501';
  END IF;
  IF v_name IS NULL OR char_length(v_name) NOT BETWEEN 2 AND 120 THEN
    RAISE EXCEPTION 'Company name must be between 2 and 120 characters';
  END IF;

  INSERT INTO public.companies (name, created_by)
  VALUES (v_name, v_user_id)
  RETURNING id INTO v_company_id;

  INSERT INTO public.company_memberships (company_id, user_id, role)
  VALUES (v_company_id, v_user_id, 'admin');

  RETURN v_company_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.add_company_member(
  p_company_id uuid,
  p_email text,
  p_role text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_user_id uuid;
  v_existing_role text;
  v_email text := lower(btrim(p_email));
BEGIN
  IF NOT public.has_company_role(p_company_id, ARRAY['admin']) THEN
    RAISE EXCEPTION 'Only a company admin can manage members' USING ERRCODE = '42501';
  END IF;
  IF p_role NOT IN ('admin', 'manager', 'staff') THEN
    RAISE EXCEPTION 'Invalid company role';
  END IF;
  IF v_email IS NULL OR v_email = '' THEN
    RAISE EXCEPTION 'Email is required';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(p_company_id::text, 0));

  SELECT profile.id
  INTO v_user_id
  FROM public.profiles profile
  WHERE lower(profile.email) = v_email
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No StockFlow account exists for this email';
  END IF;

  SELECT membership.role
  INTO v_existing_role
  FROM public.company_memberships membership
  WHERE membership.company_id = p_company_id
    AND membership.user_id = v_user_id
  FOR UPDATE;

  IF v_existing_role = 'admin'
     AND p_role <> 'admin'
     AND (
       SELECT count(*)
       FROM public.company_memberships membership
       WHERE membership.company_id = p_company_id
         AND membership.role = 'admin'
     ) <= 1 THEN
    RAISE EXCEPTION 'The last company admin cannot be demoted';
  END IF;

  INSERT INTO public.company_memberships (company_id, user_id, role)
  VALUES (p_company_id, v_user_id, p_role)
  ON CONFLICT (company_id, user_id)
  DO UPDATE SET role = EXCLUDED.role;

  RETURN v_user_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.remove_company_member(
  p_company_id uuid,
  p_user_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_role text;
BEGIN
  IF NOT public.has_company_role(p_company_id, ARRAY['admin']) THEN
    RAISE EXCEPTION 'Only a company admin can manage members' USING ERRCODE = '42501';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtextextended(p_company_id::text, 0));

  SELECT membership.role
  INTO v_role
  FROM public.company_memberships membership
  WHERE membership.company_id = p_company_id
    AND membership.user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  IF v_role = 'admin'
     AND (
       SELECT count(*)
       FROM public.company_memberships membership
       WHERE membership.company_id = p_company_id
         AND membership.role = 'admin'
     ) <= 1 THEN
    RAISE EXCEPTION 'The last company admin cannot be removed';
  END IF;

  DELETE FROM public.company_memberships
  WHERE company_id = p_company_id AND user_id = p_user_id;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.replace_company_transaction(
  p_transaction_id bigint,
  p_product_id integer,
  p_location_id integer,
  p_type text,
  p_quantity integer,
  p_notes text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_old_transaction public.transactions%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT EXISTS (
    SELECT 1
    FROM public.company_memberships membership
    WHERE membership.user_id = auth.uid()
      AND membership.role = 'admin'
  ) THEN
    RETURN false;
  END IF;

  SELECT *
  INTO v_old_transaction
  FROM public.transactions
  WHERE id = p_transaction_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN false;
  END IF;
  IF NOT public.has_company_role(v_old_transaction.company_id, ARRAY['admin']) THEN
    RETURN false;
  END IF;
  IF p_type IS NULL OR p_type NOT IN ('IN', 'OUT') OR p_quantity IS NULL OR p_quantity < 1 THEN
    RAISE EXCEPTION 'Invalid transaction type or quantity';
  END IF;

  DELETE FROM public.transactions
  WHERE id = p_transaction_id;

  INSERT INTO public.transactions (
    company_id, product_id, location_id, user_id, type, quantity, notes, transaction_date
  )
  VALUES (
    v_old_transaction.company_id,
    p_product_id,
    p_location_id,
    auth.uid(),
    p_type,
    p_quantity,
    coalesce(btrim(p_notes), ''),
    now()
  );

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_audit_trail()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
  v_row jsonb;
  v_old_data jsonb;
  v_new_data jsonb;
  v_company_id uuid;
  v_record_id text;
  v_description text;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_row := to_jsonb(OLD);
    v_old_data := v_row;
  ELSIF TG_OP = 'UPDATE' THEN
    v_row := to_jsonb(NEW);
    v_old_data := to_jsonb(OLD);
    v_new_data := v_row;
  ELSIF TG_OP = 'INSERT' THEN
    v_row := to_jsonb(NEW);
    v_new_data := v_row;
  ELSE
    RAISE EXCEPTION 'Unsupported audit operation: %', TG_OP;
  END IF;

  v_company_id := (v_row ->> 'company_id')::uuid;
  v_record_id := v_row ->> 'id';
  v_description := CASE TG_OP
    WHEN 'DELETE' THEN 'Menghapus data dari ' || TG_TABLE_NAME
    WHEN 'UPDATE' THEN 'Mengubah data di ' || TG_TABLE_NAME
    ELSE 'Menambah data baru di ' || TG_TABLE_NAME
  END;

  INSERT INTO public.audit_logs (
    company_id, user_id, table_name, record_id, action,
    description, old_data, new_data
  )
  VALUES (
    v_company_id, auth.uid(), TG_TABLE_NAME, v_record_id, TG_OP,
    v_description, v_old_data, v_new_data
  );

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_stock_on_transaction()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  IF NEW.type = 'IN' THEN
    INSERT INTO public.stocks (company_id, product_id, location_id, current_stock)
    VALUES (NEW.company_id, NEW.product_id, NEW.location_id, NEW.quantity)
    ON CONFLICT (company_id, product_id, location_id)
    DO UPDATE SET current_stock = COALESCE(public.stocks.current_stock, 0) + EXCLUDED.current_stock;
  ELSIF NEW.type = 'OUT' THEN
    UPDATE public.stocks
    SET current_stock = COALESCE(current_stock, 0) - NEW.quantity
    WHERE company_id = NEW.company_id
      AND product_id = NEW.product_id
      AND location_id = NEW.location_id
      AND COALESCE(current_stock, 0) >= NEW.quantity;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Insufficient stock for this outbound transaction'
        USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.reverse_stock_on_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
  IF OLD.type = 'IN' THEN
    UPDATE public.stocks
    SET current_stock = COALESCE(current_stock, 0) - OLD.quantity
    WHERE company_id = OLD.company_id
      AND product_id = OLD.product_id
      AND location_id = OLD.location_id
      AND COALESCE(current_stock, 0) >= OLD.quantity;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Cannot reverse inbound transaction after its stock has been consumed'
        USING ERRCODE = '23514';
    END IF;
  ELSIF OLD.type = 'OUT' THEN
    UPDATE public.stocks
    SET current_stock = COALESCE(current_stock, 0) + OLD.quantity
    WHERE company_id = OLD.company_id
      AND product_id = OLD.product_id
      AND location_id = OLD.location_id;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Stock row is missing for the transaction being reversed';
    END IF;
  END IF;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS audit_profiles ON public.profiles;

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY companies_select_member
  ON public.companies FOR SELECT TO authenticated
  USING (public.is_company_member(id));
CREATE POLICY companies_update_admin
  ON public.companies FOR UPDATE TO authenticated
  USING (public.has_company_role(id, ARRAY['admin']))
  WITH CHECK (public.has_company_role(id, ARRAY['admin']));

CREATE POLICY memberships_select_company
  ON public.company_memberships FOR SELECT TO authenticated
  USING (public.is_company_member(company_id));

CREATE POLICY categories_company_select
  ON public.categories FOR SELECT TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin', 'manager']));
CREATE POLICY categories_admin_manage
  ON public.categories FOR ALL TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin']))
  WITH CHECK (public.has_company_role(company_id, ARRAY['admin']));
CREATE POLICY locations_company_select
  ON public.locations FOR SELECT TO authenticated
  USING (public.is_company_member(company_id));
CREATE POLICY locations_admin_manage
  ON public.locations FOR ALL TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin']))
  WITH CHECK (public.has_company_role(company_id, ARRAY['admin']));
CREATE POLICY products_company_select
  ON public.products FOR SELECT TO authenticated
  USING (public.is_company_member(company_id));
CREATE POLICY products_admin_manage
  ON public.products FOR ALL TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin']))
  WITH CHECK (public.has_company_role(company_id, ARRAY['admin']));
CREATE POLICY stocks_company_select
  ON public.stocks FOR SELECT TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin', 'manager']));
CREATE POLICY transactions_company_select
  ON public.transactions FOR SELECT TO authenticated
  USING (
    public.is_company_member(company_id)
    AND (
      user_id = auth.uid()
      OR public.has_company_role(company_id, ARRAY['admin', 'manager'])
    )
  );
CREATE POLICY transactions_company_insert
  ON public.transactions FOR INSERT TO authenticated
  WITH CHECK (
    public.has_company_role(company_id, ARRAY['admin', 'staff'])
    AND (user_id = auth.uid() OR public.has_company_role(company_id, ARRAY['admin']))
  );
CREATE POLICY transactions_admin_manage
  ON public.transactions FOR ALL TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin']))
  WITH CHECK (public.has_company_role(company_id, ARRAY['admin']));
CREATE POLICY audit_logs_company_select
  ON public.audit_logs FOR SELECT TO authenticated
  USING (public.has_company_role(company_id, ARRAY['admin', 'manager']));

CREATE POLICY profiles_read_self_or_company
  ON public.profiles FOR SELECT TO authenticated
  USING (public.can_access_profile(id));
CREATE POLICY profiles_update_self
  ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

REVOKE ALL ON TABLE
  public.companies,
  public.company_memberships,
  public.categories,
  public.locations,
  public.products,
  public.stocks,
  public.transactions,
  public.audit_logs,
  public.profiles
FROM PUBLIC, anon;
REVOKE ALL ON TABLE
  public.companies,
  public.company_memberships,
  public.categories,
  public.locations,
  public.products,
  public.stocks,
  public.transactions,
  public.audit_logs,
  public.profiles
FROM authenticated;

GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON public.companies, public.company_memberships TO authenticated;
GRANT UPDATE (name) ON public.companies TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.categories, public.locations, public.products, public.transactions
  TO authenticated;
GRANT SELECT ON public.stocks, public.audit_logs TO authenticated;
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (full_name) ON public.profiles TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE
  public.categories_id_seq,
  public.locations_id_seq,
  public.products_id_seq,
  public.stocks_id_seq,
  public.transactions_id_seq
  TO authenticated;

REVOKE ALL ON FUNCTION public.is_company_member(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_company_role(uuid, text[]) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.can_access_profile(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.create_company(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.add_company_member(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.remove_company_member(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.replace_company_transaction(bigint, integer, integer, text, integer, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_audit_trail() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_stock_on_transaction() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.reverse_stock_on_delete() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.is_company_member(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_company_role(uuid, text[]) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_access_profile(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_company(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_company_member(uuid, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.remove_company_member(uuid, uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.replace_company_transaction(bigint, integer, integer, text, integer, text) TO authenticated;

COMMIT;
