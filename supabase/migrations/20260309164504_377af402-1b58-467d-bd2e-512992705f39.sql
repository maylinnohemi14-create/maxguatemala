
-- Drop the restrictive "Anyone can read active pixels" policy and recreate as permissive
DROP POLICY IF EXISTS "Anyone can read active pixels" ON public.tracking_pixels;

CREATE POLICY "Anyone can read active pixels"
ON public.tracking_pixels
FOR SELECT
TO public
USING (is_active = true);
