
-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo TEXT,
  description TEXT NOT NULL,
  industry TEXT NOT NULL,
  funding TEXT,
  founded TEXT,
  employees TEXT,
  location TEXT,
  website TEXT,
  twitter TEXT,
  about TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create founders table
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  title TEXT NOT NULL,
  company TEXT,
  company_slug TEXT,
  bio TEXT,
  location TEXT,
  twitter TEXT,
  linkedin TEXT,
  website TEXT,
  background TEXT,
  achievements TEXT[],
  previous_experience JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create company metrics table
CREATE TABLE public.company_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles (only authenticated users can view their own profile)
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for companies (public read, admin write)
CREATE POLICY "Anyone can view companies" 
  ON public.companies 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage companies" 
  ON public.companies 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for founders (public read, admin write)
CREATE POLICY "Anyone can view founders" 
  ON public.founders 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage founders" 
  ON public.founders 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for company metrics (public read, admin write)
CREATE POLICY "Anyone can view company metrics" 
  ON public.company_metrics 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can manage company metrics" 
  ON public.company_metrics 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
