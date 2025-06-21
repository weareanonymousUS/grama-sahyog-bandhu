
-- Create admin_users table to store admin credentials and info
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  employee_id TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  permissions JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create admin_sessions table to track admin login sessions
CREATE TABLE public.admin_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES public.admin_users(id) ON DELETE CASCADE NOT NULL,
  login_time TIMESTAMP WITH TIME ZONE DEFAULT now(),
  logout_time TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT,
  is_active BOOLEAN DEFAULT true
);

-- Create admin_dashboard_stats table for dashboard metrics
CREATE TABLE public.admin_dashboard_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE DEFAULT CURRENT_DATE,
  total_requests INTEGER DEFAULT 0,
  pending_requests INTEGER DEFAULT 0,
  completed_requests INTEGER DEFAULT 0,
  sector_wise_stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for admin tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_dashboard_stats ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_users
CREATE POLICY "Admins can view their own record" 
  ON public.admin_users 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all admin records" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS policies for admin_sessions
CREATE POLICY "Admins can view their own sessions" 
  ON public.admin_sessions 
  FOR SELECT 
  USING (
    admin_user_id IN (
      SELECT id FROM public.admin_users WHERE user_id = auth.uid()
    )
  );

-- RLS policies for admin_dashboard_stats
CREATE POLICY "Admins can view dashboard stats" 
  ON public.admin_dashboard_stats 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Function to handle new admin user creation
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only create admin record if user_type is admin
  IF NEW.raw_user_meta_data->>'user_type' = 'admin' THEN
    INSERT INTO public.admin_users (
      user_id, 
      employee_id, 
      department, 
      role
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'employee_id', 'EMP' || substr(NEW.id::text, 1, 8)),
      COALESCE(NEW.raw_user_meta_data->>'department', 'General'),
      COALESCE(NEW.raw_user_meta_data->>'role', 'admin')
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to automatically create admin user record
CREATE TRIGGER on_auth_admin_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE PROCEDURE public.handle_new_admin_user();
