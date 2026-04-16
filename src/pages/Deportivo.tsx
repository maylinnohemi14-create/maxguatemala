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
  Shirt,
} from "lucide-react";
import deportivoVerdeBuzo from "@/assets/deportivo-verde-buzo.webp";
import deportivoVerdePantalon from "@/assets/deportivo-verde-pantalon.webp";
import deportivoNegroBuzo from "@/assets/deportivo-negro-buzo.webp";
import deportivoNegroPantalon from "@/assets/deportivo-negro-pantalon.webp";
import deportivoAzulBuzo from "@/assets/deportivo-azul-buzo.webp";
import deportivoAzulPantalon from "@/assets/deportivo-azul-pantalon.webp";
import maxHeader from "@/assets/max-header.png";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { LegalFooter } from "@/components/LegalFooter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trackTikTokConversion, trackFacebookConversion, usePagePixels } from "@/hooks/useTrackingPixels";
import { Ruler } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const SETS = [
  { name: "Conjunto Verde", image: deportivoVerdeBuzo, description: "Buzo Zípper + Pantalón" },
  { name: "Conjunto Negro", image: deportivoNegroBuzo, description: "Buzo Zípper + Pantalón" },
  { name: "Conjunto Azul Marino", image: deportivoAzulBuzo, description: "Buzo Zípper + Pantalón" },
];

const Deportivo = () => {
  const [selectedTopSizes, setSelectedTopSizes] = useState<Record<number, string>>({
    0: "M",
    1: "M",
    2: "M",
  });
  const [selectedBottomSizes, setSelectedBottomSizes] = useState<Record<number, string>>({
    0: "M",
    1: "M",
    2: "M",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);

  const PRODUCT_ID = "DEP-KIT3EN1-GT";
  const PRODUCT_PRICE = 279;
  const PAGE_ROUTE = "/deportivo";

  const { tiktokPixelIds, facebookPixelIds } = usePagePixels(PAGE_ROUTE);

  const productImages = [
    deportivoVerdeBuzo, deportivoVerdePantalon,
    deportivoNegroBuzo, deportivoNegroPantalon,
    deportivoAzulBuzo, deportivoAzulPantalon,
  ];

  // Auto-rotate images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage(prev => (prev + 1) % productImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [productImages.length]);

  useEffect(() => {
    tiktokPixelIds.forEach(pid => {
      trackTikTokConversion('ViewContent', {
        contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Conjuntos Premium Kit 3 en 1', quantity: 1, price: PRODUCT_PRICE }],
        value: PRODUCT_PRICE,
        currency: 'GTQ',
        content_category: 'Conjuntos Deportivos',
      }, pid);
    });
    facebookPixelIds.forEach(pid => {
      trackFacebookConversion('ViewContent', {
        content_ids: [PRODUCT_ID],
        content_type: 'product',
        content_name: 'Conjuntos Premium Kit 3 en 1',
        value: PRODUCT_PRICE,
        currency: 'GTQ'
      }, pid);
    });
  }, [tiktokPixelIds, facebookPixelIds]);

  const handleDialogChange = (open: boolean) => {
    if (open) {
      tiktokPixelIds.forEach(pid => {
        trackTikTokConversion('AddToCart', {
          contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Conjuntos Premium Kit 3 en 1', quantity: 1, price: PRODUCT_PRICE }],
          value: PRODUCT_PRICE,
          currency: 'GTQ',
          content_category: 'Conjuntos Deportivos',
        }, pid);
      });
      facebookPixelIds.forEach(pid => {
        trackFacebookConversion('AddToCart', { content_ids: [PRODUCT_ID], content_type: 'product', value: PRODUCT_PRICE, currency: 'GTQ' }, pid);
      });
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
          🧥 <span className="text-destructive font-bold">{randomName}</span> acaba de comprar
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
      name: "Andrés M.",
      rating: 5,
      comment: "La calidad del material es impresionante. Los 3 conjuntos se sienten premium, la tela es suave pero resistente. Muy recomendado.",
      date: "Hace 2 días",
    },
    {
      name: "Gabriela R.",
      rating: 5,
      comment: "Se lo compré a mi esposo y quedó encantado. El diseño es elegante y se puede usar tanto para hacer ejercicio como para salir.",
      date: "Hace 1 semana",
    },
    {
      name: "Fernando L.",
      rating: 5,
      comment: "Llegó rápido a zona 7. Los 3 conjuntos son idénticos a la foto. Material premium, costuras reforzadas. Gran compra.",
      date: "Hace 2 semanas",
    },
    {
      name: "Karla P.",
      rating: 5,
      comment: "Los colores son hermosos y la tela es muy cómoda. Perfecto para el gimnasio y para el día a día. La talla fue exacta.",
      date: "Hace 3 semanas",
    },
  ];

  const sizesNote = Object.entries(selectedTopSizes)
    .map(([idx, topSize]) => `${SETS[Number(idx)].name}: Buzo ${topSize} / Pantalón ${selectedBottomSizes[Number(idx)]}`)
    .join(" | ");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Futuristic Header */}
      <div className="w-full bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
          {/* Subtle grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg sm:text-2xl font-bold tracking-[0.2em] uppercase">Sport Elite</h1>
              <p className="text-white/50 text-[10px] sm:text-xs tracking-[0.3em] uppercase">Premium Collection</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-white/60 text-xs tracking-widest uppercase">
            <span>Guatemala</span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Envío Gratis</span>
            <span className="w-1 h-1 bg-white/40 rounded-full" />
            <span>Pago Contra Entrega</span>
          </div>
        </div>
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
                alt="Conjuntos Premium Kit 3 en 1"
                className="w-full h-auto object-contain aspect-square"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="grid grid-cols-6 gap-1.5 mt-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${selectedImage === idx ? 'border-primary ring-2 ring-primary/30' : 'border-border opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-auto object-cover aspect-square" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            <div className="mb-3">
              <Badge className="bg-green-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-green-700">
                🇬🇹 Envío Gratis a toda Guatemala
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 5 ? 'fill-accent text-accent' : 'fill-accent/50 text-accent'}`} />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                (180+ reseñas)
              </span>
              <Badge variant="secondary" className="text-xs font-semibold">
                +1,200 unidades vendidas!
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground leading-tight">
              CONJUNTOS PREMIUM KIT 3 EN 1 🧥🔥
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1.5 animate-pulse-glow">
                ⚡ PROMOCIÓN VÁLIDA HASTA HOY {new Date().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala', day: 'numeric', month: 'long' }).toUpperCase()} - ¡NO TE LO PIERDAS!
              </Badge>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Eleva tu estilo con este increíble kit de 3 conjuntos premium. Diseño elegante, material de alta calidad y comodidad en cada movimiento. Perfectos para el gimnasio y tu día a día.
            </p>

            {/* Price Section */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-destructive decoration-2">Q559</span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-destructive animate-pulse-scale drop-shadow-sm">
                    Q279
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
              const dispatchDate = formatDate(addDays(today, 1));
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
                      <span className="font-bold">{dispatchDate}</span>
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
                { text: "Kit completo con", bold: "3 conjuntos premium de alta calidad", suffix: "" },
                { text: "Material", bold: "ligero, transpirable y resistente", suffix: "" },
                { text: "Diseño", bold: "elegante y moderno con acabados premium", suffix: "" },
                { text: "Ideal para", bold: "gimnasio, running y uso diario", suffix: "" },
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

            {/* Size Selectors */}
            <div className="mb-4 sm:mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-foreground text-sm sm:text-base">Selecciona la talla de cada conjunto:</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      <Ruler className="w-3.5 h-3.5" />
                      Guía de tallas
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6 rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">📏 Guía de Tallas</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-3">Medidas en centímetros (cm). Mide tu cuerpo y compara con la tabla.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-secondary">
                              <th className="border border-border px-2 py-1.5 text-left font-bold">Talla</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Pecho</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Cintura</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Cadera</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { talla: "XS", pecho: "82-86", cintura: "66-70", cadera: "82-86" },
                              { talla: "S", pecho: "86-92", cintura: "70-76", cadera: "86-92" },
                              { talla: "M", pecho: "92-98", cintura: "76-82", cadera: "92-98" },
                              { talla: "L", pecho: "98-104", cintura: "82-88", cadera: "98-104" },
                              { talla: "XL", pecho: "104-112", cintura: "88-96", cadera: "104-112" },
                              { talla: "XXL", pecho: "112-120", cintura: "96-104", cadera: "112-120" },
                              { talla: "XXXL", pecho: "120-128", cintura: "104-112", cadera: "120-128" },
                            ].map((row) => (
                              <tr key={row.talla} className="hover:bg-secondary/50">
                                <td className="border border-border px-2 py-1.5 font-bold">{row.talla}</td>
                                <td className="border border-border px-2 py-1.5 text-center">{row.pecho}</td>
                                <td className="border border-border px-2 py-1.5 text-center">{row.cintura}</td>
                                <td className="border border-border px-2 py-1.5 text-center">{row.cadera}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-3">💡 Si estás entre dos tallas, recomendamos elegir la talla más grande para mayor comodidad.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {SETS.map((set, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-border bg-secondary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={set.image} alt={set.name} className="w-10 h-10 rounded-lg object-cover border border-border" />
                    <div>
                      <span className="font-bold text-sm text-foreground">{set.name}</span>
                      <p className="text-xs text-muted-foreground">{set.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-1 block">Buzo: <span className="text-foreground">{selectedTopSizes[idx]}</span></span>
                      <div className="flex gap-1.5 flex-wrap">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedTopSizes(prev => ({ ...prev, [idx]: size }))}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                              selectedTopSizes[idx] === size
                                ? "bg-foreground text-background border-foreground"
                                : "bg-background text-foreground border-border hover:border-foreground/50"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground mb-1 block">Pantalón: <span className="text-foreground">{selectedBottomSizes[idx]}</span></span>
                      <div className="flex gap-1.5 flex-wrap">
                        {SIZES.map((size) => (
                          <button
                            key={`bottom-${size}`}
                            onClick={() => setSelectedBottomSizes(prev => ({ ...prev, [idx]: size }))}
                            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                              selectedBottomSizes[idx] === size
                                ? "bg-foreground text-background border-foreground"
                                : "bg-background text-foreground border-border hover:border-foreground/50"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                      productPrice={PRODUCT_PRICE}
                      productName={`Conjuntos Premium Kit 3 en 1 (${sizesNote})`}
                      productDisplayName="Conjuntos Premium Kit 3 en 1"
                      productImage={deportivoVerdeBuzo}
                      tiktokPixelId={tiktokPixelIds[0]}
                      facebookPixelId={facebookPixelIds[0]}
                      sizeDetails={SETS.map((set, idx) => ({
                        name: set.name,
                        image: set.image,
                        topSize: selectedTopSizes[idx],
                        bottomSize: selectedBottomSizes[idx],
                        topLabel: 'Buzo',
                        bottomLabel: 'Pantalón',
                      }))}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía 1 Año', description: 'Protección contra defectos' },
                        { id: 'kit', icon: '🧥', title: '3 Conjuntos Completos', description: 'Verde + Negro + Azul Marino' },
                        { id: 'envio', icon: '🚚', title: 'Envío Gratis', description: 'A toda Guatemala' },
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
              <TrustBadge icon={Truck} title="Envío Gratis" description="En toda Guatemala" />
              <TrustBadge icon={Shield} title="Compra Segura" description="Producto garantizado" />
              <TrustBadge icon={Clock} title="Entrega Rápida" description="3 a 5 días hábiles" />
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-green-600 text-white py-3 overflow-hidden w-full max-w-[100vw]">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-sm sm:text-lg font-bold">
              🧥 ¡OFERTA POR TIEMPO LIMITADO! - ÚLTIMAS UNIDADES 🔥
            </span>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Por qué elegir estos conjuntos? 💪
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Material Premium</h3>
              <p className="text-muted-foreground text-sm">Tela ligera y resistente al agua con acabados de alta costura. Perfecta para cualquier ocasión.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Diseño Elegante</h3>
              <p className="text-muted-foreground text-sm">Estilo sofisticado con buzo con capucha y zípper completo. Perfecto para vestir casual o deportivo.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Flame className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3 Colores Incluidos</h3>
              <p className="text-muted-foreground text-sm">Verde, Negro y Azul Marino. Colores versátiles que combinan con todo tu guardarropa.</p>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Costuras Reforzadas</h3>
              <p className="text-muted-foreground text-sm">Durabilidad garantizada. Costuras reforzadas que resisten lavados y uso intenso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Qué incluye tu kit? 📦
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 text-center">
              <span className="text-4xl mb-4 block">🧥</span>
              <h3 className="font-bold text-lg mb-2">3 Buzos con Zípper y Capucha</h3>
              <p className="text-muted-foreground text-sm">Buzos premium con cierre completo, capucha ajustable y bolsillos laterales con zípper. Material ligero e impermeable.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/10 to-gray-900/5 border border-gray-800/20 text-center">
              <span className="text-4xl mb-4 block">👖</span>
              <h3 className="font-bold text-lg mb-2">3 Pantalones</h3>
              <p className="text-muted-foreground text-sm">Pantalones deportivos con ajuste cómodo, elástico en cintura, bolsillos con zípper y puños ajustados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-16 bg-secondary/30">
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
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Los 3 conjuntos vienen incluidos por Q279?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Por Q279 recibes los 3 conjuntos completos (Verde, Negro y Azul Marino). Cada conjunto incluye buzo con zípper y capucha + pantalón.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Puedo elegir tallas diferentes para cada conjunto?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                ¡Sí! Puedes seleccionar una talla diferente para cada uno de los 3 conjuntos según tu preferencia.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿De qué material están hechos?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Están fabricados con material premium ligero, resistente al agua y con acabados de alta costura. Ideales para el gimnasio, salir a caminar o uso casual.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-sm sm:text-base">
                ¿Cuánto tarda en llegar?
              </AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">
                Hacemos envíos a todos los departamentos de Guatemala en 3-5 días hábiles con envío completamente gratis. Pagas al recibir tu producto.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            ¡Lleva los 3 conjuntos por solo Q279! 🧥🇬🇹
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            Envío gratis + Pago contra entrega + 3 conjuntos completos
          </p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-[#E31837] hover:bg-[#C41430] text-white hover:shadow-glow transition-all"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q279
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-secondary/50 py-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Producto original importado. MAX Guatemala es distribuidor autorizado de productos deportivos de alta calidad.
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default Deportivo;
