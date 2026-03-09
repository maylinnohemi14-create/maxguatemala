import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Truck,
  CreditCard,
  Shield,
  Star,
  Check,
  Play,
  Wifi,
  Smartphone,
  Volume2,
  Zap,
  Package,
  Gift,
  Clock,
  Users,
} from "lucide-react";
import projectorMain from "@/assets/projector-main.jpg";
import projectorPromo from "@/assets/projector-promo.png";
import projectorLifestyle1 from "@/assets/projector-lifestyle-1.jpg";
import projectorLifestyle2 from "@/assets/projector-lifestyle-2.jpg";
import projectorDetail from "@/assets/projector-detail.jpg";
import maxHeader from "@/assets/max-header.png";
import { CODForm } from "@/components/CODForm";
import { TrackingPixels } from "@/components/TrackingPixels";
import { trackTikTokConversion } from "@/hooks/useTrackingPixels";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LegalFooter } from "@/components/LegalFooter";

const Index = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "PROYECTOR-VEVSHAO-A10-GT";
  const PRODUCT_PRICE = 359;

  // TikTok: LandingPageView + ViewContent on mount
  useEffect(() => {
    trackTikTokConversion('LandingPageView');
    trackTikTokConversion('ViewContent', {
      content_id: 'PROYECTOR-VEVSHAO-A10-GT',
      content_type: 'product',
      content_name: 'Proyector Vevshao A10',
      value: 359,
      currency: 'GTQ'
    });
  }, []);

  const handleDialogChange = (open: boolean) => {
    if (open) {
      trackTikTokConversion('AddToWishlist', { content_id: PRODUCT_ID, content_type: 'product', value: PRODUCT_PRICE, currency: 'GTQ' });
    }
    setShowCODForm(open);
  };

  const images = [projectorPromo, projectorMain, projectorLifestyle1, projectorLifestyle2, projectorDetail];

  const features = [
    {
      icon: Play,
      title: "Imágenes Nítidas 4K",
      description: "Disfruta de imágenes cristalinas en cualquier ambiente",
    },
    {
      icon: Volume2,
      title: "Sonido Envolvente",
      description: "Altavoces integrados con audio de alta calidad",
    },
    {
      icon: Wifi,
      title: "Conectividad Total",
      description: "WiFi, Bluetooth, HDMI, USB y mucho más",
    },
    {
      icon: Smartphone,
      title: "Compatible con Todos los Dispositivos",
      description: "Conecta smartphone, laptop, consola y TV box",
    },
  ];

  const testimonials = [
    { name: "María Rodríguez", rating: 5, comment: "¡Increíble! Transformó mi sala en un cine. La calidad de imagen es excepcional y la instalación fue súper fácil.", date: "Hace 2 días" },
    { name: "Carlos Gómez", rating: 5, comment: "¡Mejor compra que hice este año! El sonido es excelente y la conectividad con mi celular es perfecta. ¡Lo recomiendo mucho!", date: "Hace 1 semana" },
    { name: "Ana López", rating: 5, comment: "¡Producto de calidad profesional! Lo uso para reuniones de trabajo y también para ver películas. Vale cada peso.", date: "Hace 2 semanas" },
    { name: "José Hernández", rating: 5, comment: "Mis hijos están felices, ven películas y juegan en pantalla gigante. La mejor inversión para la familia.", date: "Hace 3 días" },
    { name: "Sofía Martínez", rating: 5, comment: "La calidad del proyector es impresionante por el precio. Lo recomiendo a todos mis amigos.", date: "Hace 5 días" },
    { name: "Pedro García", rating: 5, comment: "Llegó rápido y funciona perfecto. El sonido integrado es más que suficiente. ¡Excelente compra!", date: "Hace 1 semana" },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % (testimonials.length - 2));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <TrackingPixels />
      

      {/* MAX Header */}
      <div className="w-full bg-white">
        <img src={maxHeader} alt="MAX Guatemala - Tienda de Electrónicos" className="w-full h-auto object-contain sm:object-cover max-h-[120px] sm:max-h-none mx-auto sm:mx-0 p-2 sm:p-0" />
      </div>

      {/* Trust Bar */}
      <div className="bg-gradient-hero text-primary-foreground py-2">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Envío Gratis</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Pago Contra Entrega</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Garantía 2 Años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Product Gallery */}
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-3 sm:mb-4 bg-white">
              <img
                src={images[selectedImage]}
                alt="Projetor VEVSHAO A10"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-md sm:rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImage === idx
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Imagem ${idx + 1}`}
                    className="w-full h-auto object-contain aspect-square bg-white"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                (200+ reseñas)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
              2 PROYECTORES VEVSHAO A10 + REGALO
              <Badge className="block sm:inline-block mt-2 sm:mt-0 sm:ml-3 bg-primary text-primary-foreground text-xs sm:text-sm px-2 sm:px-3 py-1 animate-pulse-glow w-fit">
                COMPRE 1 Y LLEVA OTRO GRATIS
              </Badge>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 font-bold">
              Transforma cualquier espacio en un cine con conectividad completa y sonido envolvente.
            </p>

            <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
            <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground animate-pulse-slow">Q359</span>
                <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground line-through">Q899</span>
              </div>
              <div className="flex items-center gap-2 text-success animate-lightning">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">¡Ahorra 60% hoy!</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {/* MagisTV Benefit */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground font-bold">
                    🎬 MagisTV — Transforma tu proyector en un cine completo
                  </span>
                  <Badge className="bg-success text-success-foreground text-[10px] sm:text-xs px-2 py-0.5">
                    🎁 INCLUIDO GRATIS
                  </Badge>
                </div>
              </div>
              {/* Pantalla Benefit */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm sm:text-base text-foreground font-bold">
                    🖥️ Pantalla de Proyección — La mejor experiencia visual
                  </span>
                  <Badge className="bg-success text-success-foreground text-[10px] sm:text-xs px-2 py-0.5">
                    🎁 INCLUIDO GRATIS
                  </Badge>
                </div>
              </div>
              {[
                "Disfruta imágenes nítidas en cualquier habitación",
                "Experimenta sonido envolvente sin altavoces extra",
                "Conecta dispositivos fácilmente con múltiples opciones",
                "Proyecta con claridad incluso con luz ambiental",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 sm:mb-6">
              <label className="block font-semibold mb-2 sm:mb-3 text-foreground text-sm sm:text-base">Cantidad:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-secondary hover:bg-muted transition-colors font-bold text-base sm:text-lg"
                  >
                    -
                  </button>
                  <span className="px-5 sm:px-8 py-2 sm:py-3 font-bold text-base sm:text-lg border-x-2 border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-secondary hover:bg-muted transition-colors font-bold text-base sm:text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-6 sm:mb-8">
              <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full text-base sm:text-lg font-bold py-6 sm:py-8 bg-gradient-hero hover:shadow-glow transition-all"
                  >
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    COMPRAR AHORA - ¡LLEVA 2x1!
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] overflow-y-auto p-3 sm:p-6 rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Formulario de Pedido - Pago Contra Entrega</DialogTitle>
                  </DialogHeader>
                  {showCODForm && (
                    <CODForm
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="Proyector Vevshao A10 - Compra 1 y Lleva 2"
                      productImage={projectorPromo}
                      onOrderComplete={() => {
                        setShowCODForm(false);
                        toast.success("¡Pedido registrado exitosamente!");
                      }}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <TrustBadge
                icon={Truck}
                title="Envío Gratis"
                description="En toda Guatemala"
              />
              <TrustBadge
                icon={Shield}
                title="Compra Segura"
                description="Garantía de 2 años"
              />
              <TrustBadge
                icon={Clock}
                title="Entrega Rápida"
                description="3 a 5 días hábiles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
              Características Profesionales
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnología de punta para proporcionar la mejor experiencia visual
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Image Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="animate-fade-in order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                Experiencia Cinematográfica en Casa
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                Crea momentos inolvidables con tu familia viendo películas, series y jugando
                en una pantalla gigante de hasta 200 pulgadas. La calidad de imagen 4K garantiza
                nitidez excepcional incluso en ambientes con luz ambiental.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {[
                  "Resolución 1920x1080 Full HD",
                  "Proyección de 40 a 200 pulgadas",
                  "Contraste 5000:1 para colores vibrantes",
                  "Lámpara LED con 50.000 horas de vida",
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base text-foreground font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large animate-scale-in order-1 md:order-2">
              <img
                src={projectorLifestyle1}
                alt="Familia viendo proyector"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-xl sm:text-3xl font-bold text-foreground">
                Lo Que Dicen Nuestros Clientes
              </h2>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Más de 200 reseñas positivas de clientes satisfechos
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.slice(testimonialIndex, testimonialIndex + 3).map((testimonial, idx) => (
              <div key={`${testimonialIndex}-${idx}`} className="animate-fade-in">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Cómo funciona la promoción 2x1?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Al comprar un proyector VEVSHAO A10, automáticamente recibes otro proyector
                idéntico completamente gratis. ¡Es nuestra forma de agradecer la confianza en
                nuestros productos!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Cuál es el tiempo de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                El tiempo de entrega es de 3 a 5 días hábiles para toda Guatemala. Recibirás un
                código de rastreo tan pronto como el producto sea despachado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿El proyector es compatible con mi celular?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                ¡Sí! El proyector es compatible con cualquier smartphone a través de conexión WiFi,
                cable HDMI o adaptadores. Funciona con iOS, Android y todos los sistemas
                operativos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Tiene garantía?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                ¡Sí! Ofrecemos garantía de 30 días de satisfacción garantizada o devolución de tu dinero,
                además de 2 años de garantía del fabricante contra defectos de fabricación.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Cómo es el pago contra entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Puedes elegir pagar contra entrega en efectivo directamente al
                mensajero. También aceptamos pago anticipado con tarjeta de crédito, débito
                y transferencia bancaria.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-hero text-primary-foreground py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <Gift className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">
            ¡Promoción Especial: Compra 1 y Lleva 2!
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Aprovecha esta promoción exclusiva y lleva dos proyectores profesionales por el precio de uno.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6">
            <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Envío gratis a toda Guatemala</span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => handleDialogChange(true)}
            className="bg-foreground text-background hover:bg-foreground/90 text-base sm:text-xl font-bold py-5 sm:py-8 px-8 sm:px-12 shadow-large w-full sm:w-auto"
          >
            ASEGURAR MI PROMOCIÓN AHORA
          </Button>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-75">
            ✓ Envío Gratis ✓ Pago Contra Entrega ✓ Garantía de 2 Años
          </p>
        </div>
      </section>

      {/* Footer */}
      <LegalFooter />
    </div>
  );
};

export default Index;
