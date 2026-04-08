import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Ruler,
} from "lucide-react";
import conjunto4Negro from "@/assets/conjunto4-negro-gen.webp";
import conjunto4Blanco from "@/assets/conjunto4-blanco-gen.webp";
import conjunto4Azul from "@/assets/conjunto4-azul-gen.webp";
import conjunto4Gris from "@/assets/conjunto4-gris-gen.webp";
import conjuntoPrincipal from "@/assets/conjunto4-principal.jpeg";
import { CODFormGuatemala, IncludedItem } from "@/components/CODFormGuatemala";
import { LegalFooter } from "@/components/LegalFooter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trackTikTokConversion, trackFacebookConversion, usePagePixels } from "@/hooks/useTrackingPixels";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const SETS = [
  { name: "Conjunto Negro", image: conjunto4Negro, description: "Camiseta + Pantaloneta" },
  { name: "Conjunto Blanco", image: conjunto4Blanco, description: "Camiseta + Pantaloneta" },
  { name: "Conjunto Azul", image: conjunto4Azul, description: "Camiseta + Pantaloneta" },
  { name: "Conjunto Gris/Negro", image: conjunto4Gris, description: "Camiseta Gris + Pantaloneta Negra" },
];

const Futurista = () => {
  const [selectedTopSizes, setSelectedTopSizes] = useState<Record<number, string>>({ 0: "M", 1: "M", 2: "M", 3: "M" });
  const [selectedBottomSizes, setSelectedBottomSizes] = useState<Record<number, string>>({ 0: "M", 1: "M", 2: "M", 3: "M" });
  const [showCODForm, setShowCODForm] = useState(false);
  const [stockCount, setStockCount] = useState(15);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockCount((prev) => (prev <= 2 ? 15 : prev - 1));
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const PRODUCT_ID = "UA-KIT3EN1-GT";
  const PRODUCT_PRICE = 299;
  const PAGE_ROUTE = "/futurista";

  const { tiktokPixelIds, facebookPixelIds } = usePagePixels(PAGE_ROUTE);

  useEffect(() => {
    tiktokPixelIds.forEach(pid => {
      trackTikTokConversion('ViewContent', {
        contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Conjuntos Deportivos Kit 4 en 1' }],
        value: PRODUCT_PRICE, currency: 'GTQ'
      }, pid);
    });
    facebookPixelIds.forEach(pid => {
      trackFacebookConversion('ViewContent', {
        content_ids: [PRODUCT_ID], content_type: 'product', content_name: 'Conjuntos Deportivos Kit 4 en 1',
        value: PRODUCT_PRICE, currency: 'GTQ'
      }, pid);
    });
  }, [tiktokPixelIds, facebookPixelIds]);

  const handleDialogChange = (open: boolean) => {
    if (open) {
      tiktokPixelIds.forEach(pid => {
        trackTikTokConversion('AddToCart', {
          contents: [{ content_id: PRODUCT_ID, content_type: 'product', content_name: 'Conjuntos Deportivos Kit 4 en 1' }],
          value: PRODUCT_PRICE, currency: 'GTQ'
        }, pid);
      });
      facebookPixelIds.forEach(pid => {
        trackFacebookConversion('AddToCart', { content_ids: [PRODUCT_ID], content_type: 'product', value: PRODUCT_PRICE, currency: 'GTQ' }, pid);
      });
    }
    setShowCODForm(open);
  };

  const guatemalanNames = [
    "María García de Ciudad de Guatemala", "Carlos López de Mixco", "Ana Martínez de Villa Nueva",
    "José Rodríguez de Quetzaltenango", "Laura Hernández de Escuintla", "Pedro González de Petapa",
    "Rosa Pérez de Antigua", "Juan Morales de Cobán", "Carmen Torres de Huehuetenango",
    "Luis Castro de Chimaltenango", "Sofía Ramírez de San Marcos", "Diego Gutiérrez de Mazatenango",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = guatemalanNames[Math.floor(Math.random() * guatemalanNames.length)];
      toast.success(
        <div>
          👟 <span className="font-bold text-red-400">{randomName}</span> acaba de comprar
        </div>,
        { description: "¡Quedan pocas unidades disponibles!", duration: 1000 }
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Andrés M.", rating: 5, comment: "Increíble que vengan 4 conjuntos completos. La calidad es excelente.", date: "Hace 2 días" },
    { name: "Gabriela R.", rating: 5, comment: "Se lo compré a mi esposo y quedó encantado. Material premium.", date: "Hace 1 semana" },
    { name: "Fernando L.", rating: 5, comment: "Llegó rápido a zona 7. Los 4 conjuntos son idénticos a la foto.", date: "Hace 2 semanas" },
    { name: "Karla P.", rating: 5, comment: "4 conjuntos a ese precio es una locura. Son cómodos para entrenar.", date: "Hace 3 semanas" },
  ];

  const sizesNote = Object.entries(selectedTopSizes)
    .map(([idx, topSize]) => `${SETS[Number(idx)].name}: Camiseta ${topSize} / Pantaloneta ${selectedBottomSizes[Number(idx)]}`)
    .join(" | ");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="text-xl sm:text-2xl font-black tracking-[0.3em] text-white">MAX</Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/catalogo" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">Catálogo</Link>
              <Link to="/conjuntos" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">Conjuntos</Link>
              <Link to="/refletiva" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">Reflectivas</Link>
              <Link to="/contacto" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">Contacto</Link>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5 animate-fade-in">
            <div className="px-6 py-6 space-y-4">
              {[{ to: "/catalogo", label: "Catálogo" }, { to: "/conjuntos", label: "Conjuntos" }, { to: "/refletiva", label: "Reflectivas" }, { to: "/contacto", label: "Contacto" }].map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)} className="block text-lg text-white/80 hover:text-white transition-colors tracking-wider">{item.label}</Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Trust Bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 bg-gradient-to-r from-red-600 to-red-700 py-1.5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-white">
            <div className="flex items-center gap-1.5"><Truck className="w-3 h-3 sm:w-4 sm:h-4" /><span>Envío Gratis</span></div>
            <div className="flex items-center gap-1.5"><CreditCard className="w-3 h-3 sm:w-4 sm:h-4" /><span>Pago Contra Entrega</span></div>
            <div className="hidden sm:flex items-center gap-1.5"><Shield className="w-3 h-3 sm:w-4 sm:h-4" /><span>Garantía Total</span></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Glow effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left - Product Image */}
            <div className="relative group order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111]">
                <img
                  src={conjuntoPrincipal}
                  alt="Kit 4 Conjuntos Deportivos"
                  className="w-full h-auto object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={600}
                  height={750}
                />
                {/* Stock overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-sm sm:text-base font-bold text-white">
                      ¡Solo quedan <span className="text-red-400">{stockCount}</span> kits!
                      <span className="font-normal text-white/50 ml-1">— Stock actualizado hoy</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Color swatches */}
              <div className="flex gap-3 mt-4 justify-center">
                {SETS.map((set, idx) => (
                  <div key={idx} className="relative group/swatch">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white/10 hover:border-red-500/50 transition-all cursor-pointer">
                      <img src={set.image} alt={set.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-white/40 opacity-0 group-hover/swatch:opacity-100 transition-opacity">
                      {set.name.replace("Conjunto ", "")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Product Info */}
            <div className="order-2 lg:sticky lg:top-36">
              {/* Badge */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500 text-white tracking-wider">🇬🇹 ENVÍO GRATIS</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white/80 tracking-wider">+4,200 VENDIDOS</span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-red-500 text-red-500" />
                  ))}
                </div>
                <span className="text-sm text-white/40">(340+ reseñas)</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[0.95] tracking-tight">
                <span className="text-white">CONJUNTOS</span>
                <br />
                <span className="text-white">DEPORTIVOS</span>
                <br />
                <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">KIT 4 EN 1</span>
              </h1>

              <p className="text-sm sm:text-base text-white/50 mb-6 leading-relaxed max-w-lg">
                Renueva tu guardarropa deportivo con 4 conjuntos premium. Camiseta + Pantaloneta en 4 colores para toda la semana.
              </p>

              {/* Promo badge */}
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs sm:text-sm font-bold text-red-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  PROMOCIÓN VÁLIDA HASTA HOY {new Date().toLocaleDateString('es-GT', { timeZone: 'America/Guatemala', day: 'numeric', month: 'long' }).toUpperCase()}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#111] border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-white/40">Precio normal:</span>
                    <span className="text-base text-white/40 line-through decoration-red-500 decoration-2">Q699</span>
                  </div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-500">Q299</span>
                    <span className="text-lg text-white/30 font-medium">GTQ</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-red-500 text-white font-bold text-xs px-3 py-1.5 rounded-full">
                    <Flame className="w-3.5 h-3.5" />
                    ¡AHORRA Q400!
                  </span>
                </div>
              </div>

              {/* Delivery Timeline */}
              {(() => {
                const today = new Date();
                const formatDate = (d: Date) => `${d.getDate()} ${d.toLocaleDateString('es-GT', { month: 'short' }).replace('.', '')}`;
                const addDays = (d: Date, days: number) => { const r = new Date(d); r.setDate(r.getDate() + days); return r; };
                return (
                  <div className="mb-6 p-4 rounded-xl bg-[#111] border border-white/10">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex flex-col items-center text-center">
                        <ShoppingCart className="w-5 h-5 mb-1 text-red-400" />
                        <span className="font-bold text-white">{formatDate(today)}</span>
                        <span className="text-white/40">Confirmada</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-red-500/20 mx-3" />
                      <div className="flex flex-col items-center text-center">
                        <Truck className="w-5 h-5 mb-1 text-red-400" />
                        <span className="font-bold text-white">{formatDate(addDays(today, 1))}</span>
                        <span className="text-white/40">Despachada</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-red-500/20 to-red-500/50 mx-3" />
                      <div className="flex flex-col items-center text-center">
                        <Gift className="w-5 h-5 mb-1 text-red-400" />
                        <span className="font-bold text-white">{formatDate(addDays(today, 3))}-{addDays(today, 5).getDate()}</span>
                        <span className="text-white/40">Entregada</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {[
                  { text: "Kit completo con", bold: "4 conjuntos deportivos de alta calidad" },
                  { text: "Material", bold: "transpirable y de secado rápido" },
                  { text: "Diseño moderno con", bold: "estampado holográfico premium" },
                  { text: "Ideal para", bold: "gimnasio, running y actividades al aire libre" },
                  { text: "Envío", bold: "100% gratis a toda Guatemala" },
                ].map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-red-400" />
                    </div>
                    <span className="text-sm text-white/70">{b.text} <strong className="text-white">{b.bold}</strong></span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <button className="w-full group relative px-8 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-base sm:text-lg rounded-2xl hover:shadow-[0_0_50px_rgba(255,0,0,0.25)] transition-all duration-500 tracking-wider flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                    PEDIR AHORA — Q299
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[100dvw] max-w-[100dvw] sm:w-[95vw] sm:max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[95vh] overflow-x-hidden overflow-y-auto p-3 sm:p-6 rounded-none sm:rounded-xl left-0 top-0 translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] overscroll-contain touch-pan-y [&>button:last-child]:hidden">
                  <button
                    onClick={() => setShowCODForm(false)}
                    className="absolute right-3 top-3 z-50 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
                    aria-label="Cerrar"
                  >✕</button>
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg pr-10">Formulario de Pedido - Pago Contra Entrega</DialogTitle>
                  </DialogHeader>
                  {showCODForm && (
                    <CODFormGuatemala
                      productId={PRODUCT_ID}
                      productPrice={PRODUCT_PRICE}
                      productName={`Conjuntos Deportivos Kit 4 en 1 (${sizesNote})`}
                      productDisplayName="Conjuntos Deportivos Kit 4 en 1"
                      productImage={conjunto4Negro}
                      tiktokPixelId={tiktokPixelIds[0]}
                      facebookPixelId={facebookPixelIds[0]}
                      sizeDetails={SETS.map((set, idx) => ({
                        name: set.name,
                        image: set.image,
                        topSize: selectedTopSizes[idx],
                        bottomSize: selectedBottomSizes[idx],
                        topLabel: 'Camiseta',
                        bottomLabel: 'Pantaloneta',
                      }))}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía 1 Año', description: 'Protección contra defectos' },
                        { id: 'kit', icon: '👕', title: '4 Conjuntos Completos', description: 'Negro + Blanco + Azul + Gris' },
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
              <p className="text-xs text-center text-white/30 mt-2">💵 Solo pagas al recibir tu producto</p>
            </div>
          </div>
        </div>
      </section>

      {/* Size Selector Section */}
      <section className="py-12 sm:py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl font-black tracking-[0.1em] text-white mb-3">ELIGE TU TALLA</h2>
            <p className="text-sm text-white/40 tracking-wider">Selecciona la talla para cada conjunto</p>
          </div>

          {/* Size Guide */}
          <div className="flex justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors border border-red-500/20 rounded-full px-4 py-2 hover:bg-red-500/5">
                  <Ruler className="w-4 h-4" />
                  📏 Ver Guía de Tallas
                </button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">📏 Guía de Tallas</DialogTitle>
                </DialogHeader>
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-3">Medidas en centímetros (cm).</p>
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
                  <p className="text-[10px] text-muted-foreground mt-3">💡 Si estás entre dos tallas, recomendamos elegir la talla más grande.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SETS.map((set, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#111] border border-white/10 hover:border-red-500/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <img src={set.image} alt={set.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                  <div>
                    <span className="font-bold text-sm text-white">{set.name}</span>
                    <p className="text-xs text-white/40">{set.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-white/40 mb-1.5 block">Camiseta: <span className="text-red-400">{selectedTopSizes[idx]}</span></span>
                    <div className="flex gap-1.5 flex-wrap">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedTopSizes(prev => ({ ...prev, [idx]: size }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selectedTopSizes[idx] === size
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                          }`}
                        >{size}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white/40 mb-1.5 block">Pantaloneta: <span className="text-red-400">{selectedBottomSizes[idx]}</span></span>
                    <div className="flex gap-1.5 flex-wrap">
                      {SIZES.map((size) => (
                        <button
                          key={`bottom-${size}`}
                          onClick={() => setSelectedBottomSizes(prev => ({ ...prev, [idx]: size }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            selectedBottomSizes[idx] === size
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-transparent text-white/60 border-white/10 hover:border-white/30"
                          }`}
                        >{size}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Marquee */}
      <div className="bg-red-600 text-white py-3 overflow-hidden">
        <div className="animate-[scroll_20s_linear_infinite] whitespace-nowrap flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-6 sm:mx-10 text-sm sm:text-lg font-bold flex-shrink-0">
              👟 ¡OFERTA POR TIEMPO LIMITADO! — ÚLTIMAS UNIDADES 🔥
            </span>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-[0.15em] text-white mb-3">¿POR QUÉ ELEGIR ESTOS CONJUNTOS?</h2>
            <p className="text-sm text-white/40 tracking-wider">Tecnología deportiva de alto rendimiento 💪</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shirt, title: "Material Premium", desc: "Tela transpirable de alta calidad con secado rápido." },
              { icon: Sparkles, title: "Estampado Holográfico", desc: "Diseño único con detalles que cambian con la luz." },
              { icon: Flame, title: "4 Colores Incluidos", desc: "Negro, Blanco, Azul y Gris/Negro." },
              { icon: Zap, title: "Costuras Reforzadas", desc: "Durabilidad garantizada para entrenamientos intensos." },
            ].map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-red-500/20 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                  <f.icon className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl font-black tracking-[0.15em] text-white mb-3">¿QUÉ INCLUYE TU KIT? 📦</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Negro", "Blanco", "Azul", "Gris/Negro"].map((color) => (
              <div key={color} className="p-5 rounded-2xl bg-[#111] border border-white/5 text-center hover:border-red-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                  <Shirt className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white">Conjunto {color}</h3>
                <p className="text-white/40 text-xs mt-1">Camiseta + Pantaloneta</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-black tracking-[0.15em] text-white mb-3">OPINIONES 🇬🇹</h2>
            <p className="text-sm text-white/40 tracking-wider">Lo que dicen nuestros clientes en Guatemala</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-red-500/20 transition-colors">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="text-sm text-white/60 mb-4 leading-relaxed italic">"{t.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{t.name}</span>
                  <span className="text-xs text-white/30">{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-5xl font-black tracking-[0.15em] text-white mb-3">PREGUNTAS FRECUENTES</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {[
              { q: "¿Los 4 conjuntos vienen incluidos por Q299?", a: "¡Sí! Por Q299 recibes los 4 conjuntos completos (Negro, Blanco, Azul y Gris/Negro). Cada conjunto incluye camiseta y pantaloneta." },
              { q: "¿Puedo elegir tallas diferentes para cada conjunto?", a: "¡Sí! Puedes seleccionar una talla diferente para cada uno de los 4 conjuntos según tu preferencia." },
              { q: "¿De qué material están hechos?", a: "Están fabricados con material transpirable de alta calidad, con tecnología de secado rápido. Ideales para el gimnasio, correr o actividades al aire libre." },
              { q: "¿Cuánto tarda en llegar?", a: "Hacemos envíos a todos los departamentos de Guatemala en 3-5 días hábiles con envío completamente gratis. Pagas al recibir tu producto." },
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-white/10 rounded-xl px-4 bg-[#111] data-[state=open]:border-red-500/20">
                <AccordionTrigger className="text-left text-sm sm:text-base text-white hover:no-underline py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-white/50 pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
            <span className="text-white">4 CONJUNTOS</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">POR SOLO Q299</span>
          </h2>
          <p className="text-base sm:text-lg text-white/40 mb-8 sm:mb-12 max-w-xl mx-auto">
            Envío gratis + Pago contra entrega + 4 conjuntos completos 🇬🇹
          </p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-sm sm:text-base rounded-full hover:shadow-[0_0_50px_rgba(255,0,0,0.25)] transition-all duration-500 tracking-wider">
                <ShoppingCart className="w-5 h-5" />
                PEDIR AHORA — Q299
                <ArrowRight className="w-5 h-5" />
              </button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Trust Bar Bottom */}
      <div className="py-8 sm:py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 sm:gap-8">
          {[
            { icon: Truck, title: "Envío Gratis", desc: "En toda Guatemala" },
            { icon: Shield, title: "Compra Segura", desc: "Producto garantizado" },
            { icon: Clock, title: "Entrega Rápida", desc: "3 a 5 días hábiles" },
          ].map((b, idx) => (
            <div key={idx} className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-2">
                <b.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-white">{b.title}</h4>
              <p className="text-[10px] sm:text-xs text-white/40">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-white/20">
            Producto importado de alta calidad. MAX Guatemala - Tienda online de productos deportivos premium. Todos los derechos reservados.
          </p>
        </div>
      </div>

      <LegalFooter />

      {/* Custom animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Futurista;
