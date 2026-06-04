import { useEffect } from "react";
import { toast } from "sonner";
import projectorPromo from "@/assets/projector-promo.png";
import maxHeader from "@/assets/max-header.png";
import { CODForm } from "@/components/CODForm";
import { trackTikTokConversion, trackFacebookConversion } from "@/hooks/useTrackingPixels";
import { LegalFooter } from "@/components/LegalFooter";

const ProyectorFormulario = () => {
  const PRODUCT_ID = "PROYECTOR-VEVSHAO-A10-GT";
  const PRODUCT_PRICE = 329;

  useEffect(() => {
    trackTikTokConversion('LandingPageView');
    trackTikTokConversion('ViewContent', {
      contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Proyector Vevshao A10' }],
      value: PRODUCT_PRICE,
      currency: 'GTQ'
    });
    trackFacebookConversion('ViewContent', {
      content_ids: [PRODUCT_ID],
      content_type: 'product',
      content_name: 'Proyector Vevshao A10',
      value: PRODUCT_PRICE,
      currency: 'GTQ'
    });
    trackTikTokConversion('AddToCart', {
      contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Proyector Vevshao A10' }],
      value: PRODUCT_PRICE,
      currency: 'GTQ'
    });
    trackFacebookConversion('AddToCart', { content_ids: [PRODUCT_ID], content_type: 'product', value: PRODUCT_PRICE, currency: 'GTQ' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* MAX Header */}
      <div className="w-full bg-white">
        <img src={maxHeader} alt="MAX Guatemala - Tienda de Electrónicos" className="w-full h-auto object-contain sm:object-cover max-h-[120px] sm:max-h-none mx-auto sm:mx-0 p-2 sm:p-0" />
      </div>

      {/* Form Section */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-10 max-w-2xl">
        <h1 className="text-base sm:text-lg font-bold text-center mb-4 text-foreground">
          Formulario de Pedido - Pago Contra Entrega
        </h1>
        <div className="bg-card rounded-xl shadow-large p-3 sm:p-6">
          <CODForm
            productId={PRODUCT_ID}
            productPrice={PRODUCT_PRICE}
            productName="Proyector Vevshao A10 - Compra 1 y Lleva 2"
            productImage={projectorPromo}
            onOrderComplete={() => {
              toast.success("¡Pedido registrado exitosamente!");
            }}
          />
        </div>
      </section>

      {/* Footer */}
      <LegalFooter />
    </div>
  );
};

export default ProyectorFormulario;
