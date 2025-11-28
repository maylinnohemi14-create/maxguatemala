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
import { CODForm } from "@/components/CODForm";
import { TrackingPixels } from "@/components/TrackingPixels";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);
  
  const PRODUCT_ID = "PROYECTOR-VEVSHAO-A10";
  const PRODUCT_PRICE = 129000;

  const images = [projectorPromo, projectorMain, projectorLifestyle1, projectorLifestyle2, projectorDetail];

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
          🎉 <span className="text-destructive font-bold">{randomName}</span> acabó de comprar
        </div>,
        {
          description: "¡Quedan pocas unidades disponibles!",
          duration: 4000,
        }
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

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
    {
      name: "María Rodríguez",
      rating: 5,
      comment: "¡Increíble! Transformó mi sala en un cine. La calidad de imagen es excepcional y la instalación fue súper fácil.",
      date: "Hace 2 días",
    },
    {
      name: "Carlos Gómez",
      rating: 5,
      comment: "¡Mejor compra que hice este año! El sonido es excelente y la conectividad con mi celular es perfecta. ¡Lo recomiendo mucho!",
      date: "Hace 1 semana",
    },
    {
      name: "Ana López",
      rating: 5,
      comment: "¡Producto de calidad profesional! Lo uso para reuniones de trabajo y también para ver películas. Vale cada peso.",
      date: "Hace 2 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
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
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Envío Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pago Contra Entrega</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Garantía de 2 Años</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery */}
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-large mb-4 bg-white">
              <img
                src={images[selectedImage]}
                alt="Projetor VEVSHAO A10"
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
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
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                (200+ reseñas)
              </span>
              <Badge className="ml-2 bg-foreground text-background font-bold text-xs px-3 py-1 animate-pulse-fast">
                +897 unidades vendidas!
              </Badge>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-foreground leading-tight">
              PROYECTOR VEVSHAO A10 + REGALO
              <Badge className="ml-3 bg-primary text-primary-foreground text-sm px-3 py-1 animate-pulse-glow">
                COMPRE 1 Y LLEVA OTRO GRATIS
              </Badge>
            </h1>

            <p className="text-lg text-muted-foreground mb-6 font-bold">
              Transforma cualquier espacio en un cine con conectividad completa y sonido envolvente.
            </p>

            <div className="mb-6 p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-foreground animate-pulse-slow">$129.000</span>
                <span className="text-2xl text-muted-foreground line-through">$399.000</span>
              </div>
              <div className="flex items-center gap-2 text-success animate-lightning">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">¡Ahorra 68% hoy!</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 mb-6">
              {[
                "Disfruta imágenes nítidas en cualquier habitación",
                "Experimenta sonido envolvente sin altavoces extra",
                "Conecta dispositivos fácilmente con múltiples opciones",
                "Proyecta con claridad incluso con luz ambiental",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check className="w-4 h-4 text-success-foreground" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-foreground">Cantidad:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 py-3 bg-secondary hover:bg-muted transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="px-8 py-3 font-bold text-lg border-x-2 border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-6 py-3 bg-secondary hover:bg-muted transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <Dialog open={showCODForm} onOpenChange={setShowCODForm}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-full text-lg font-bold py-7 bg-gradient-hero hover:shadow-glow transition-all animate-button-bounce"
                  >
                    <Gift className="w-6 h-6 mr-2" />
                    COMPRAR AHORA - ¡OFERTA LIMITADA!
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Formulario de Pedido - Pago Contra Entrega</DialogTitle>
                  </DialogHeader>
                  {showCODForm && (
                    <CODForm 
                      key={Date.now()}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TrustBadge
                icon={Truck}
                title="Envío Gratis"
                description="En toda Colombia"
              />
              <TrustBadge
                icon={Shield}
                title="Compra Segura"
                description="Garantía de 2 años"
              />
              <TrustBadge
                icon={Clock}
                title="Entrega Rápida"
                description="3 a 5 dias uteis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Características Profesionales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnología de punta para proporcionar la mejor experiencia visual
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Experiencia Cinematográfica en Casa
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Crea momentos inolvidables con tu familia viendo películas, series y jugando
                en una pantalla gigante de hasta 200 pulgadas. La calidad de imagen 4K garantiza
                nitidez excepcional incluso en ambientes con luz ambiental.
              </p>
              <div className="space-y-4">
                {[
                  "Resolución 1920x1080 Full HD",
                  "Proyección de 40 a 200 pulgadas",
                  "Contraste 5000:1 para colores vibrantes",
                  "Lámpara LED con 50.000 horas de vida",
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-large animate-scale-in">
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
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                Lo Que Dicen Nuestros Clientes
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Más de 200 reseñas positivas de clientes satisfechos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                ¿Cómo funciona la promoción 2x1?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Al comprar un proyector VEVSHAO A10, automáticamente recibes otro proyector
                idéntico completamente gratis. ¡Es nuestra forma de agradecer la confianza en
                nuestros productos!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                ¿Cuál es el tiempo de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                El tiempo de entrega es de 5 a 7 días hábiles para toda Colombia. Recibirás un
                código de rastreo tan pronto como el producto sea despachado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                ¿El proyector es compatible con mi celular?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ¡Sí! El proyector es compatible con cualquier smartphone a través de conexión WiFi,
                cable HDMI o adaptadores. Funciona con iOS, Android y todos los sistemas
                operativos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                ¿Tiene garantía?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ¡Sí! Ofrecemos garantía de 30 días de satisfacción garantizada o devolución de tu dinero,
                además de 2 años de garantía del fabricante contra defectos de fabricación.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                ¿Cómo es el pago contra entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Puedes elegir pagar contra entrega en efectivo o tarjeta directamente al
                mensajero. También aceptamos pago anticipado con tarjeta de crédito, débito,
                PSE y transferencia bancaria.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            ¡Oferta Limitada: Compra 1 y Lleva 2!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            No pierdas esta oportunidad única de tener dos proyectores profesionales por el precio de
            uno. ¡Stock limitado!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-6 h-6" />
              <span>Promoción válida por tiempo limitado</span>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => setShowCODForm(true)}
            className="bg-foreground text-background hover:bg-foreground/90 text-xl font-bold py-8 px-12 shadow-large"
          >
            ASEGURAR MI PROMOCIÓN AHORA
          </Button>
          <p className="mt-6 text-sm opacity-75">
            ✓ Envío Gratis ✓ Pago Contra Entrega ✓ Garantía de 2 Años
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2024 VEVSHAO. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
