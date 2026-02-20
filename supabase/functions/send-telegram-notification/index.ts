import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import * as XLSX from "https://esm.sh/xlsx@0.18.5";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate XLSX content from orders
function generateXLSX(orders: any[]): Uint8Array {
  const headers = [
    'NOMBRES', 'APELLIDOS', 'DIRECCIÓN Y BARRIO', 'DEPARTAMENTO', 'CIUDAD',
    'TELÉFONO', 'ID DE PRODUCTO', 'CANTIDAD', 'PRECIO TOTAL (SIN PUNTOS NI COMAS)',
    'CON RECAUDO', 'NOTA', 'EMAIL (OPCIONAL)', 'ID DE VARIABLE (OPCIONAL)',
    'CODIGO POSTAL (OPCIONAL)', 'TRANSPORTADORA (OPCIONAL)', 'CEDULA (OPCIONAL)',
    'COLONIA (OBLIGATORIO SOLO PARA QUIKEN)', 'SEGURO (SOLO APLICA PARA ENVIA)'
  ];

  const rows = orders.map(order => [
    order.nombres || '',
    order.apellidos || '',
    order.direccion_y_barrio || '',
    order.departamento || '',
    order.ciudad || '',
    order.telefono || '',
    order.id_producto || '179',
    order.cantidad || 1,
    (order.precio_total || '').replace(/\./g, '').replace(/,/g, ''),
    order.con_recaudo || 'SI',
    order.nota || 'PROYECTOR VEV',
    order.email || '',
    order.id_variable || '',
    order.codigo_postal || '',
    order.transportadora || 'FORZA',
    order.cedula || '',
    order.colonia || '',
    order.seguro || ''
  ]);

  // Create worksheet data with headers
  const wsData = [headers, ...rows];
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Pedidos');
  
  // Generate buffer
  const xlsxBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
  
  return new Uint8Array(xlsxBuffer);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Bot for sales notifications
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');
    
    // Bot for Excel files (separate bot)
    const excelBotToken = Deno.env.get('TELEGRAM_EXCEL_BOT_TOKEN');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!botToken || !chatId) {
      console.error('Missing Telegram credentials');
      throw new Error('Telegram credentials not configured');
    }

    const { precio_total } = await req.json();
    console.log('Sending notification for purchase:', precio_total);

    // Send sales notification via main bot (VENDAS COLÔMBIA)
    const message = `🛒 Compra realizada no valor de ${precio_total}`;
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const messageResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const messageResult = await messageResponse.json();
    console.log('Telegram message response:', messageResult);

    // Fetch all orders and send Excel via Excel bot (EXCEL PEDIDOS DROPI)
    if (supabaseUrl && supabaseKey && excelBotToken) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching orders:', error);
      } else if (orders && orders.length > 0) {
        console.log(`Found ${orders.length} orders, generating XLSX...`);
        
        const xlsxBuffer = generateXLSX(orders);
        const xlsxBlob = new Blob([xlsxBuffer as BlobPart], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        // Create FormData for file upload - using Excel bot
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('document', xlsxBlob, `pedidos_dropi_${new Date().toISOString().split('T')[0]}.xlsx`);
        formData.append('caption', `📊 Excel atualizado - ${orders.length} pedido(s) total`);

        // Send via Excel bot (separate conversation)
        const documentUrl = `https://api.telegram.org/bot${excelBotToken}/sendDocument`;
        
        const docResponse = await fetch(documentUrl, {
          method: 'POST',
          body: formData,
        });

        const docResult = await docResponse.json();
        console.log('Telegram Excel bot document response:', docResult);
      }
    } else if (!excelBotToken) {
      console.log('Excel bot token not configured, skipping Excel send');
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
