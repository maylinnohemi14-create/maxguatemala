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
  Eye,
  Package,
  Gift,
  Clock,
  Users,
  Sun,
  Zap,
  Sparkles,
  ShoppingCart,
  Glasses,
  Monitor,
} from "lucide-react";
import gafasMain from "@/assets/gafas-main.png";
import reviewPatricia from "@/assets/review-patricia.jpg";
import reviewJose from "@/assets/review-jose.jpg";
import reviewElena from "@/assets/review-elena.jpg";
import reviewPedroGafas from "@/assets/review-pedro-gafas.jpg";
import gafasDemo from "@/assets/gafas-demo.gif";
import gafasProtection from "@/assets/gafas-protection.gif";
import gafasLightweight from "@/assets/gafas-lightweight.gif";
import drRoncero from "@/assets/dr-roncero.jpg";
import { CODForm } from "@/components/CODForm";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trackTikTokConversion, trackFacebookConversion } from "@/hooks/useTrackingPixels";

const Gafas = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  const [liveViewers, setLiveViewers] = useState(12);
  
  // Update live viewers randomly between 12-15
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(Math.floor(Math.random() * 4) + 12);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  const PRODUCT_ID = "GAFAS-TR90-2X1";
  const PRODUCT_PRICE = 99900;

  // TikTok: LandingPageView + ViewContent on mount
  useEffect(() => {
    trackTikTokConversion('LandingPageView');
    trackTikTokConversion('ViewContent', {
      content_id: 'GAFAS-TR90-2X1',
      content_type: 'product',
      content_name: 'Gafas TR90 2x1',
      value: 99900,
      currency: 'COP'
    });
  }, []);

  const handleDialogChange = (open: boolean) => {
    if (open) {
      trackTikTokConversion('AddToWishlist', { content_id: PRODUCT_ID, content_type: 'product', value: PRODUCT_PRICE, currency: 'COP' });
    }
    setShowCODForm(open);
  };

  const images = [gafasMain, gafasMain, gafasMain, gafasMain];

  const colombianNames = [
    "Laura Rodríguez de Bogotá",
    "Patricia García de Medellín",
    "Sandra Martínez de Cali",
    "Elena López de Barranquilla",
    "Carmen González de Cartagena",
    "Rosa Hernández de Bucaramanga",
    "Isabel Pérez de Pereira",
    "María Ramírez de Cúcuta",
    "Ana Torres de Manizales",
    "Lucía Castro de Ibagué",
    "José Morales de Santa Marta",
    "Pedro Gutiérrez de Villavicencio",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = colombianNames[Math.floor(Math.random() * colombianNames.length)];
      
      toast.success(
        <div>
          👓 <span className="text-primary font-bold">{randomName}</span> acaba de comprar
        </div>,
        {
          description: "¡Quedan pocas unidades disponibles!",
          duration: 4000,
        }
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Patricia F.",
      rating: 5,
      comment: "Me han encantado desde el primer día. La visión es nítida en todo momento, incluso cuando paso de leer un libro a mirar la tele. Son cómodas, bonitas y prácticas.",
      date: "Hace 3 días",
      image: reviewPatricia,
    },
    {
      name: "Jose M.",
      rating: 5,
      comment: "Son perfectas para mi día a día. Las uso para leer, para conducir y para el ordenador. Muy buena calidad y no se rayan fácilmente. Estoy muy satisfecho.",
      date: "Hace 1 semana",
      image: reviewJose,
    },
    {
      name: "Elena B.",
      rating: 5,
      comment: "No pensé que fueran a ser tan útiles. Ahora puedo leer, coser y mirar la televisión sin cambiar de gafas. Estoy muy contenta con la compra y la oferta 2x1 me vino genial.",
      date: "Hace 2 semanas",
      image: reviewElena,
    },
    {
      name: "Pedro S.",
      rating: 5,
      comment: "Llevo semanas utilizándolas y estoy encantado. Veo claro tanto de cerca como de lejos y no siento fatiga visual. Además, el diseño es elegante y me queda muy bien.",
      date: "Hace 3 semanas",
      image: reviewPedroGafas,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TrackingPixels />
      
      

      {/* Trust Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2">
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
              <span>Garantía 3 Años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Product Gallery */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large bg-gradient-to-br from-slate-800 to-slate-900 relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-red-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 animate-pulse">
                  OFERTA 2X1 🔥
                </Badge>
              </div>
              <img
                src={gafasMain}
                alt="Lentes Multifocales TR90"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            {/* Promo Badge */}
            <div className="mb-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-xs sm:text-sm px-3 py-1.5 border-0 shadow-lg">
                🔥 OFERTA ESPECIAL - COMPRA 1 LLÉVATE 2 🔥
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                4.9 (156,367 Reviews)
              </span>
            </div>

            <p className="text-sm text-blue-600 font-semibold mb-2">
              +17.000 mil comprados esta semana
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
              LENTES MULTIFOCALES TR90 - OFERTA 2X1
            </h1>

            {/* Price Section - Professional Style */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-transparent border-2 border-blue-500/30 shadow-lg relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                {/* Original Price with strikethrough */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-red-500 decoration-2">$189.800 COP</span>
                </div>
                
                {/* Current Price */}
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600 animate-pulse-scale drop-shadow-sm">
                    $99.900
                  </span>
                  <span className="text-lg sm:text-xl font-semibold text-muted-foreground">COP</span>
                </div>
                
                {/* Savings Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-green-500 text-white font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-base">💰</span>
                    <span>AHORRAS $89.900</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-600 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full border border-red-500/30">
                    <span className="text-base">🔥</span>
                    <span>-47% OFF</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            {(() => {
              const today = new Date();
              const formatDate = (date: Date) => {
                return `${date.getDate()} ${date.toLocaleDateString('es-CO', { month: 'short' }).replace('.', '')}`;
              };
              const addDays = (date: Date, days: number) => {
                const result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
              };
              const confirmedDate = formatDate(today);
              const dispatchStart = formatDate(addDays(today, 1));
              const deliveryStart = formatDate(addDays(today, 3));
              const deliveryEnd = formatDate(addDays(today, 4));
              
              return (
                <div className="mb-4 sm:mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col items-center text-center">
                      <ShoppingCart className="w-5 h-5 mb-1 text-blue-500" />
                      <span className="font-bold">{confirmedDate}</span>
                      <span className="text-muted-foreground">Pedido Hecho</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-blue-500/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 mb-1 text-blue-500" />
                      <span className="font-bold">{dispatchStart}</span>
                      <span className="text-muted-foreground">Pedido Enviado</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-blue-500/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Gift className="w-5 h-5 mb-1 text-blue-500" />
                      <span className="font-bold">{deliveryStart}-{addDays(today, 4).getDate()}</span>
                      <span className="text-muted-foreground">Recibido</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Benefits List */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                { icon: "🔍", text: "Enfoque automático", bold: "para ver de cerca y de lejos" },
                { icon: "💎", text: "Ultraligeras", bold: "y resistentes - solo 17 gramos" },
                { icon: "🛡️", text: "Protección completa", bold: "contra luz azul y UV400" },
                { icon: "✨", text: "Diseño elegante", bold: "y minimalista" },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                    <span className="text-sm">{benefit.icon}</span>
                  </div>
                  <span className="text-sm sm:text-base text-foreground">
                    {benefit.text} <strong>{benefit.bold}</strong>
                  </span>
                </div>
              ))}
            </div>

            {/* Live View */}
            <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>{liveViewers} personas están viendo esto</span>
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
                    className="w-full text-base sm:text-lg font-bold py-5 sm:py-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all animate-button-bounce"
                  >
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                    PAGO CONTRA ENTREGA + Envío Gratis
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
                      productName="Lentes Multifocales TR90 - OFERTA 2X1"
                      productImage={gafasMain}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 3 Años', description: 'Protección Total para tus lentes' }
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
                description="En toda Colombia"
              />
              <TrustBadge
                icon={Shield}
                title="Garantía 3 Años"
                description="Producto garantizado"
              />
              <TrustBadge
                icon={Clock}
                title="Entrega Rápida"
                description="3 a 4 días hábiles"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              🏷️ ¡50% DE DESCUENTO POR BLACK FRIDAY! 🔥 ¡UNIDADES LIMITADAS! 🚨
            </span>
          ))}
        </div>
      </div>

      <section className="py-10 sm:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/30">
              ¡ÚLTIMO DÍA DE PROMOCIÓN! Compra 1 y llévate 2
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-foreground">
              LA REVOLUCIÓN DE LAS GAFAS<br />TODO EN UNO
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              ¡Olvídate de <strong>cambiar de lentes</strong>! Con nuestras <strong>lentes multifocales</strong> progresivas, 
              podrás ver de <strong>cerca y de lejos</strong>, en cualquier situación, con <strong>máxima comodidad</strong>.
            </p>
          </div>

          {/* Feature 1: Multifocal */}
          <div className="grid md:grid-cols-2 gap-6 items-center mb-10">
            <div className="order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                LENTES PARA TODAS TUS NECESIDADES
              </h3>
              <p className="text-muted-foreground mb-4">
                ¿Necesitas <strong>ver de cerca y de lejos</strong>? Con nuestras gafas obtendrás la 
                <strong> mejor tecnología</strong> de lentes progresivas multifocales.
              </p>
              <p className="text-muted-foreground">
                <strong>Se adaptan a tu visión</strong> en cualquier distancia, brindándote una 
                <strong> transición suave</strong> entre diferentes campos de visión.
              </p>
            </div>
          </div>

          {/* Feature 2: Protection */}
          <div className="grid md:grid-cols-2 gap-6 items-center mb-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                PROTECCIÓN TOTAL
              </h3>
              <p className="text-muted-foreground mb-4">
                Nuestras gafas bloquean el <strong>100% de los rayos UV400</strong> y la 
                <strong> luz azul dañina</strong> que emiten las pantallas digitales, 
                <strong> reduciendo la fatiga visual</strong> y <strong>protegiendo tus ojos</strong> 
                tanto en interiores como en exteriores.
              </p>
              <p className="text-muted-foreground">
                También, son ideales para <strong>corregir diversas condiciones visuales.</strong>
              </p>
            </div>
            <div>
              <img 
                src={gafasProtection} 
                alt="Protección de luz azul" 
                className="w-full max-w-[280px] mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Feature 3: Lightweight */}
          <div className="grid md:grid-cols-2 gap-6 items-center mb-10">
            <div className="order-2 md:order-1">
              <img 
                src={gafasLightweight} 
                alt="Gafas ultraligeras" 
                className="w-full max-w-[280px] mx-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                LIGERAS Y RESISTENTES
              </h3>
              <p className="text-muted-foreground mb-4">
                Con <strong>solo 17 gramos</strong>, nuestras gafas están hechas con 
                <strong> aleación de aluminio-magnesio</strong>, estas gafas son 
                <strong> ultraligeras y cómodas</strong>, lo que te permitirá 
                <strong> llevarlas todo el día sin molestias</strong>.
              </p>
              <p className="text-muted-foreground">
                Además, sus lentes son <strong>ultrarresistentes a golpes y arañazos</strong>, 
                garantizando una <strong>larga vida útil</strong>.
              </p>
            </div>
          </div>

          {/* Feature 4: Style */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
                ESTILO Y COMODIDAD
              </h3>
              <p className="text-muted-foreground mb-4">
                No solo <strong>mejorarás tu visión</strong>, también <strong>lucirás increíble</strong>. 
                Con su <strong>diseño elegante y minimalista</strong>, son ideales tanto para hombres como para mujeres.
              </p>
              <p className="text-muted-foreground">
                Gracias a sus <strong>almohadillas nasales ajustables</strong>, siempre tendrás un 
                <strong> ajuste perfecto</strong>, sin importar la forma de tu rostro.
              </p>
            </div>
            <div>
              <img 
                src={gafasDemo} 
                alt="Estilo elegante" 
                className="w-full max-w-[280px] mx-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Recommendation Section */}
      <section className="py-10 sm:py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative">
                <img 
                  src={drRoncero} 
                  alt="Dr. Pedro Roncero" 
                  className="w-full max-w-[350px] mx-auto rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                  Dr. Pedro Roncero
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Según el Dr. Roncero, su <strong>diseño multifocal progresivo</strong> permite a sus usuarios 
                  ver claramente tanto de cerca como de lejos sin necesidad de cambiar de lentes, una característica 
                  ideal para quienes llevan un <strong>ritmo de vida activo</strong> y necesitan una solución visual 
                  adaptable en todo momento.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Además, el Dr. Roncero destaca la <strong>protección UV y contra la luz azul</strong>, algo 
                  fundamental en la era digital para <strong>prevenir la fatiga ocular</strong> y mantener la salud visual.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Oftalmólogo Especialista</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            CARACTERÍSTICAS
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: Shield, title: "Protección Completa", desc: "Luz azul y rayos UV400" },
              { icon: Eye, title: "Multifocales", desc: "Visión clara cerca y lejos" },
              { icon: Zap, title: "Resistentes", desc: "A golpes, arañazos y agua" },
              { icon: Sparkles, title: "Ultraligeras", desc: "Solo 17 gramos" },
              { icon: Glasses, title: "Ajustables", desc: "Almohadillas nasales" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card rounded-xl p-5 border border-border shadow-md text-center">
                <div className="w-12 h-12 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-bold mb-1 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
            ¿POR QUÉ ELEGIRNOS?
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
              <div className="grid grid-cols-3 bg-blue-600 text-white font-bold text-center">
                <div className="p-4"></div>
                <div className="p-4 bg-blue-700">Nuestras Gafas</div>
                <div className="p-4">Otros</div>
              </div>
              {[
                "Protección luz azul",
                "Lentes multifocales",
                "Ultra ligeras",
                "Garantía 3 años",
              ].map((feature, idx) => (
                <div key={idx} className={`grid grid-cols-3 text-center ${idx % 2 === 0 ? 'bg-secondary/30' : 'bg-card'}`}>
                  <div className="p-4 font-medium text-left text-foreground">{feature}</div>
                  <div className="p-4 bg-blue-500/10">
                    <Check className="w-6 h-6 text-green-500 mx-auto" />
                  </div>
                  <div className="p-4">
                    <span className="text-red-500 text-lg">✕</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Datos que te interesan
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">99%</div>
              <p className="text-white/80">de los usuarios aseguran que su fatiga visual ha disminuido significativamente</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">98%</div>
              <p className="text-white/80">de los usuarios afirman que no sienten molestias tras usar las gafas todo el día</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">97%</div>
              <p className="text-white/80">de los clientes destacan la claridad de visión a diferentes distancias</p>
            </div>
          </div>
          <p className="text-center mt-6 text-white/60 text-sm">
            *Encuesta realizada por nuestros clientes este año 2025.
          </p>
        </div>
      </section>

      {/* Payment Banner */}
      <div className="bg-green-500 text-white py-3 overflow-hidden">
        <div className="animate-marquee-reverse whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              | PAGA EN CASA AL RECIBIR | ENVÍO GRATIS 🚚
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              <h2 className="text-xl sm:text-3xl font-bold text-foreground">
                Lo Que Dicen Nuestros Clientes
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-foreground">4.9</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              156,367 reviews verificadas
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
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
              <AccordionTrigger className="text-left font-semibold hover:text-blue-500 text-sm sm:text-base">
                ¿Protegen contra la luz azul y los rayos UV?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Sí, nuestras lentes ofrecen protección completa contra la <strong>luz azul emitida por pantallas digitales</strong> y 
                los <strong>rayos UV400</strong>. Esta protección reduce la fatiga visual y ayuda a mantener tus ojos sanos 
                tanto en interiores como al aire libre.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-blue-500 text-sm sm:text-base">
                ¿Son resistentes a golpes, arañazos y al agua?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Sí, las lentes son <strong>resistentes a golpes, arañazos y al agua</strong>, lo que garantiza su durabilidad 
                y que se mantendrán en perfectas condiciones incluso en entornos exigentes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-blue-500 text-sm sm:text-base">
                ¿Las lentes son cómodas para uso prolongado?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Absolutamente. Están diseñadas para ser <strong>ultraligeras (solo 17 gramos)</strong> y cuentan con 
                <strong> almohadillas nasales ajustables</strong>, lo que garantiza un ajuste cómodo durante todo el día, 
                sin importar cuánto tiempo las uses.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-blue-500 text-sm sm:text-base">
                ¿Cómo funcionan las lentes multifocales progresivas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Las lentes multifocales se ajustan automáticamente a diferentes distancias. Esto significa que puedes 
                <strong> leer de cerca, ver a media distancia o mirar a lo lejos</strong> sin necesidad de cambiar de gafas. 
                Simplemente mueve tu línea de visión y las lentes se adaptarán.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-blue-500 text-sm sm:text-base">
                ¿Qué cubre la garantía de 3 años?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                La garantía cubre cualquier <strong>defecto de fábrica</strong> o daño en el producto que no sea causado 
                por el uso indebido del mismo. Si el producto presenta un defecto al recibirlo, puedes solicitar un 
                reemplazo o reembolso dentro de los 3 años de garantía.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
            ¡No esperes más! Obtén tus Lentes Multifocales Ahora
          </h2>
          <p className="text-lg text-white/80 mb-6">
            Oferta 2x1 - Compra 1 y llévate 2 pares de gafas
          </p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all animate-button-bounce"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                COMPRAR AHORA - OFERTA 2X1
              </Button>
            </DialogTrigger>
          </Dialog>
          <p className="mt-4 text-white/80">
            💚 Pago contra entrega • 🚚 Envío gratis a toda Colombia
          </p>
        </div>
      </section>

      {/* Guarantee Banner */}
      <div className="bg-amber-500 text-black py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              | ✅ GARANTÍA 3 AÑOS | COMPRA 100% SEGURA |
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-background py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-sm text-background/70">
            © 2025 Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Gafas;
