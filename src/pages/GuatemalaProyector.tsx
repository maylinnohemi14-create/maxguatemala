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
  Tv,
  Wifi,
  Volume2,
} from "lucide-react";
import proyectorGuatemala from "@/assets/proyector-guatemala.png";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { TrackingPixels } from "@/components/TrackingPixels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const GuatemalaProyector = () => {
  const [quantity, setQuantity] = useState(1);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "PROYECTOR-GUATEMALA";
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
          📽️ <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
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
      comment: "Increíble calidad de imagen para el precio. Lo uso para ver películas con mi familia en zona 11. ¡Se ve como cine en casa!",
      date: "Hace 3 días",
    },
    {
      name: "Lucía P.",
      rating: 5,
      comment: "Perfecto para las noches de películas. Mis hijos están felices. Llegó rápido a Villa Nueva.",
      date: "Hace 1 semana",
    },
    {
      name: "Fernando A.",
      rating: 5,
      comment: "Lo conecto al celular y veo YouTube en pantalla grande. La bocina integrada suena bastante bien. Muy recomendado.",
      date: "Hace 2 semanas",
    },
    {
      name: "Patricia G.",
      rating: 5,
      comment: "Lo compré para mi negocio y quedé encantada. Excelente para presentaciones. El pago contra entrega muy seguro.",
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
                src={proyectorGuatemala}
                alt="Mini Proyector Portátil"
                className="w-full h-auto object-contain aspect-square"
              />
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
                4.9 (+ 800 Reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
              MINI PROYECTOR PORTÁTIL HD - Convierte tu Casa en un Cine
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
                { text: "Proyecta hasta", bold: "120 pulgadas", suffix: "de imagen HD" },
                { text: "Conecta tu", bold: "celular, USB, HDMI", suffix: "y más" },
                { text: "", bold: "Bocina integrada", suffix: "de alta potencia" },
                { text: "Diseño", bold: "compacto y portátil", suffix: "- Llévalo a donde quieras" },
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
                      key={Date.now()}
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="Mini Proyector Portátil HD"
                      productImage={proyectorGuatemala}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' },
                        { id: 'cable', icon: '🔌', title: 'Cable HDMI Incluido', description: 'Conecta cualquier dispositivo' }
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
            ¿Por qué elegir este Proyector? 📽️
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Tv className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Pantalla Gigante</h3>
              <p className="text-muted-foreground text-sm">Proyecta hasta 120 pulgadas de imagen HD. Convierte cualquier pared en una pantalla de cine.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Múltiples Conexiones</h3>
              <p className="text-muted-foreground text-sm">HDMI, USB, AV, y conexión de celular. Compatible con cualquier dispositivo.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Bocina Integrada</h3>
              <p className="text-muted-foreground text-sm">Audio potente incorporado. No necesitas altavoces externos para disfrutar tus películas.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Ultra Portátil</h3>
              <p className="text-muted-foreground text-sm">Diseño compacto y liviano. Llévalo a fiestas, campamentos o a casa de tus amigos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Para qué puedes usarlo? 🎬
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 text-center">
              <span className="text-4xl mb-4 block">🎥</span>
              <h3 className="font-bold text-lg mb-2">Noches de Películas</h3>
              <p className="text-muted-foreground text-sm">Disfruta películas y series en pantalla gigante con toda la familia.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 text-center">
              <span className="text-4xl mb-4 block">🎮</span>
              <h3 className="font-bold text-lg mb-2">Gaming Épico</h3>
              <p className="text-muted-foreground text-sm">Conecta tu consola o celular y juega en una pantalla de 120 pulgadas.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 text-center">
              <span className="text-4xl mb-4 block">💼</span>
              <h3 className="font-bold text-lg mb-2">Presentaciones</h3>
              <p className="text-muted-foreground text-sm">Ideal para presentaciones de trabajo, clases o reuniones de negocios.</p>
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
              <span className="text-2xl mb-2 block">📺</span>
              <p className="font-bold">Resolución</p>
              <p className="text-sm text-muted-foreground">1080P Full HD</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">💡</span>
              <p className="font-bold">Brillo</p>
              <p className="text-sm text-muted-foreground">3000 Lúmenes</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">📐</span>
              <p className="font-bold">Tamaño de Imagen</p>
              <p className="text-sm text-muted-foreground">30 - 120 pulgadas</p>
            </div>
            <div className="p-4 rounded-xl bg-background border border-border text-center">
              <span className="text-2xl mb-2 block">🔌</span>
              <p className="font-bold">Conexiones</p>
              <p className="text-sm text-muted-foreground">HDMI, USB, AV, Audio</p>
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
                ¿Se ve bien de día o solo de noche?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                El proyector funciona mejor en ambientes oscuros o con poca luz. De día puedes usarlo cerrando cortinas. Para la mejor experiencia, recomendamos usarlo de noche o en habitaciones oscuras.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cómo lo conecto a mi celular?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Puedes conectarlo con un cable HDMI (incluido) usando un adaptador para tu celular. También es compatible con Chromecast o Fire TV Stick para proyectar de forma inalámbrica.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Necesito comprar una pantalla especial?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡No! Puedes proyectar en cualquier pared blanca o clara. Si quieres mejor calidad, puedes usar una sábana blanca o comprar una pantalla de proyección, pero no es necesario.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Hacen envíos a todo Guatemala?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Hacemos envíos a todos los departamentos de Guatemala con envío 100% gratis. El tiempo de entrega es de 3-5 días hábiles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ¡Convierte tu casa en un cine! 🎬🇬🇹
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
