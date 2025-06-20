
-- Create separate tables for each sector
CREATE TABLE public.agriculture_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  land_area DECIMAL,
  crop_type TEXT,
  survey_number TEXT,
  description TEXT NOT NULL,
  location TEXT,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.roads_infrastructure_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  location TEXT NOT NULL,
  road_type TEXT,
  urgency_level TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.health_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  patient_age INTEGER,
  hospital_name TEXT,
  urgency_level TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.education_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  student_name TEXT,
  school_name TEXT,
  class TEXT,
  academic_year TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.electricity_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  consumer_number TEXT,
  location TEXT NOT NULL,
  issue_type TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.employment_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  job_card_number TEXT,
  skill_area TEXT,
  work_type TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.housing_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  plot_number TEXT,
  construction_type TEXT,
  family_size INTEGER,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.welfare_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  problem_type TEXT NOT NULL,
  beneficiary_name TEXT,
  beneficiary_age INTEGER,
  service_type TEXT,
  description TEXT NOT NULL,
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE public.agriculture_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roads_infrastructure_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.electricity_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.housing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.welfare_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all tables
CREATE POLICY "Users can view own agriculture requests" ON public.agriculture_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own agriculture requests" ON public.agriculture_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own roads requests" ON public.roads_infrastructure_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roads requests" ON public.roads_infrastructure_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own health requests" ON public.health_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own health requests" ON public.health_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own education requests" ON public.education_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own education requests" ON public.education_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own electricity requests" ON public.electricity_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own electricity requests" ON public.electricity_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own employment requests" ON public.employment_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own employment requests" ON public.employment_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own housing requests" ON public.housing_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own housing requests" ON public.housing_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own welfare requests" ON public.welfare_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own welfare requests" ON public.welfare_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Create storage policies
CREATE POLICY "Users can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
