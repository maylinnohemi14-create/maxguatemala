import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { nombres, telefono, page_url, product_id } = body;

    if (!telefono) {
      return new Response(
        JSON.stringify({ error: 'Phone is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if this phone already has a completed order - don't save as abandoned
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('telefono', telefono)
      .limit(1);

    if (existingOrder && existingOrder.length > 0) {
      return new Response(
        JSON.stringify({ saved: false, reason: 'already_ordered' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Delete any existing abandoned cart for this phone (avoid duplicates)
    await supabase
      .from('abandoned_carts')
      .delete()
      .eq('telefono', telefono);

    // Insert new abandoned cart
    const { error } = await supabase
      .from('abandoned_carts')
      .insert({
        nombres: nombres || null,
        telefono,
        page_url: page_url || null,
        product_id: product_id || null,
        ip_address: clientIp,
      });

    if (error) throw error;

    console.log('Abandoned cart saved for phone:', telefono);

    return new Response(
      JSON.stringify({ saved: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error saving abandoned cart:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
