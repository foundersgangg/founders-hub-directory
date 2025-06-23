
-- Create table for community join requests
CREATE TABLE public.community_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  founder_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city_state TEXT NOT NULL,
  startup_name TEXT NOT NULL,
  startup_description TEXT NOT NULL,
  startup_stage TEXT NOT NULL,
  website TEXT,
  team_size INTEGER NOT NULL,
  looking_for TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.community_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (since this is a public form)
CREATE POLICY "Anyone can submit community applications" 
  ON public.community_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow reading applications (you might want to restrict this later)
CREATE POLICY "Anyone can view community applications" 
  ON public.community_applications 
  FOR SELECT 
  USING (true);
