import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const instanceId = Deno.env.get('ZAPI_INSTANCE_ID');
    const token = Deno.env.get('ZAPI_TOKEN');

    if (!instanceId || !token) {
      console.error('Missing Z-API credentials');
      throw new Error('Z-API credentials not configured');
    }

    const { telefono, nombres, precio_total } = await req.json();
    
    // Format phone number for WhatsApp (remove spaces, dashes, add country code if needed)
    let phoneNumber = telefono.replace(/[\s\-\(\)]/g, '');
    
    // If doesn't start with country code, assume Colombia (+57)
    if (!phoneNumber.startsWith('57') && !phoneNumber.startsWith('+57')) {
      phoneNumber = '57' + phoneNumber;
    }
    phoneNumber = phoneNumber.replace('+', '');
    
    console.log('Sending WhatsApp to:', phoneNumber);

    const message = `¡Hola ${nombres}! 🎉

✅ *Tu pedido ha sido confirmado*

📦 *Resumen de tu compra:*
• Producto: Mini Proyector LED 4K
• Total: $${precio_total} COP

🚚 *Envío:* Gratis
💵 *Pago:* Contra Entrega

Tu pedido será enviado en las próximas 24-48 horas. Te notificaremos cuando esté en camino.

📱 ¿Dudas? Responde a este mensaje.

¡Gracias por tu compra! 🙏`;

    const zapiUrl = `https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`;
    
    const response = await fetch(zapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        message: message,
      }),
    });

    const result = await response.json();
    console.log('Z-API response:', result);

    if (!response.ok) {
      console.error('Z-API error:', result);
      throw new Error(`Z-API error: ${JSON.stringify(result)}`);
    }

    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error sending WhatsApp:', error);
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
