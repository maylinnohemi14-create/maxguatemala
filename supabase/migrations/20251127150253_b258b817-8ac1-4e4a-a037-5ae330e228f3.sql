-- Add IP address column to orders table
ALTER TABLE public.orders 
ADD COLUMN ip_address text;

-- Create index for faster IP lookups
CREATE INDEX idx_orders_ip_address ON public.orders(ip_address);

-- Create function to check if IP already has an order
CREATE OR REPLACE FUNCTION public.ip_has_order(client_ip text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.orders WHERE ip_address = client_ip
  )
$$;