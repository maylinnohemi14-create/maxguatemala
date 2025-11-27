import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  departamento: string;
  ciudad: string;
  precio_total: string;
  cantidad: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials');
      throw new Error('Telegram credentials not configured');
    }

    const orderData: OrderData = await req.json();
    console.log('Received order data for notification:', orderData);

    const message = `🎉 *¡NUEVA VENTA!* 🎉

👤 *Cliente:* ${orderData.nombres} ${orderData.apellidos}
📱 *Teléfono:* ${orderData.telefono}
📍 *Dirección:* ${orderData.direccion}
🏙️ *Ciudad:* ${orderData.ciudad}, ${orderData.departamento}
📦 *Cantidad:* ${orderData.cantidad}
💰 *Total:* $${orderData.precio_total} COP

✅ Pedido registrado exitosamente`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    console.log('Telegram API response:', result);

    if (!result.ok) {
      console.error('Telegram API error:', result);
      throw new Error(`Telegram error: ${result.description}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error sending Telegram notification:', error);
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
