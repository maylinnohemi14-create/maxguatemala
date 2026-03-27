import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
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
  Gift,
  Clock,
  ShoppingCart,
  Sparkles,
  Flame,
  Zap,
  Leaf,
} from "lucide-react";
import ninjaCrispiMain from "@/assets/ninja-crispi-main.png";
import ninjaCrispiDetail1 from "@/assets/ninja-crispi-detail1.png";
import ninjaCrispiDetail2 from "@/assets/ninja-crispi-detail2.png";
import ninjaCrispiLifestyle from "@/assets/ninja-crispi-lifestyle.png";
import maxHeader from "@/assets/max-header.png";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { LegalFooter } from "@/components/LegalFooter";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trackTikTokConversion, trackFacebookConversion } from "@/hooks/useTrackingPixels";

const NinjaCrispi = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "NINJA-CRISPI-GT";
  const PRODUCT_PRICE = 319;

  const productImages = [ninjaCrispiMain, ninjaCrispiDetail1, ninjaCrispiDetail2, ninjaCrispiLifestyle];

  // TikTok: LandingPageView + ViewContent on mount
  useEffect(() => {
    trackTikTokConversion('LandingPageView');
    trackTikTokConversion('ViewContent', {
      contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'CRISPi Freidora de Aire' }],
      value: PRODUCT_PRICE,
      currency: 'GTQ'
    });
    trackFacebookConversion('ViewContent', {
      content_ids: [PRODUCT_ID],
      content_type: 'product',
      content_name: 'CRISPi Freidora de Aire',
      value: PRODUCT_PRICE,
      currency: 'GTQ'
    });
  }, []);

  const handleDialogChange = (open: boolean) => {
    if (open) {
      trackTikTokConversion('AddToCart', {
        contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'CRISPi Freidora de Aire' }],
        value: PRODUCT_PRICE,
        currency: 'GTQ'
      });
      trackTikTokConversion('AddToWishlist', {
        contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'CRISPi Freidora de Aire' }],
        value: PRODUCT_PRICE,
        currency: 'GTQ'
      });
      trackFacebookConversion('AddToCart', { content_ids: [PRODUCT_ID], content_type: 'product', value: PRODUCT_PRICE, currency: 'GTQ' });
    }
    setShowCODForm(open);
  };

  const guatemalanNames = [
    "María García de Ciudad de Guatemala",
    "Carlos López de Mixco",
    "Ana Martínez de Villa Nueva",
    "José Rodríguez de Quetzaltenango",
    "Laura Hernández de Escuintla",
    "Pedro González de Petapa",
    "Rosa Pérez de Antigua",
    "Juan Morales de Cobán",
    "Carmen Torres de Huehuetenango",
    "Luis Castro de Chimaltenango",
    "Sofía Ramírez de San Marcos",
    "Diego Gutiérrez de Mazatenango",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = guatemalanNames[Math.floor(Math.random() * guatemalanNames.length)];
      
      toast.success(
        <div>
          🍗 <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
        </div>,
        {
          description: "¡Quedan pocas unidades disponibles!",
          duration: 4000,
        }
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "María L.",
      rating: 5,
      comment: "¡Increíble! Las alitas quedan súper crujientes sin aceite. Los recipientes de cristal son una maravilla, los meto directo al lavavajillas.",
      date: "Hace 3 días",
    },
    {
      name: "Roberto C.",
      rating: 5,
      comment: "Cocino papas fritas perfectas en minutos. Lo mejor es que los recipientes sirven para guardar la comida en el refri con las tapas.",
      date: "Hace 1 semana",
    },
    {
      name: "Patricia G.",
      rating: 5,
      comment: "Es compacta y cabe perfecto en mi cocina. Los 5 recipientes de cristal son geniales, puedo preparar diferentes platillos a la vez.",
      date: "Hace 2 semanas",
    },
    {
      name: "Fernando A.",
      rating: 5,
      comment: "La mejor inversión para mi cocina. Consume mucho menos electricidad que mi horno y la comida queda deliciosa. Llegó rápido a zona 11.",
      date: "Hace 3 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
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
              <span>Garantía Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Product Images */}
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-3 sm:mb-4 bg-white relative">
              <img
                src={productImages[selectedImage]}
                alt="CRISPi Freidora de Aire Portátil de Cristal"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-primary shadow-md" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-auto object-contain aspect-square bg-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            {/* Badge */}
            <div className="mb-3">
              <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-green-700">
                🇬🇹 Envío Gratis a toda Guatemala
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 4 ? 'fill-accent text-accent' : 'fill-accent/50 text-accent'}`} />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                4.4 (1,473 Valoraciones)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground leading-tight">
              Freidora de Aire Portátil de Cristal — CRISPi (Pack 5 Recipientes) 🍗✨
            </h1>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1.5 animate-pulse-glow">
                ⚡ PROMOCIÓN VÁLIDA HASTA HOY {new Date().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala', day: 'numeric', month: 'long' }).toUpperCase()} - ¡NO TE LO PIERDAS!
              </Badge>
            </div>

            {/* Price Section */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-destructive decoration-2">Q510</span>
                </div>
                
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-destructive animate-pulse-scale drop-shadow-sm">
                    Q319
                  </span>
                  <span className="text-lg sm:text-xl font-semibold text-muted-foreground">GTQ</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-success text-success-foreground font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-base">🔥</span>
                    <span>¡APROVECHA LA PROMOCIÓN!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            {(() => {
              const today = new Date();
              const formatDate = (date: Date) => {
                return `${date.getDate()} ${date.toLocaleDateString('es-GT', { month: 'short' }).replace('.', '')}`;
              };
              const addDays = (date: Date, days: number) => {
                const result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
              };
              const confirmedDate = formatDate(today);
              const dispatchStart = formatDate(addDays(today, 1));
              const deliveryStart = formatDate(addDays(today, 3));
              
              return (
                <div className="mb-4 sm:mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col items-center text-center">
                      <ShoppingCart className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{confirmedDate}</span>
                      <span className="text-muted-foreground">Confirmada</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{dispatchStart}</span>
                      <span className="text-muted-foreground">Despachada</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Gift className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{deliveryStart}-{addDays(today, 5).getDate()}</span>
                      <span className="text-muted-foreground">Entregada</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Benefits List */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                { text: "Superficie de cocción de", bold: "cristal libre de PFAS", suffix: "— más seguro para tu salud" },
                { text: "Cocina con", bold: "hasta 75% menos de grasa", suffix: "usando la función Air Fry" },
                { text: "Consume", bold: "50% menos electricidad", suffix: "que un horno convencional" },
                { text: "Incluye", bold: "5 recipientes de cristal con tapas", suffix: "— cocina y guarda" },
                { text: "Función multiusos:", bold: "freír, asar, dorar y mantener caliente", suffix: "" },
                { text: "Envío", bold: "100% gratis", suffix: "a toda Guatemala" },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">
                    {benefit.text} <strong>{benefit.bold}</strong> {benefit.suffix}
                  </span>
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

            {/* CTA Button */}
            <div className="space-y-3 mb-6 sm:mb-8">
              <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full text-base sm:text-lg font-bold py-5 sm:py-7 bg-[#E31837] hover:bg-[#C41430] text-white hover:shadow-glow transition-all animate-button-bounce"
                  >
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    Pedir con pago Contra Entrega + Envío Gratis
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] overflow-y-auto p-3 sm:p-6 rounded-xl">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">Formulario de Pedido - Pago Contra Entrega</DialogTitle>
                  </DialogHeader>
                  {showCODForm && (
                    <CODFormGuatemala
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="CRISPi Freidora de Aire (Pack 5 Recipientes)"
                      productImage={ninjaCrispiMain}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía 1 Año', description: 'Protección contra defectos' },
                        { id: 'recipientes', icon: '🥘', title: '5 Recipientes de Cristal', description: '4x 1.4L + 1x 3.8L con tapas' },
                        { id: 'recetario', icon: '📖', title: 'Recetario Digital', description: '+50 recetas saludables' },
                      ]}
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
                description="Producto garantizado"
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

      {/* Urgency Banner */}
      <div className="bg-green-600 text-white py-3 overflow-hidden w-full max-w-[100vw]">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-sm sm:text-lg font-bold">
              🍗 ¡OFERTA POR TIEMPO LIMITADO! - ÚLTIMAS UNIDADES 🔥
            </span>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Por qué elegir esta Freidora de Cristal? 🍟
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Cristal Libre de PFAS</h3>
              <p className="text-muted-foreground text-sm">Superficie de cocción de cristal resistente a cambios bruscos de temperatura. Más seguro para tu familia.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">75% Menos Grasa</h3>
              <p className="text-muted-foreground text-sm">Cocina con poco o nada de aceite. Disfruta de comidas crujientes y deliciosas de forma saludable.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">50% Menos Electricidad</h3>
              <p className="text-muted-foreground text-sm">Consume la mitad de electricidad que un horno de convección. Ahorra en tu factura de luz.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Cocina y Guarda</h3>
              <p className="text-muted-foreground text-sm">5 recipientes de cristal con tapas: cocina, sirve y guarda en el refri sin cambiar de recipiente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Qué puedes cocinar? 🍽️
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 text-center">
              <span className="text-4xl mb-4 block">🍗</span>
              <h3 className="font-bold text-lg mb-2">Pollo y Alitas</h3>
              <p className="text-muted-foreground text-sm">Alitas crujientes, pechugas jugosas y pollo frito perfecto con hasta 75% menos de grasa.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 text-center">
              <span className="text-4xl mb-4 block">🍟</span>
              <h3 className="font-bold text-lg mb-2">Papas y Vegetales</h3>
              <p className="text-muted-foreground text-sm">Papas fritas crujientes, vegetales asados y camote perfecto sin necesidad de aceite.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 text-center">
              <span className="text-4xl mb-4 block">🥩</span>
              <h3 className="font-bold text-lg mb-2">Carnes y Más</h3>
              <p className="text-muted-foreground text-sm">Carne asada, pescado dorado, empanadas y todo lo que imagines. Resultados de restaurante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            Especificaciones 📋
          </h2>
          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">📐</span>
              <p className="font-bold">Dimensiones</p>
              <p className="text-sm text-muted-foreground">34.5 × 30.4 × 34 cm</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🥘</span>
              <p className="font-bold">Recipientes</p>
              <p className="text-sm text-muted-foreground">4x 1.4L + 1x 3.8L</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🎨</span>
              <p className="font-bold">Color</p>
              <p className="text-sm text-muted-foreground">Azul oscuro metalizado</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">⚡</span>
              <p className="font-bold">Funciones</p>
              <p className="text-sm text-muted-foreground">Air Fry, Asar, Dorar, Calentar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            Lo que dicen nuestros clientes en Guatemala 🇬🇹
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Los recipientes de cristal son seguros?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Los recipientes están hechos de cristal resistente a cambios bruscos de temperatura y son libres de PFAS. Son completamente seguros para cocinar y almacenar alimentos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cuántas funciones tiene?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Esta freidora es multiusos: puedes freír con aire, asar, dorar y mantener caliente. Todo en un solo aparato compacto que no ocupa mucho espacio en tu cocina.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Los recipientes se pueden meter al lavavajillas?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Los 5 recipientes de cristal son aptos para lavavajillas, lo que hace la limpieza muy fácil. También puedes usarlos con las tapas para guardar comida en el refrigerador.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cuánto tarda en llegar a mi departamento?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Hacemos envíos a todos los departamentos de Guatemala en 3-5 días hábiles con envío completamente gratis. Pagas al recibir tu producto.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs opacity-70 mb-3">✅ Calidad garantizada — Envío a toda Guatemala</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ¡Cocina más saludable hoy! 🍗🇬🇹
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Envío gratis + Pago contra entrega + Pack 5 recipientes de cristal
          </p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#E31837] hover:bg-[#C41430] text-white hover:shadow-glow transition-all"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q319
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-secondary/50 py-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs text-muted-foreground">
            MAX Guatemala — Tienda de electrónicos y hogar. Este producto cuenta con garantía de 1 año.
            Las imágenes son de referencia. Consulta términos y condiciones.
          </p>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default NinjaCrispi;
