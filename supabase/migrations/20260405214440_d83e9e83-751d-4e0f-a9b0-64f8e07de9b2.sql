
-- Table to store blocked phone numbers permanently
CREATE TABLE public.blocked_phones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefono TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blocked_phones ENABLE ROW LEVEL SECURITY;

-- Admins can view all blocked phones
CREATE POLICY "Admins can view blocked phones"
  ON public.blocked_phones FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete blocked phones (unblock)
CREATE POLICY "Admins can delete blocked phones"
  ON public.blocked_phones FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert blocked phones manually
CREATE POLICY "Admins can insert blocked phones"
  ON public.blocked_phones FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Anyone (anon) can also insert (for when orders are placed by unauthenticated users)
CREATE POLICY "Anyone can insert blocked phones"
  ON public.blocked_phones FOR INSERT
  TO anon
  WITH CHECK (true);

-- Function to check if a phone is blocked
CREATE OR REPLACE FUNCTION public.phone_is_blocked(client_phone TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.blocked_phones WHERE telefono = client_phone
  )
$$;

-- Backfill: insert existing order phones into blocked_phones
INSERT INTO public.blocked_phones (telefono)
SELECT DISTINCT telefono FROM public.orders
ON CONFLICT (telefono) DO NOTHING;
