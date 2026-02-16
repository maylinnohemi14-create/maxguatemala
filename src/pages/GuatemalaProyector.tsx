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
  Sparkles,
  Home,
  Zap,
} from "lucide-react";
import proyectorGuatemala from "@/assets/proyector-guatemala.png";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { TrackingPixels } from "@/components/TrackingPixels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GuatemalaProyector = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "PROYECTOR-NAVIDAD-GT";
  const PRODUCT_PRICE = 199;

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
          🎄 <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
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
      name: "Roberto M.",
      rating: 5,
      comment: "¡Mi casa se ve espectacular! Los vecinos vienen a ver las luces de Navidad. Muy fácil de instalar en zona 11.",
      date: "Hace 3 días",
    },
    {
      name: "Lucía P.",
      rating: 5,
      comment: "Mis hijos están felices con las luces navideñas. Se proyectan copos de nieve y estrellas. Llegó rápido a Villa Nueva.",
      date: "Hace 1 semana",
    },
    {
      name: "Fernando A.",
      rating: 5,
      comment: "Perfecto para decorar sin tener que subir al techo. Solo lo enchufo y listo. La mejor compra que he hecho.",
      date: "Hace 2 semanas",
    },
    {
      name: "Patricia G.",
      rating: 5,
      comment: "Lo uso para decorar mi negocio y atrae muchos clientes. Las figuras navideñas se ven hermosas en la pared.",
      date: "Hace 3 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TrackingPixels />
      

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
              <img
                src={proyectorGuatemala}
                alt="Proyector de Luces Navideñas"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            {/* Badge */}
            <div className="mb-3">
              <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-green-700">
                🇬🇹 Envío a toda Guatemala - Llega antes de Navidad
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                4.9 (+ 800 Reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
              PROYECTOR DE LUCES NAVIDEÑAS - Decora tu Casa Sin Esfuerzo 🎄✨
            </h1>

            {/* Price Section */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-success/10 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-destructive decoration-2">Q399</span>
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
                    <span>AHORRAS Q200</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-destructive/10 text-destructive font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full border border-destructive/30">
                    <span className="text-base">🔥</span>
                    <span>-50% OFF</span>
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
                { text: "Proyecta", bold: "copos de nieve, estrellas y figuras navideñas", suffix: "en paredes y fachadas" },
                { text: "", bold: "Fácil instalación", suffix: "- Solo enchúfalo y apunta" },
                { text: "Uso en", bold: "interiores y exteriores", suffix: "resistente al agua" },
                { text: "Cubre hasta", bold: "50 metros cuadrados", suffix: "de área" },
                { text: "", bold: "Sin subir al techo", suffix: "- Decora de forma segura" },
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
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="Proyector de Luces Navideñas"
                      productImage={proyectorGuatemala}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía 1 Año', description: 'Protección contra defectos' },
                        { id: 'base', icon: '📍', title: 'Base con Estaca Incluida', description: 'Para jardín o terraza' }
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
      <div className="bg-green-600 text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              🎄 ¡LLEGA ANTES DE NAVIDAD! - ÚLTIMAS UNIDADES 🎄
            </span>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Por qué elegir este Proyector Navideño? 🎄
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Múltiples Diseños</h3>
              <p className="text-muted-foreground text-sm">Copos de nieve, estrellas, Santa Claus y más figuras navideñas que se proyectan en movimiento.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interior y Exterior</h3>
              <p className="text-muted-foreground text-sm">Resistente al agua IP65. Úsalo en tu sala, fachada, jardín o terraza sin problemas.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Instalación en Segundos</h3>
              <p className="text-muted-foreground text-sm">Solo enchúfalo y apunta. Incluye base con estaca para jardín y soporte para piso.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Seguro para Todos</h3>
              <p className="text-muted-foreground text-sm">No necesitas subir escaleras ni colgar luces. Decora de forma segura y sin riesgos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Dónde puedes usarlo? 🏠
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 text-center">
              <span className="text-4xl mb-4 block">🏠</span>
              <h3 className="font-bold text-lg mb-2">Fachada de tu Casa</h3>
              <p className="text-muted-foreground text-sm">Proyecta hermosas figuras navideñas en la pared exterior y destaca en tu vecindario.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 text-center">
              <span className="text-4xl mb-4 block">🌲</span>
              <h3 className="font-bold text-lg mb-2">Jardín y Terraza</h3>
              <p className="text-muted-foreground text-sm">Crea un ambiente mágico en tu jardín con copos de nieve y estrellas en movimiento.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 text-center">
              <span className="text-4xl mb-4 block">🛋️</span>
              <h3 className="font-bold text-lg mb-2">Interior del Hogar</h3>
              <p className="text-muted-foreground text-sm">Decora tu sala o habitación con luces navideñas que no ocupan espacio.</p>
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
              <p className="font-bold">Cobertura</p>
              <p className="text-sm text-muted-foreground">Hasta 50m² de área</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">💧</span>
              <p className="font-bold">Resistencia</p>
              <p className="text-sm text-muted-foreground">IP65 Impermeable</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🎨</span>
              <p className="font-bold">Diseños</p>
              <p className="text-sm text-muted-foreground">Múltiples patrones navideños</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">⚡</span>
              <p className="font-bold">Potencia</p>
              <p className="text-sm text-muted-foreground">4W LED de bajo consumo</p>
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
                ¿Se puede usar bajo la lluvia?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! El proyector tiene certificación IP65, lo que significa que es resistente al agua y al polvo. Puedes dejarlo en tu jardín sin preocupaciones.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Qué figuras proyecta?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Proyecta copos de nieve, estrellas, y figuras navideñas en movimiento. Los diseños rotan automáticamente creando un efecto mágico en tu pared o fachada.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cómo se instala?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Es muy fácil: solo enchúfalo y apúntalo hacia donde quieras proyectar. Incluye una base con estaca para jardín y también puedes colocarlo en el piso o una mesa.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Llegará antes de Navidad?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Hacemos envíos a todos los departamentos de Guatemala en 3-5 días hábiles. Si ordenas hoy, llegará a tiempo para que decores tu casa.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-red-600 to-green-600 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ¡Decora tu casa esta Navidad! 🎄🇬🇹
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Envío gratis + Pago contra entrega + Llega antes de Navidad
          </p>
          <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q199
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>
    </div>
  );
};

export default GuatemalaProyector;
