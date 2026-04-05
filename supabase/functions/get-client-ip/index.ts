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
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Client IP detected:', clientIp);

    // Parse request body for phone check
    let phone: string | null = null;
    try {
      const body = await req.json();
      phone = body?.phone || null;
      if (phone) {
        phone = phone.replace(/\D/g, '');
      }
    } catch {
      // No body or invalid JSON
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if phone is in the blocked_phones table (persistent, survives order deletion)
    let isPhoneBlocked = false;
    if (phone) {
      const { data: blockedPhone, error: blockedError } = await supabase
        .from('blocked_phones')
        .select('id')
        .eq('telefono', phone)
        .limit(1);

      if (blockedError) {
        console.error('Error checking blocked phones:', blockedError);
      } else {
        isPhoneBlocked = blockedPhone && blockedPhone.length > 0;
      }
    }

    console.log('Phone blocked:', isPhoneBlocked, '| Phone:', phone);

    return new Response(
      JSON.stringify({ 
        ip: clientIp, 
        hasOrder: isPhoneBlocked,
        isPhoneBlocked,
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
