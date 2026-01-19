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
  Package,
  Gift,
  Clock,
  ShoppingCart,
} from "lucide-react";
import mochilaMain from "@/assets/mochila-main.jpg";
import mochilaDetails from "@/assets/mochila-details.jpg";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { TrackingPixels } from "@/components/TrackingPixels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Guatemala = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "MOCHILA-COMPACTA-GT";
  const PRODUCT_PRICE = 199;
  
  const images = [mochilaMain, mochilaDetails];

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
          🛍️ <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
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
      name: "María G.",
      rating: 5,
      comment: "Me encanta el diseño y el puerto USB es súper práctico. La uso todos los días para ir al trabajo en zona 10. ¡Muy recomendada!",
      date: "Hace 3 días",
    },
    {
      name: "Carlos L.",
      rating: 5,
      comment: "Perfecta para el transporte público. Me siento más seguro con el cierre oculto. Llegó rapidísimo a Mixco.",
      date: "Hace 1 semana",
    },
    {
      name: "Ana M.",
      rating: 5,
      comment: "La calidad del material es excelente, ya la probé bajo la lluvia y mis cosas quedaron secas. El pago contra entrega muy cómodo.",
      date: "Hace 2 semanas",
    },
    {
      name: "Roberto S.",
      rating: 5,
      comment: "Compré una para mí y otra para mi hermano. Excelente relación calidad-precio. El envío a Quetzaltenango fue rápido.",
      date: "Hace 3 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TrackingPixels />
      
      {/* Admin Link */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/auth'}
          className="text-xs opacity-50 hover:opacity-100"
        >
          Admin
        </Button>
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
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-3 sm:mb-4 bg-white relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-red-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 animate-pulse">
                  OFERTA ESPECIAL 🔥
                </Badge>
              </div>
              <img
                src={images[selectedImage]}
                alt="Mochila Compacta"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
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
                    alt={`Imagen ${idx + 1}`}
                    className="w-full h-auto object-contain aspect-square bg-white"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            {/* Badge */}
            <div className="mb-3">
              <Badge className="bg-destructive text-destructive-foreground font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-destructive">
                🇬🇹 Envío a toda Guatemala
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                4.9 (+ 500 Reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
              MOCHILA COMPACTA CON PUERTO USB - Diseño Elegante y Funcional
            </h1>

            {/* Price Section */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-destructive decoration-2">Q349</span>
                </div>
                
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-destructive animate-pulse-scale drop-shadow-sm">
                    Q199
                  </span>
                  <span className="text-lg sm:text-xl font-semibold text-muted-foreground">GTQ</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 bg-success text-success-foreground font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-md">
                    <span className="text-base">💰</span>
                    <span>AHORRAS Q150</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full border border-destructive/30">
                    <span className="text-base">🔥</span>
                    <span>-43% OFF</span>
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
              const deliveryEnd = formatDate(addDays(today, 5));
              
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
                { text: "Puerto USB integrado para", bold: "cargar tu celular", suffix: "mientras caminas" },
                { text: "Material", bold: "impermeable y resistente", suffix: "a rasguños" },
                { text: "Diseño", bold: "antirrobo", suffix: "con cierre oculto" },
                { text: "Envío", bold: "100% gratis", suffix: "a toda Guatemala" },
                { text: "Pago", bold: "contra entrega", suffix: "- Paga cuando recibas" },
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
              <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full text-base sm:text-lg font-bold py-5 sm:py-7 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all animate-button-bounce"
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
                      key={Date.now()}
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="Mochila Compacta con Puerto USB"
                      productImage={mochilaMain}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' }
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
      <div className="bg-destructive text-destructive-foreground py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              🚨 ÚLTIMAS UNIDADES DISPONIBLES 🚨
            </span>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Por qué elegir esta Mochila? 🎒
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div>
              <img
                src={mochilaDetails}
                alt="Detalles de la Mochila"
                className="rounded-2xl shadow-large w-full"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔌</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Puerto USB Integrado</h3>
                  <p className="text-muted-foreground text-sm">Carga tu celular mientras caminas. Solo conecta tu powerbank dentro de la mochila y usa el cable externo.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💧</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Material Impermeable</h3>
                  <p className="text-muted-foreground text-sm">Protege tus pertenencias de la lluvia y derrames. Material resistente al agua de alta calidad.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Diseño Antirrobo</h3>
                  <p className="text-muted-foreground text-sm">Cierre oculto en la espalda que impide el acceso fácil a tus pertenencias cuando la llevas puesta.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎨</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Diseño Elegante</h3>
                  <p className="text-muted-foreground text-sm">Combinación de negro mate con detalles en café que combina con cualquier outfit casual o formal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-foreground">
              ¿Te identificas con esto? 🤔
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Problems */}
              <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20">
                <h3 className="text-xl font-bold mb-4 text-destructive flex items-center gap-2">
                  <span>❌</span> Sin la Mochila Compacta
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>Tu celular siempre sin batería cuando más lo necesitas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>Preocupación constante por los carteristas en el transporte público</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>Tus cosas se mojan cuando llueve de sorpresa</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-destructive mt-0.5">•</span>
                    <span>Mochilas grandes e incómodas que no combinan con tu estilo</span>
                  </li>
                </ul>
              </div>
              {/* Solutions */}
              <div className="p-6 rounded-2xl bg-success/10 border border-success/20">
                <h3 className="text-xl font-bold mb-4 text-success flex items-center gap-2">
                  <span>✅</span> Con la Mochila Compacta
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-0.5">•</span>
                    <span>Carga tu celular mientras caminas con el puerto USB integrado</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-0.5">•</span>
                    <span>Cierre oculto antirrobo que protege tus pertenencias</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-0.5">•</span>
                    <span>Material impermeable que mantiene todo seco</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-success mt-0.5">•</span>
                    <span>Diseño elegante y compacto perfecto para el día a día</span>
                  </li>
                </ul>
              </div>
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
              <span className="text-2xl mb-2 block">📏</span>
              <p className="font-bold">Tamaño</p>
              <p className="text-sm text-muted-foreground">32 x 17 x 8 cm</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">⚖️</span>
              <p className="font-bold">Peso</p>
              <p className="text-sm text-muted-foreground">Solo 350g</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🧵</span>
              <p className="font-bold">Material</p>
              <p className="text-sm text-muted-foreground">Oxford Impermeable + PU Leather</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🎒</span>
              <p className="font-bold">Compartimentos</p>
              <p className="text-sm text-muted-foreground">3 bolsillos + 1 oculto</p>
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
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Hacen envíos a todo Guatemala?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Hacemos envíos a todos los departamentos de Guatemala, incluyendo Ciudad de Guatemala, Quetzaltenango, Escuintla, Mixco, Villa Nueva, Cobán, y todas las demás ciudades. El envío es completamente gratis.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cómo funciona el pago contra entrega?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Es muy sencillo: haces tu pedido aquí, recibes tu producto en casa (3-5 días), y pagas en efectivo al momento de recibirlo. No necesitas tarjeta de crédito ni hacer pagos anticipados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cuánto tiempo tarda en llegar mi pedido?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Los envíos a Ciudad de Guatemala y áreas metropolitanas llegan en 2-3 días hábiles. Para el resto del país, el tiempo de entrega es de 3-5 días hábiles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Tienen garantía?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Por supuesto! Todos nuestros productos tienen garantía de 2 años contra defectos de fabricación. Si tienes cualquier problema, nos contactas y lo resolvemos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ¡Aprovecha esta oferta especial! 🇬🇹
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Envío gratis + Pago contra entrega en toda Guatemala
          </p>
          <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q219
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>
    </div>
  );
};

export default Guatemala;
