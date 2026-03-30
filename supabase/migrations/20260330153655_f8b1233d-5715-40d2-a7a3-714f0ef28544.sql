CREATE OR REPLACE FUNCTION public.phone_has_order(client_phone text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.orders
    WHERE telefono = client_phone
  )
$$;