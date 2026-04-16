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
          🧥 <span className="font-bold" style={{ color: '#00ff88' }}>{randomName}</span> acaba de comprar
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
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Futuristic Header */}
      <div className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)' }}>
        {/* Animated top line */}
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #00ff88, transparent)' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container mx-auto px-4 py-5 sm:py-6 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center" style={{ border: '2px solid #00ff88', boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#00ff88' }} />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-black tracking-[0.25em] uppercase" style={{ color: '#fff' }}>
                SPORT <span style={{ color: '#00ff88' }}>ELITE</span>
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Premium Collection</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span>Guatemala</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
            <span>Envío Gratis</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
            <span>Pago Contra Entrega</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      </div>

      {/* Trust Bar */}
      <div className="py-3" style={{ background: 'linear-gradient(90deg, #00ff88, #00cc6a)', color: '#000' }}>
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold">
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
            <div className="rounded-2xl overflow-hidden mb-3 sm:mb-4 relative" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 40px rgba(0,255,136,0.05)' }}>
              <img
                src={productImages[selectedImage]}
                alt="Conjuntos Premium Kit 3 en 1"
                className="w-full h-auto object-contain aspect-square"
                loading="eager"
                fetchPriority="high"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: '#00ff88' }} />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: '#00ff88' }} />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: '#00ff88' }} />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: '#00ff88' }} />
            </div>
            <div className="grid grid-cols-6 gap-1.5 mt-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className="rounded-lg overflow-hidden transition-all"
                  style={{
                    border: selectedImage === idx ? '2px solid #00ff88' : '2px solid rgba(255,255,255,0.1)',
                    opacity: selectedImage === idx ? 1 : 0.6,
                    boxShadow: selectedImage === idx ? '0 0 12px rgba(0,255,136,0.3)' : 'none',
                  }}
                >
                  <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-auto object-cover aspect-square" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }}>
                🇬🇹 Envío Gratis a toda Guatemala
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                (180+ reseñas)
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}>
                +1,200 unidades vendidas!
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 leading-tight" style={{ color: '#fff' }}>
              CONJUNTOS PREMIUM KIT 3 EN 1 <span style={{ color: '#00ff88' }}>🧥🔥</span>
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center font-bold text-xs px-3 py-1.5 rounded-full animate-pulse-glow" style={{ background: '#00ff88', color: '#000' }}>
                ⚡ PROMOCIÓN VÁLIDA DEL 16 AL 27 DE ABRIL - ¡NO TE LO PIERDAS!
              </span>
            </div>

            <p className="text-sm sm:text-base mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Eleva tu estilo con este increíble kit de 3 conjuntos premium. Diseño elegante, material de alta calidad y comodidad en cada movimiento. Perfectos para el gimnasio y tu día a día.
            </p>

            {/* Price Section */}
            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.2)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" style={{ background: 'rgba(0,255,136,0.1)' }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.5)' }}>Precio normal:</span>
                  <span className="text-base sm:text-lg line-through decoration-2" style={{ color: 'rgba(255,255,255,0.4)', textDecorationColor: '#ff4444' }}>Q559</span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black animate-pulse-scale drop-shadow-sm" style={{ color: '#00ff88' }}>
                    Q279
                  </span>
                  <span className="text-lg sm:text-xl font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>GTQ</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full" style={{ background: '#00ff88', color: '#000' }}>
                    🔥 ¡APROVECHA LA PROMOCIÓN!
                  </span>
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
                <div className="mb-4 sm:mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col items-center text-center">
                      <ShoppingCart className="w-5 h-5 mb-1" style={{ color: '#00ff88' }} />
                      <span className="font-bold" style={{ color: '#fff' }}>{confirmedDate}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Confirmada</span>
                    </div>
                    <div className="flex-1 h-[1px] mx-2" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.4), rgba(0,255,136,0.1))' }} />
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 mb-1" style={{ color: '#00ff88' }} />
                      <span className="font-bold" style={{ color: '#fff' }}>{dispatchDate}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Despachada</span>
                    </div>
                    <div className="flex-1 h-[1px] mx-2" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.1), rgba(0,255,136,0.4))' }} />
                    <div className="flex flex-col items-center text-center">
                      <Gift className="w-5 h-5 mb-1" style={{ color: '#00ff88' }} />
                      <span className="font-bold" style={{ color: '#fff' }}>{deliveryStart}-{addDays(today, 5).getDate()}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>Entregada</span>
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
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mt-0.5" style={{ background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)' }}>
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#00ff88' }} />
                  </div>
                  <span className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    {benefit.text} <strong style={{ color: '#fff' }}>{benefit.bold}</strong> {benefit.suffix}
                  </span>
                </div>
              ))}
            </div>

            {/* Size Selectors */}
            <div className="mb-4 sm:mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-sm sm:text-base" style={{ color: '#fff' }}>Selecciona la talla de cada conjunto:</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: '#00ff88' }}>
                      <Ruler className="w-3.5 h-3.5" />
                      Guía de tallas
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6 rounded-xl dark" style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#e5e5e5' }}>
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg" style={{ color: '#fff' }}>📏 Guía de Tallas</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                      <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Medidas en centímetros (cm). Mide tu cuerpo y compara con la tabla.</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                              <th className="px-2 py-1.5 text-left font-bold" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Talla</th>
                              <th className="px-2 py-1.5 text-center font-bold" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Pecho</th>
                              <th className="px-2 py-1.5 text-center font-bold" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Cintura</th>
                              <th className="px-2 py-1.5 text-center font-bold" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>Cadera</th>
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
                              <tr key={row.talla}>
                                <td className="px-2 py-1.5 font-bold" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>{row.talla}</td>
                                <td className="px-2 py-1.5 text-center" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>{row.pecho}</td>
                                <td className="px-2 py-1.5 text-center" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>{row.cintura}</td>
                                <td className="px-2 py-1.5 text-center" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>{row.cadera}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[10px] mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>💡 Si estás entre dos tallas, recomendamos elegir la talla más grande para mayor comodidad.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {SETS.map((set, idx) => (
                <div key={idx} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <img src={set.image} alt={set.name} className="w-10 h-10 rounded-lg object-cover" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />
                    <div>
                      <span className="font-bold text-sm" style={{ color: '#fff' }}>{set.name}</span>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{set.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-semibold mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>Buzo: <span style={{ color: '#00ff88' }}>{selectedTopSizes[idx]}</span></span>
                      <div className="flex gap-1.5 flex-wrap">
                        {SIZES.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedTopSizes(prev => ({ ...prev, [idx]: size }))}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                            style={{
                              background: selectedTopSizes[idx] === size ? '#00ff88' : 'transparent',
                              color: selectedTopSizes[idx] === size ? '#000' : 'rgba(255,255,255,0.7)',
                              border: selectedTopSizes[idx] === size ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.15)',
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold mb-1 block" style={{ color: 'rgba(255,255,255,0.5)' }}>Pantalón: <span style={{ color: '#00ff88' }}>{selectedBottomSizes[idx]}</span></span>
                      <div className="flex gap-1.5 flex-wrap">
                        {SIZES.map((size) => (
                          <button
                            key={`bottom-${size}`}
                            onClick={() => setSelectedBottomSizes(prev => ({ ...prev, [idx]: size }))}
                            className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                            style={{
                              background: selectedBottomSizes[idx] === size ? '#00ff88' : 'transparent',
                              color: selectedBottomSizes[idx] === size ? '#000' : 'rgba(255,255,255,0.7)',
                              border: selectedBottomSizes[idx] === size ? '1px solid #00ff88' : '1px solid rgba(255,255,255,0.15)',
                            }}
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
                    className="w-full text-base sm:text-lg font-black py-5 sm:py-7 transition-all animate-button-bounce border-0"
                    style={{ background: '#00ff88', color: '#000', boxShadow: '0 0 30px rgba(0,255,136,0.4)' }}
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
                    promoMessage="¡AVISO IMPORTANTE! El stock se está agotando y solo haremos ventas hasta el día 27 de abril. ¡Asegura el tuyo ahora!"
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
              <div className="flex flex-col items-center p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Truck className="w-6 h-6 mb-1" style={{ color: '#00ff88' }} />
                <span className="text-xs font-bold" style={{ color: '#fff' }}>Envío Gratis</span>
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>En toda Guatemala</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Shield className="w-6 h-6 mb-1" style={{ color: '#00ff88' }} />
                <span className="text-xs font-bold" style={{ color: '#fff' }}>Compra Segura</span>
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>Producto garantizado</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Clock className="w-6 h-6 mb-1" style={{ color: '#00ff88' }} />
                <span className="text-xs font-bold" style={{ color: '#fff' }}>Entrega Rápida</span>
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>3 a 5 días hábiles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="py-3 overflow-hidden w-full max-w-[100vw]" style={{ background: '#00ff88', color: '#000' }}>
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-sm sm:text-lg font-black">
              🧥 ¡OFERTA POR TIEMPO LIMITADO! - ÚLTIMAS UNIDADES 🔥
            </span>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-10 sm:py-16" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-6 sm:mb-10" style={{ color: '#fff' }}>
            ¿Por qué elegir estos conjuntos? <span style={{ color: '#00ff88' }}>💪</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shirt, title: "Material Premium", desc: "Tela ligera y resistente al agua con acabados de alta costura. Perfecta para cualquier ocasión." },
              { icon: Sparkles, title: "Diseño Elegante", desc: "Estilo sofisticado con buzo con capucha y zípper completo. Perfecto para vestir casual o deportivo." },
              { icon: Flame, title: "3 Colores Incluidos", desc: "Verde, Negro y Azul Marino. Colores versátiles que combinan con todo tu guardarropa." },
              { icon: Zap, title: "Costuras Reforzadas", desc: "Durabilidad garantizada. Costuras reforzadas que resisten lavados y uso intenso." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}>
                  <item.icon className="w-8 h-8" style={{ color: '#00ff88' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#fff' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-6 sm:mb-10" style={{ color: '#fff' }}>
            ¿Qué incluye tu kit? <span style={{ color: '#00ff88' }}>📦</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,255,136,0.02))', border: '1px solid rgba(0,255,136,0.15)' }}>
              <span className="text-4xl mb-4 block">🧥</span>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#fff' }}>3 Buzos con Zípper y Capucha</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Buzos premium con cierre completo, capucha ajustable y bolsillos laterales con zípper. Material ligero e impermeable.</p>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="text-4xl mb-4 block">👖</span>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#fff' }}>3 Pantalones</h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Pantalones deportivos con ajuste cómodo, elástico en cintura, bolsillos con zípper y puños ajustados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10 sm:py-16" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-6 sm:mb-10" style={{ color: '#fff' }}>
            Lo que dicen nuestros clientes en Guatemala 🇬🇹
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: '#00ff88' }}>{testimonial.name}</span>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-6 sm:mb-10" style={{ color: '#fff' }}>
            Preguntas Frecuentes
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "¿Los 3 conjuntos vienen incluidos por Q279?", a: "¡Sí! Por Q279 recibes los 3 conjuntos completos (Verde, Negro y Azul Marino). Cada conjunto incluye buzo con zípper y capucha + pantalón." },
              { q: "¿Puedo elegir tallas diferentes para cada conjunto?", a: "¡Sí! Puedes seleccionar una talla diferente para cada uno de los 3 conjuntos según tu preferencia." },
              { q: "¿De qué material están hechos?", a: "Están fabricados con material premium ligero, resistente al agua y con acabados de alta costura. Ideales para el gimnasio, salir a caminar o uso casual." },
              { q: "¿Cuánto tarda en llegar?", a: "Hacemos envíos a todos los departamentos de Guatemala en 3-5 días hábiles con envío completamente gratis. Pagas al recibir tu producto." },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <AccordionTrigger className="text-left text-sm sm:text-base" style={{ color: '#fff' }}>
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 sm:py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a0a, #111)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-3 sm:px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: '#fff' }}>
            ¡Lleva los 3 conjuntos por solo <span style={{ color: '#00ff88' }}>Q279</span>! 🧥🇬🇹
          </h2>
          <p className="text-lg sm:text-xl mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Envío gratis + Pago contra entrega + 3 conjuntos completos
          </p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="text-base sm:text-lg font-black py-5 sm:py-7 px-8 sm:px-12 transition-all border-0"
                style={{ background: '#00ff88', color: '#000', boxShadow: '0 0 40px rgba(0,255,136,0.4)' }}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q279
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="py-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Producto original importado. Sport Elite es distribuidor autorizado de productos deportivos de alta calidad.
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default Deportivo;
