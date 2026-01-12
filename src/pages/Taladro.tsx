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
  Zap,
  Package,
  Gift,
  Clock,
  Users,
  Battery,
  Wrench,
  Lightbulb,
  Settings,
  ShoppingCart,
} from "lucide-react";
import taladroMain from "@/assets/taladro-main.png";
import taladroPower from "@/assets/taladro-power.png";
import taladroKit from "@/assets/taladro-kit.webp";
import taladroCase from "@/assets/taladro-case.webp";
import taladroLifestyle from "@/assets/taladro-lifestyle.jpg";
import taladroAction from "@/assets/taladro-action.webp";
import taladroDemo from "@/assets/taladro-demo.webp";
import { CODForm } from "@/components/CODForm";
import { TrackingPixels } from "@/components/TrackingPixels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Taladro = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "TALADRO-INALAMBRICO-48V";
  const PRODUCT_PRICE = 169900;

  const images = [taladroMain, taladroPower, taladroKit, taladroCase];

  const colombianNames = [
    "Juan Rodríguez de Bogotá",
    "María García de Medellín",
    "Carlos Martínez de Cali",
    "Sofía López de Barranquilla",
    "Andrés González de Cartagena",
    "Camila Hernández de Bucaramanga",
    "Diego Pérez de Pereira",
    "Valentina Ramírez de Cúcuta",
    "Santiago Torres de Manizales",
    "Isabella Castro de Ibagué",
    "Sebastián Morales de Santa Marta",
    "Lucía Gutiérrez de Villavicencio",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = colombianNames[Math.floor(Math.random() * colombianNames.length)];
      
      toast.success(
        <div>
          🔧 <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
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
      name: "Pedro G.",
      rating: 5,
      comment: "Muy útil y práctico, fue perfecto para hacerle una casita de muñecas sorpresa a mi hija. ¡Excelente producto y servicio!",
      date: "Hace 3 días",
    },
    {
      name: "Arturo G.",
      rating: 5,
      comment: "Todo está ok. La batería está cargada. Todas las funciones muy bien. ¡Recomendado!",
      date: "Hace 1 semana",
    },
    {
      name: "Luis R.",
      rating: 5,
      comment: "Excelente producto, soy instalador de muebles y me facilita muchísimo el trabajo. Ahora puedo hacer más instalaciones en menos tiempo.",
      date: "Hace 2 semanas",
    },
    {
      name: "Rodrigo A.",
      rating: 5,
      comment: "Excelente para trabajar en la obra, buenos tiempos de entrega y magnífico producto. 100% confiables, los recomiendo.",
      date: "Hace 3 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TrackingPixels />
      
      {/* Admin Link - Fixed top right */}
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
          {/* Product Gallery */}
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-3 sm:mb-4 bg-white">
              <img
                src={images[selectedImage]}
                alt="Taladro Inalámbrico 48V"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
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
            {/* TikTok Badge */}
            <div className="mb-3">
              <Badge className="bg-destructive text-destructive-foreground font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-destructive">
                El favorito de TikTok 🏆 #1 en ventas.
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                4.8 (+ 1,686 Reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground leading-tight">
              TALADRO INALÁMBRICO con PERCUTOR + 24 ACCESORIOS + 2 BATERÍAS 48V
            </h1>

            <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
              <div className="flex items-baseline gap-2 sm:gap-3 mb-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-destructive animate-pulse-slow">$169.900</span>
                <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground line-through">$299.900</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-success text-success-foreground font-bold text-xs px-2 py-1">
                  💚 AHORRO 43%
                </Badge>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="mb-4 sm:mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex flex-col items-center text-center">
                  <ShoppingCart className="w-5 h-5 mb-1 text-primary" />
                  <span className="font-bold">12 Jan</span>
                  <span className="text-muted-foreground">Confirmada</span>
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-5 h-5 mb-1 text-primary" />
                  <span className="font-bold">13-14 Jan</span>
                  <span className="text-muted-foreground">Despachada</span>
                </div>
                <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                <div className="flex flex-col items-center text-center">
                  <Gift className="w-5 h-5 mb-1 text-primary" />
                  <span className="font-bold">16-17 Jan</span>
                  <span className="text-muted-foreground">Entregada</span>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                { text: "Te permite perforar", bold: "concreto, ladrillo, metal y madera", suffix: "sin esfuerzo." },
                { text: "Protección contra", bold: "sobrecarga, sobrecalentamiento y descarga.", suffix: "" },
                { text: "Brinda un", bold: "control total", suffix: "para atornillar o perforar sin dañar materiales" },
                { text: "", bold: "Diseño compacto, liviano y ergonómico.", suffix: "" },
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

            {/* CTA Buttons */}
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
                    <CODForm 
                      key={Date.now()}
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE * quantity}
                      productName="Taladro Inalámbrico 48V + 24 Accesorios + 2 Baterías"
                      productImage={taladroMain}
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
              🚨 ÚLTIMAS 5 UNIDADES 🚨
            </span>
          ))}
        </div>
      </div>

      {/* Problem Section */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large">
              <img
                src={taladroLifestyle}
                alt="Trabajo con taladro"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                No pierdas tiempo, energía ni paciencia con herramientas que no están a la altura.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                El <strong>Taladro inalámbrico</strong> es la <strong>bestia portátil</strong> que está 
                revolucionando el trabajo en casa, talleres y construcciones. Potencia extrema, diseño 
                profesional y todo lo que un verdadero trabajador necesita.
              </p>
              <p className="text-xl font-bold text-primary">
                Y lo mejor: sin cables, sin pausas, sin excusas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action GIF Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">
                No hay obra imposible ni tornillo rebelde.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6">
                No es solo un taladro: es una máquina profesional que destruye concreto, metal y cualquier 
                excusa. Viene con <strong>dos baterías</strong> para que NUNCA pares, con percutor, luces LED, 
                maletín y hasta brocas gratis.
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large order-1 md:order-2">
              <img
                src={taladroAction}
                alt="Taladro en acción"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Banner */}
      <div className="bg-success text-success-foreground py-3 overflow-hidden">
        <div className="animate-marquee-reverse whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              | PAGA EN CASA AL RECIBIR | ENVÍO GRATIS
            </span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-secondary/30 py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">No es cualquier inalámbrico</h3>
              <p className="text-muted-foreground">
                Es un monstruo que atraviesa cemento, hierro o madera como si fuera mantequilla.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Battery className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Cero pausas</h3>
              <p className="text-muted-foreground">
                INCLUYE DOS BATERÍAS DE LITIO con INDICADOR de carga
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">MODO PERCUTOR INTEGRADO</h3>
              <p className="text-muted-foreground">
                No necesitas herramientas adicionales para perforar superficies duras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Everyone Talking Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
            ¿Y por qué todos están hablando de este taladro?
          </h2>
          <div className="max-w-3xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-8">
            <img
              src={taladroDemo}
              alt="Demostración del taladro"
              className="w-full h-auto object-cover"
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
            ¿Cuánto tiempo más vas a perder con taladros mediocres?
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            No más frustraciones, no más herramientas que te fallan.
          </p>
          <p className="text-xl font-bold text-primary mb-8">
            🔥 ¡Transforma tu trabajo con la potencia que mereces! 🔥
          </p>
          <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all animate-button-bounce"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                ¡HAZ CLIC AHORA Y TRABAJA COMO UN PROFESIONAL!
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Guarantee Banner */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-8 text-lg font-bold">
              | PRODUCTO GARANTIZADO | COMPRA SEGURA
            </span>
          ))}
        </div>
      </div>

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
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-bold text-foreground">5.0</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              4 reviews verificadas
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
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Este taladro sirve para concreto o solo para madera?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Sí, gracias a su función <strong>percutora</strong> y sus <strong>48V de potencia real</strong>, 
                este taladro puede perforar concreto, ladrillo, metal, madera y más. Es ideal tanto para 
                trabajos domésticos como profesionales.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Cuánto dura la batería y cuánto tarda en cargarse?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Cada batería tiene una duración estimada de <strong>2 a 3 horas de uso continuo</strong>, 
                dependiendo del material y la intensidad. El <strong>cargador rápido incluido</strong> permite 
                una carga completa en aproximadamente <strong>60 minutos</strong>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Puedo usarlo para atornillar y desatornillar?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Claro. Cuenta con <strong>función reversible y 20 niveles de torque</strong>, ideales para 
                controlar la fuerza al atornillar o desatornillar, sin dañar tornillos ni superficies.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Hacen devoluciones?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                Claro que sí, si hay algo que sale mal respondemos con tu dinero. Tu satisfacción es nuestra prioridad.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-4 sm:px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary text-sm sm:text-base">
                ¿Cuál es el tiempo de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                El tiempo de entrega es de <strong>3 a 5 días hábiles</strong> en las principales ciudades 
                de Colombia. Para zonas rurales puede tomar hasta 7 días hábiles.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary-foreground">
            ¡No esperes más! Obtén tu Taladro Profesional Ahora
          </h2>
          <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all animate-button-bounce"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                COMPRAR AHORA - ENVÍO GRATIS
              </Button>
            </DialogTrigger>
          </Dialog>
          <p className="mt-4 text-primary-foreground/80">
            💚 Pago contra entrega • 🚚 Envío gratis a toda Colombia
          </p>
        </div>
      </section>

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

export default Taladro;