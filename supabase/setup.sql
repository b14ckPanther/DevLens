-- DevLens Database Setup script

-- 1. Create ENUMS
CREATE TYPE project_category AS ENUM ('sales', 'menus', 'landing', 'booking', 'market');
CREATE TYPE lead_status AS ENUM ('pending', 'approved', 'declined', 'completed');

-- 2. Create Projects Table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    category project_category NOT NULL,
    initials TEXT NOT NULL,
    color TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    logo_url TEXT,
    cover_url TEXT,
    link_url TEXT,
    is_published BOOLEAN DEFAULT true
);

-- 3. Create Pricing Plans Table
CREATE TABLE public.plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    price_one_time NUMERIC,
    price_subscription NUMERIC,
    description_en TEXT,
    description_ar TEXT,
    features_en JSONB,
    features_ar JSONB,
    is_popular BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0
);

-- 4. Create Leads Table
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service_requested TEXT,
    business_type TEXT,
    notes TEXT,
    status lead_status DEFAULT 'pending',
    converted_project_id UUID REFERENCES public.projects(id)
);

-- 5. Create Analytics / Page Views Table
CREATE TABLE public.page_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    path TEXT NOT NULL,
    device_type TEXT,
    country TEXT,
    user_agent TEXT
);

-- 6. Create Settings Table
CREATE TABLE public.settings (
    id INT PRIMARY KEY DEFAULT 1,
    started_year INT DEFAULT 2023,
    base_clients_count INT DEFAULT 40
);

-- Row Level Security (RLS)

-- Projects Table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can insert projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update projects" ON public.projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete projects" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');

-- Plans Table
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Plans are viewable by everyone." ON public.plans FOR SELECT USING (true);
CREATE POLICY "Admins can insert plans" ON public.plans FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update plans" ON public.plans FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete plans" ON public.plans FOR DELETE USING (auth.role() = 'authenticated');

-- Leads Table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admins can view leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admins can update leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Only admins can delete leads" ON public.leads FOR DELETE USING (auth.role() = 'authenticated');

-- Storage Bucket (project_assets)
INSERT INTO storage.buckets (id, name, public) VALUES ('project_assets', 'project_assets', true);

CREATE POLICY "Give users public access to project assets" ON storage.objects FOR SELECT USING (bucket_id = 'project_assets');
CREATE POLICY "Admins can upload to project_assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project_assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can update to project_assets" ON storage.objects FOR UPDATE USING (bucket_id = 'project_assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can delete from project_assets" ON storage.objects FOR DELETE USING (bucket_id = 'project_assets' AND auth.role() = 'authenticated');
