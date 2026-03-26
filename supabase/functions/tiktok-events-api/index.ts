import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TIKTOK_ACCESS_TOKEN = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    if (!TIKTOK_ACCESS_TOKEN) {
      throw new Error('TIKTOK_ACCESS_TOKEN not configured');
    }

    const body = await req.json();
    const {
      pixel_id,
      event,
      event_id,
      timestamp,
      user_agent,
      ip,
      page_url,
      page_referrer,
      email,
      phone,
      external_id,
      ttclid,
      ttp,
      content_id,
      content_name,
      content_type,
      value,
      currency,
      quantity,
    } = body;

    if (!pixel_id || !event) {
      return new Response(
        JSON.stringify({ error: 'pixel_id and event are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build user data with hashed PII
    const user_data: Record<string, any> = {};
    if (email) user_data.email = await sha256(email.trim().toLowerCase());
    if (phone) user_data.phone = await sha256(phone.trim());
    if (external_id) user_data.external_id = await sha256(external_id.trim());
    if (ip) user_data.ip = ip;
    if (user_agent) user_data.user_agent = user_agent;
    if (ttclid) user_data.ttclid = ttclid;
    if (ttp) user_data.ttp = ttp;

    // Build properties
    const properties: Record<string, any> = {};
    if (content_id) properties.content_id = content_id;
    if (content_name) properties.content_name = content_name;
    if (content_type) properties.content_type = content_type || 'product';
    if (value !== undefined) properties.value = value;
    if (currency) properties.currency = currency;
    if (quantity) properties.quantity = quantity;

    // Build contents array
    if (content_id) {
      properties.contents = [{
        content_id,
        content_type: content_type || 'product',
        content_name: content_name || '',
        quantity: quantity || 1,
        price: value || 0,
      }];
    }

    const payload = {
      pixel_code: pixel_id,
      partner_name: 'Lovable',
      event_source: 'web',
      event_source_id: pixel_id,
      data: [{
        event,
        event_id: event_id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        event_time: timestamp || Math.floor(Date.now() / 1000),
        user: user_data,
        properties,
        page: {
          url: page_url || '',
          referrer: page_referrer || '',
        },
      }],
    };

    console.log('TikTok Events API payload:', JSON.stringify(payload, null, 2));

    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': TIKTOK_ACCESS_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    console.log('TikTok Events API response:', JSON.stringify(result));

    if (result.code !== 0) {
      console.error('TikTok Events API error:', result.message);
      return new Response(
        JSON.stringify({ success: false, error: result.message, tiktok_code: result.code }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Event sent to TikTok' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function sha256(value: string): Promise<string> {
  if (!value) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
