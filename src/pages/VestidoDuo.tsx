import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
import { TestimonialCard } from "@/components/TestimonialCard";
import { toast } from "sonner";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Truck, CreditCard, Shield, Star, Check, Gift, Clock,
  ShoppingCart, Sparkles, Flame, Zap, Heart,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";
import { CODFormGuatemala } from "@/components/CODFormGuatemala";
import { LegalFooter } from "@/components/LegalFooter";
import maxHeader from "@/assets/max-header.png";

import vestidoBrancoLargo1 from "@/assets/vestido-branco-largo-1.jpg";
import vestidoBrancoLargo2 from "@/assets/vestido-branco-largo-2.jpg";
import vestidoNegroMini1 from "@/assets/vestido-negro-mini-1.jpg";
import vestidoNegroMini2 from "@/assets/vestido-negro-mini-2.jpg";
import vestidoNegroMini3 from "@/assets/vestido-negro-mini-3.jpg";
import vestidoNegroMini4 from "@/assets/vestido-negro-mini-4.jpg";

const SIZES = ["S", "M", "L", "XL"];

const DRESSES = [
  { name: "Vestido Largo Blanco Off-Shoulder", image: vestidoBrancoLargo1, description: "Vestido largo elegante con hombros descubiertos" },
  { name: "Mini Vestido Negro Asimétrico", image: vestidoNegroMini1, description: "Mini vestido negro con detalle de lazo lateral" },
];

const VestidoDuo = () => {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({
    0: "M", 1: "M",
  });
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCODForm, setShowCODForm] = useState(false);

  const PRODUCT_ID = "VESTIDO-DUO2-GT";
  const PRODUCT_PRICE = 249;

  const productImages = [
    vestidoBrancoLargo1, vestidoBrancoLargo2,
    vestidoNegroMini1, vestidoNegroMini2,
    vestidoNegroMini3, vestidoNegroMini4,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage(prev => (prev + 1) % productImages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [productImages.length]);

  const handleDialogChange = (open: boolean) => setShowCODForm(open);

  const guatemalanNames = [
    "María García de Ciudad de Guatemala", "Sofía López de Mixco",
    "Ana Martínez de Villa Nueva", "Gabriela Rodríguez de Quetzaltenango",
    "Laura Hernández de Escuintla", "Rosa González de Petapa",
    "Carmen Pérez de Antigua", "Lucía Morales de Cobán",
    "Valentina Torres de Huehuetenango", "Isabella Castro de Chimaltenango",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = guatemalanNames[Math.floor(Math.random() * guatemalanNames.length)];
      toast.success(
        <div>👗 <span className="text-destructive font-bold">{randomName}</span> acaba de comprar</div>,
        { description: "¡Quedan pocas unidades disponibles!", duration: 4000 }
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: "Andrea M.", rating: 5, comment: "El vestido blanco es perfecto para eventos formales y el negro es ideal para salir. ¡2 por Q249 es increíble!", date: "Hace 2 días" },
    { name: "Carolina S.", rating: 5, comment: "La calidad de ambos vestidos superó mis expectativas. El negro es súper versátil y elegante.", date: "Hace 5 días" },
    { name: "Daniela R.", rating: 5, comment: "Me encantó el off-shoulder blanco, es divino. Y el mini negro es perfecto para fiestas. ¡Recomendadísimos!", date: "Hace 1 semana" },
    { name: "Patricia G.", rating: 5, comment: "2 vestidos premium por ese precio es una ganga. Llegaron rápido y la tela es de excelente calidad.", date: "Hace 2 semanas" },
  ];

  const sizesNote = Object.entries(selectedSizes)
    .map(([idx, size]) => `${DRESSES[Number(idx)].name.split(' ').slice(0, 3).join(' ')}: ${size}`)
    .join(" | ");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="w-full bg-white">
        <img src={maxHeader} alt="MAX Guatemala - Tienda Online" className="w-full h-auto object-contain sm:object-cover max-h-[120px] sm:max-h-none mx-auto sm:mx-0 p-2 sm:p-0" />
      </div>

      <div className="bg-gradient-hero text-primary-foreground py-2">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2"><Truck className="w-3 h-3 sm:w-4 sm:h-4" /><span>Envío Gratis</span></div>
            <div className="flex items-center gap-1.5 sm:gap-2"><CreditCard className="w-3 h-3 sm:w-4 sm:h-4" /><span>Pago Contra Entrega</span></div>
            <div className="flex items-center gap-1.5 sm:gap-2"><Shield className="w-3 h-3 sm:w-4 sm:h-4" /><span>Garantía Total</span></div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          <div className="animate-fade-in">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-large mb-3 sm:mb-4 bg-white relative">
              <img src={productImages[selectedImage]} alt="Vestido Duo Kit 2 en 1" className="w-full h-auto object-cover aspect-[3/4]" />
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

          <div className="animate-scale-in">
            <div className="mb-3">
              <Badge className="bg-pink-600 text-white font-bold text-xs sm:text-sm px-3 py-1.5 border-2 border-pink-700">
                🇬🇹 Envío Gratis a toda Guatemala
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">(150+ reseñas)</span>
              <Badge variant="secondary" className="text-xs font-semibold">+1,800 vendidos!</Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-foreground leading-tight">
              VESTIDO DUO KIT 2 EN 1 👗✨
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className="bg-destructive text-destructive-foreground font-bold text-xs px-3 py-1.5">
                COMPRA 1 Y LLEVA 2 GRATIS
              </Badge>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              2 vestidos premium para toda ocasión. Un elegante vestido largo blanco off-shoulder y un mini vestido negro asimétrico con detalle de lazo: estilos únicos con telas de alta calidad.
            </p>

            <div className="mb-4 sm:mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent border-2 border-pink-500/30 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm sm:text-base text-muted-foreground">Precio normal:</span>
                  <span className="text-base sm:text-lg text-muted-foreground line-through decoration-destructive decoration-2">Q399</span>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-destructive animate-pulse-scale drop-shadow-sm">Q249</span>
                  <span className="text-lg sm:text-xl font-semibold text-muted-foreground">GTQ</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-success text-success-foreground font-bold text-xs sm:text-sm px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-base">🔥</span>
                  <span>¡APROVECHA LA PROMOCIÓN!</span>
                </div>
              </div>
            </div>

            {(() => {
              const today = new Date();
              const formatDate = (date: Date) => `${date.getDate()} ${date.toLocaleDateString('es-GT', { month: 'short' }).replace('.', '')}`;
              const addDays = (date: Date, days: number) => { const r = new Date(date); r.setDate(r.getDate() + days); return r; };
              return (
                <div className="mb-4 sm:mb-6 p-4 rounded-xl bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col items-center text-center">
                      <ShoppingCart className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{formatDate(today)}</span>
                      <span className="text-muted-foreground">Confirmada</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{formatDate(addDays(today, 1))}</span>
                      <span className="text-muted-foreground">Despachada</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
                    <div className="flex flex-col items-center text-center">
                      <Gift className="w-5 h-5 mb-1 text-primary" />
                      <span className="font-bold">{formatDate(addDays(today, 3))}-{addDays(today, 5).getDate()}</span>
                      <span className="text-muted-foreground">Entregada</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                { text: "Kit completo con", bold: "2 vestidos premium exclusivos" },
                { text: "Telas de", bold: "alta calidad con acabados perfectos" },
                { text: "Diseños", bold: "versátiles para toda ocasión" },
                { text: "Ideales para", bold: "fiestas, cenas, bodas y eventos" },
                { text: "Envío", bold: "100% gratis a toda Guatemala" },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-success flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success-foreground" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{benefit.text} <strong>{benefit.bold}</strong></span>
                </div>
              ))}
            </div>

            <div className="mb-4 sm:mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-foreground text-sm sm:text-base">Selecciona la talla de cada vestido:</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      <Ruler className="w-3.5 h-3.5" />
                      Guía de tallas
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-md p-4 sm:p-6 rounded-xl">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">📏 Guía de Tallas - Vestidos</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground mb-3">Medidas en centímetros (cm).</p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-secondary">
                              <th className="border border-border px-2 py-1.5 text-left font-bold">Talla</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Busto</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Cintura</th>
                              <th className="border border-border px-2 py-1.5 text-center font-bold">Cadera</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { talla: "S", busto: "82-86", cintura: "64-68", cadera: "88-92" },
                              { talla: "M", busto: "86-90", cintura: "68-72", cadera: "92-96" },
                              { talla: "L", busto: "90-96", cintura: "72-78", cadera: "96-102" },
                              { talla: "XL", busto: "96-102", cintura: "78-84", cadera: "102-108" },
                            ].map((row) => (
                              <tr key={row.talla} className="hover:bg-secondary/50">
                                <td className="border border-border px-2 py-1.5 font-bold">{row.talla}</td>
                                <td className="border border-border px-2 py-1.5 text-center">{row.busto}</td>
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
              {DRESSES.map((dress, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-border bg-secondary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={dress.image} alt={dress.name} className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-xs sm:text-sm text-foreground block truncate">{dress.name}</span>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{dress.description}</p>
                    </div>
                    <span className="ml-auto text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      Talla: <span className="text-foreground">{selectedSizes[idx]}</span>
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSizes(prev => ({ ...prev, [idx]: size }))}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
                          selectedSizes[idx] === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background text-foreground border-border hover:border-foreground/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 sm:mb-8">
              <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full text-base sm:text-lg font-bold py-5 sm:py-7 bg-pink-600 hover:bg-pink-700 text-white hover:shadow-glow transition-all animate-button-bounce">
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
                      productName={`Vestido Duo Kit 2 en 1 (${sizesNote})`}
                      productImage={vestidoBrancoLargo1}
                      includedItems={[
                        { id: 'warranty', icon: '🛡️', title: 'Garantía', description: 'Protección contra defectos' },
                        { id: 'kit', icon: '👗', title: '2 Vestidos Premium', description: 'Blanco Off-Shoulder + Negro Asimétrico' },
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

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <TrustBadge icon={Truck} title="Envío Gratis" description="En toda Guatemala" />
              <TrustBadge icon={Shield} title="Compra Segura" description="Producto garantizado" />
              <TrustBadge icon={Clock} title="Entrega Rápida" description="3 a 5 días hábiles" />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-pink-600 text-white py-3 overflow-hidden w-full max-w-[100vw]">
        <div className="animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="mx-4 sm:mx-8 text-sm sm:text-lg font-bold">
              👗 ¡OFERTA POR TIEMPO LIMITADO! - ÚLTIMAS UNIDADES 🔥
            </span>
          ))}
        </div>
      </div>

      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">¿Qué incluye tu kit? 📦</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto">
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-500/10 to-slate-600/5 border border-slate-500/20 text-center">
              <span className="text-3xl sm:text-4xl mb-3 block">🤍</span>
              <h3 className="font-bold text-xs sm:text-base mb-1">Vestido Blanco</h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Largo off-shoulder</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-800/10 to-gray-900/5 border border-gray-500/20 text-center">
              <span className="text-3xl sm:text-4xl mb-3 block">🖤</span>
              <h3 className="font-bold text-xs sm:text-base mb-1">Mini Negro</h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs">Asimétrico con lazo</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">¿Por qué elegir estos vestidos? 💃</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Heart, title: "Diseños Únicos", desc: "Un look elegante y uno atrevido: 2 estilos para cada momento especial." },
              { icon: Sparkles, title: "Tela Premium", desc: "Materiales de alta calidad que se ajustan perfectamente a tu cuerpo." },
              { icon: Flame, title: "Para Toda Ocasión", desc: "Desde bodas elegantes hasta fiestas nocturnas. Siempre perfecta." },
              { icon: Zap, title: "Acabados Perfectos", desc: "Costuras reforzadas y detalles cuidados que marcan la diferencia." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-background border border-border text-center">
                <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-3 sm:px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">Lo que dicen nuestras clientas 🇬🇹</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((t, idx) => <TestimonialCard key={idx} {...t} />)}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">Preguntas Frecuentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-sm sm:text-base">¿Los 2 vestidos vienen incluidos por Q249?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">¡Sí! Por Q249 recibes los 2 vestidos: vestido largo blanco off-shoulder y mini vestido negro asimétrico con lazo.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-sm sm:text-base">¿Puedo elegir tallas diferentes?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">¡Sí! Puedes seleccionar una talla diferente para cada vestido.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-sm sm:text-base">¿Cuánto tarda en llegar?</AccordionTrigger>
              <AccordionContent className="text-sm sm:text-base">Envíos a todos los departamentos de Guatemala en 3-5 días hábiles con envío gratis. Pagas al recibir.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-10 sm:py-16 bg-gradient-to-r from-pink-700 to-pink-900 text-white">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">¡Lleva los 2 vestidos por solo Q249! 👗🇬🇹</h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">Envío gratis + Pago contra entrega + 2 vestidos premium</p>
          <Dialog open={showCODForm} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button size="lg" className="text-base sm:text-lg font-bold py-5 sm:py-7 px-8 sm:px-12 bg-white text-pink-700 hover:bg-gray-100 hover:shadow-glow transition-all">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                PEDIR AHORA - Q249
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      <div className="bg-secondary/50 py-4">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-xs text-muted-foreground">Producto original importado. MAX Guatemala es distribuidor autorizado de moda femenina premium. Todos los derechos reservados.</p>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default VestidoDuo;
