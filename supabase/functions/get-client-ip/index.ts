import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Client IP detected:', clientIp);

    // Parse request body for optional phone check
    let phone: string | null = null;
    try {
      const body = await req.json();
      phone = body?.phone || null;
      // Normalize phone: remove non-digit characters
      if (phone) {
        phone = phone.replace(/\D/g, '');
      }
    } catch {
      // No body or invalid JSON - that's fine, just check IP
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if this IP already has an order
    const { data: existingOrder, error } = await supabase
      .from('orders')
      .select('id')
      .eq('ip_address', clientIp)
      .limit(1);

    if (error) {
      console.error('Error checking IP:', error);
      throw error;
    }

    const hasOrderByIp = existingOrder && existingOrder.length > 0;

    // Check if phone already has an order
    let hasOrderByPhone = false;
    if (phone) {
      const { data: phoneOrder, error: phoneError } = await supabase
        .from('orders')
        .select('id')
        .eq('telefono', phone)
        .limit(1);

      if (phoneError) {
        console.error('Error checking phone:', phoneError);
      } else {
        hasOrderByPhone = phoneOrder && phoneOrder.length > 0;
      }
    }

    const hasOrder = hasOrderByIp || hasOrderByPhone;

    console.log('IP has existing order:', hasOrderByIp, '| Phone has existing order:', hasOrderByPhone);

    return new Response(
      JSON.stringify({ 
        ip: clientIp, 
        hasOrder,
        hasOrderByIp,
        hasOrderByPhone,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error in get-client-ip function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
