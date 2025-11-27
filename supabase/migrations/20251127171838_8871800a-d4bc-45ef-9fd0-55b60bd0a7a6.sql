-- Drop the restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- Create a PERMISSIVE INSERT policy (default is permissive)
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);