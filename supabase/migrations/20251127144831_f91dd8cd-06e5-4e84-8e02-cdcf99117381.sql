-- Add policy to allow public reading of active tracking pixels
CREATE POLICY "Anyone can read active pixels" 
ON public.tracking_pixels 
FOR SELECT 
USING (is_active = true);