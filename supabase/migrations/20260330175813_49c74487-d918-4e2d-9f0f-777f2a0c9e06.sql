
CREATE TABLE public.abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres text,
  telefono text NOT NULL,
  page_url text,
  product_id text,
  ip_address text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.abandoned_carts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert abandoned carts"
ON public.abandoned_carts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view abandoned carts"
ON public.abandoned_carts
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete abandoned carts"
ON public.abandoned_carts
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can delete their own abandoned cart by phone"
ON public.abandoned_carts
FOR DELETE
TO anon, authenticated
USING (true);
