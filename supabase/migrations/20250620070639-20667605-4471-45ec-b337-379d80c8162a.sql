
-- Create a table to store citizen requests/submissions
CREATE TABLE public.citizen_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  sector TEXT NOT NULL,
  problem_type TEXT NOT NULL,
  form_data JSONB NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.citizen_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for citizen_requests
CREATE POLICY "Users can view own requests" 
  ON public.citizen_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own requests" 
  ON public.citizen_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests" 
  ON public.citizen_requests 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_citizen_requests_user_id ON public.citizen_requests(user_id);
CREATE INDEX idx_citizen_requests_sector ON public.citizen_requests(sector);
CREATE INDEX idx_citizen_requests_status ON public.citizen_requests(status);
