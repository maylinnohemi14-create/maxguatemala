import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import { CODFormColombia } from "@/components/CODFormColombia";
import { Button } from "@/components/ui/button";
import { trackTikTokConversion, trackFacebookConversion, usePagePixels } from "@/hooks/useTrackingPixels";
import { Check, Shield, Truck, Sparkles, Star, ChevronLeft, ShoppingBag, CreditCard, Ruler, Package, X, Flame } from "lucide-react";
import jacketBlanca from "@/assets/jacket-nike-blanca.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JOGGER_KITS_CO_KITS } from "./JoggerKits";

const NIKE_ORANGE = "#FF6B00";
const NIKE_RED = "#FA0F00";
const BLACK = "#0A0A0A";

const cop = (n: number) => "$" + n.toLocaleString("es-CO");

const PAGE_ROUTE = "/joggerkits";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const JACKET_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];

const SIZE_GUIDE = [
  { size: "XS", cintura: "68-72", cadera: "88-92", largo: "98" },
  { size: "S", cintura: "72-78", cadera: "92-98", largo: "100" },
  { size: "M", cintura: "78-84", cadera: "98-104", largo: "102" },
  { size: "L", cintura: "84-92", cadera: "104-110", largo: "104" },
  { size: "XL", cintura: "92-100", cadera: "110-118", largo: "106" },
  { size: "XXL", cintura: "100-108", cadera: "118-126", largo: "108" },
];

const JoggerKitsKitPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({ 0: "M", 1: "M", 2: "M" });
  const [showForm, setShowForm] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [addJacket, setAddJacket] = useState(false);
  const [jacketSize, setJacketSize] = useState("M");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  const { tiktokPixelIds, facebookPixelIds } = usePagePixels(PAGE_ROUTE);

  const kit = JOGGER_KITS_CO_KITS.find((k) => k.slug === slug);

  const otherKits = useMemo(() => {
    if (!kit) return [];
    return JOGGER_KITS_CO_KITS.filter((k) => k.slug !== slug).slice(0, 4);
  }, [slug, kit]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  if (!kit) {
    return <Navigate to="/joggerkits" replace />;
  }

  const totalPrice = kit.price;
  const productDisplayName = `Kit 3en1: ${kit.name}`;
  const sizeDetails = kit.items.map((item, i) => `${item.name} (Talla: ${selectedSizes[i] || "M"})`).join(" + ");
  const extraNote = `KIT 3en1: ${kit.name} | ${sizeDetails}${addJacket ? ` | + CHAQUETA NIKE BLANCA Talla ${jacketSize} (REGALO GRATIS)` : ""}`;

  const goToForm = () => {
    setShowUpsell(false);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleUpsellDecision = (accept: boolean) => {
    setAddJacket(accept);
    goToForm();
  };

  const handleUpsellClose = () => {
    setAddJacket(false);
    goToForm();
  };

  const handleBuyClick = () => {
    trackTikTokConversion(
      "AddToCart",
      { contents: [{ content_id: kit.id, content_type: "product", content_name: productDisplayName, quantity: 1, price: totalPrice }], value: totalPrice, currency: "COP" },
      undefined
    );
    trackFacebookConversion(
      "AddToCart",
      { content_ids: [kit.id], content_type: "product", value: totalPrice, currency: "COP" },
      undefined
    );
    setShowUpsell(true);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-clip"
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #181818 0%, #0a0a0a 50%, #000000 100%)`,
        transition: "background 0.4s ease-out",
      }}
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${NIKE_ORANGE}33 1px, transparent 1px), linear-gradient(90deg, ${NIKE_ORANGE}33 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ background: NIKE_ORANGE }} />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse" style={{ background: NIKE_RED, animationDelay: "1.5s" }} />

      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/joggerkits" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`, boxShadow: `0 0 20px ${NIKE_ORANGE}66` }}
            >
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Kit 3 en 1</div>
              <div className="text-base sm:text-lg font-black tracking-tight text-white">
                TRACKPANTS <span style={{ color: NIKE_ORANGE }}>·</span> CO
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: NIKE_ORANGE }} />
            <span className="text-xs text-white/80 font-medium">PAGO CONTRA ENTREGA</span>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-6 pb-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative">
            <div
              className="relative aspect-[3/4] rounded-3xl overflow-hidden border backdrop-blur-md mb-3"
              style={{
                borderColor: `${NIKE_ORANGE}55`,
                background: `linear-gradient(160deg, #1a1a1a, #000)`,
                boxShadow: `0 20px 60px -20px ${NIKE_ORANGE}aa`,
              }}
            >
              <div
                className="absolute top-6 -right-12 z-20 w-48 text-center py-1.5 text-[11px] font-black tracking-widest text-white rotate-45"
                style={{ background: `linear-gradient(90deg, ${NIKE_RED}, ${NIKE_ORANGE})`, boxShadow: `0 4px 16px ${NIKE_RED}66` }}
              >
                💰 PAGO AL RECIBIR
              </div>

              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[11px] font-black tracking-wider text-white"
                style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})` }}>
                🔥 KIT 3 EN 1
              </div>

              <img src={kit.items[activeImage].image} alt={kit.items[activeImage].name} className="w-full h-full object-cover transition-all duration-500" loading="eager" fetchPriority="high" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, #000000cc 100%)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                  <span className="text-xs font-bold text-white tracking-wide">{kit.items[activeImage].name}</span>
                </div>
                <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                  <span className="text-xs font-bold text-white tracking-wide">{activeImage + 1}/3</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {kit.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative aspect-square rounded-xl overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: activeImage === i ? NIKE_ORANGE : "rgba(255,255,255,0.1)",
                    boxShadow: activeImage === i ? `0 0 12px ${NIKE_ORANGE}66` : "none",
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="eager" />
                  <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-1.5">
                    <span className="text-[9px] font-bold text-white tracking-wide bg-black/60 px-2 py-0.5 rounded-full">{item.color}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border backdrop-blur-md"
              style={{ borderColor: `${NIKE_ORANGE}66`, background: `${NIKE_ORANGE}15` }}>
              <Package className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
              <span className="text-[11px] font-bold tracking-widest" style={{ color: NIKE_ORANGE }}>KIT 3 EN 1 · AHORRA MÁS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-[0.95] tracking-tight mb-3">
              Kit 3 en 1
              <br />
              <span style={{
                background: `linear-gradient(135deg, ${NIKE_ORANGE} 0%, ${NIKE_RED} 100%)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                {kit.name}
              </span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base mb-5">
              3 pantalones deportivos vintage en un solo kit. Ahorra comprando el combo completo. Envío gratis a toda Colombia.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white/50">(5.0) · Combo exclusivo</span>
            </div>

            <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-white/80 font-medium">{Math.floor(Math.random() * 4) + 12} personas viendo ahora</span>
            </div>

            <div className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black" style={{ color: NIKE_ORANGE }}>{cop(kit.price)}</span>
                <span className="text-lg text-white/30 line-through">{cop(kit.originalPrice)}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-black"
                  style={{ background: `${NIKE_ORANGE}33`, color: NIKE_ORANGE }}>
                  AHORRA {cop(kit.originalPrice - kit.price)}
                </span>
              </div>
              <p className="text-xs text-white/40">3 trackpants por el precio de 1. Oferta limitada.</p>
            </div>

            <div className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-bold">📦 Incluye 3 Trackpants</div>
              <div className="space-y-3">
                {kit.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-white/10 bg-white/5">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-white/40">{item.color}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/30">Talla</span>
                      <div className="flex gap-1 mt-0.5">
                        {SIZES.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSizes(prev => ({ ...prev, [i]: s }))}
                            className="w-7 h-7 rounded text-[10px] font-black transition-all border"
                            style={{
                              borderColor: selectedSizes[i] === s ? NIKE_ORANGE : "rgba(255,255,255,0.1)",
                              background: selectedSizes[i] === s ? `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})` : "transparent",
                              color: "#fff",
                              boxShadow: selectedSizes[i] === s ? `0 0 8px ${NIKE_ORANGE}66` : "none",
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 flex justify-end">
              <button type="button" onClick={() => setShowSizeGuide(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105"
                style={{ borderColor: `${NIKE_ORANGE}88`, background: `${NIKE_ORANGE}15`, color: NIKE_ORANGE }}>
                <Ruler className="w-3 h-3" /> Guía de Tallas
              </button>
            </div>

            <Button onClick={handleBuyClick} size="lg"
              className="w-full text-base sm:text-lg font-black py-6 sm:py-7 rounded-2xl tracking-wider transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
                color: "#fff",
                boxShadow: `0 12px 32px -8px ${NIKE_ORANGE}, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}>
              <ShoppingBag className="w-5 h-5 mr-2" /> COMPRAR KIT 3en1 — {cop(totalPrice)}
            </Button>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[
                { i: <Truck className="w-4 h-4" />, t: "Envío Gratis" },
                { i: <Shield className="w-4 h-4" />, t: "Garantía Total" },
                { i: <CreditCard className="w-4 h-4" />, t: "Pago al Recibir" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-2.5 rounded-lg border border-white/10 bg-white/5">
                  <span style={{ color: NIKE_ORANGE }}>{t.i}</span>
                  <span className="text-[10px] text-white/70 font-medium">{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {showForm && (
        <section ref={formRef} className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
          <div className="rounded-3xl p-4 sm:p-8 border backdrop-blur-md"
            style={{
              borderColor: `${NIKE_ORANGE}55`,
              background: "linear-gradient(160deg, rgba(255,255,255,0.97), rgba(245,245,245,0.97))",
              boxShadow: `0 20px 60px -10px ${NIKE_ORANGE}88`,
            }}>
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                style={{ background: `${NIKE_ORANGE}22`, border: `1px solid ${NIKE_ORANGE}55` }}>
                <span style={{ color: NIKE_ORANGE }} className="text-xs font-bold tracking-widest">✦ ÚLTIMO PASO ✦</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black">Completa tus datos</h2>
              <p className="text-sm text-black/60 mt-1">Tu kit llegará en 24-72h. Pagas al recibir.</p>
            </div>

            <CODFormColombia
              productId="JOGGER-KITS-CO"
              productPrice={totalPrice}
              productName={productDisplayName}
              productDisplayName={productDisplayName + (addJacket ? ` + Chaqueta Nike Talla ${jacketSize} (REGALO)` : "")}
              productImage={kit.items[0].image}
              tiktokPixelIds={tiktokPixelIds}
              facebookPixelIds={facebookPixelIds}
              defaultNota={extraNote}
              idProducto="2132618"
              transportadora="INTERRAPIDISIMO"
              includedItems={[
                { id: "warranty", icon: "🛡️", title: "Garantía 30 días", description: "Cambios y devoluciones gratis" },
              ]}
            />
          </div>
        </section>
      )}

      {otherKits.length > 0 && (
        <section className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">✦ Más Combos</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Otros Kits <span style={{ color: NIKE_ORANGE }}>3 en 1</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {otherKits.map((k) => (
              <Link key={k.slug} to={`/joggerkits/kit/${k.slug}`}
                className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur transition-all hover:border-orange-500/40 hover:shadow-lg">
                <div className="aspect-square overflow-hidden relative">
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    <img src={k.items[0].image} alt="" className="w-full h-full object-cover col-span-1 row-span-2" />
                    <img src={k.items[1].image} alt="" className="w-full h-full object-cover" />
                    <img src={k.items[2].image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})` }}>
                    3 EN 1
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 mb-1">{k.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black" style={{ color: NIKE_ORANGE }}>{cop(k.price)}</span>
                    <span className="text-xs text-white/30 line-through">{cop(k.originalPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* UPSELL DIALOG - REGALO GRATIS */}
      <Dialog open={showUpsell} onOpenChange={(open) => { if (!open) handleUpsellClose(); }}>
        <DialogContent
          className="w-[calc(100vw-16px)] max-w-md p-0 overflow-hidden border-0"
          style={{
            background: `linear-gradient(160deg, #1a1a1a, ${BLACK})`,
            boxShadow: `0 30px 80px ${NIKE_ORANGE}55`,
          }}
        >
          <div className="relative p-5 sm:p-6" style={{ borderTop: `3px solid ${NIKE_ORANGE}` }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: NIKE_ORANGE }} />
            <button type="button" onClick={handleUpsellClose} aria-label="Cerrar"
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${NIKE_ORANGE} 0%, ${NIKE_RED} 100%)`,
                boxShadow: `0 0 16px ${NIKE_ORANGE}, 0 0 32px ${NIKE_ORANGE}99, 0 0 48px ${NIKE_RED}66, inset 0 0 8px rgba(255,255,255,0.3)`,
                border: `2px solid #fff`,
              }}>
              <X className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
            <DialogHeader className="relative z-10">
              <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ borderColor: `${NIKE_ORANGE}66`, background: `${NIKE_ORANGE}15` }}>
                <Flame className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
                <span className="text-[11px] font-black tracking-widest" style={{ color: NIKE_ORANGE }}>🎁 REGALO GRATIS</span>
              </div>
              <DialogTitle className="text-center text-white text-xl sm:text-2xl font-black leading-tight">
                ¡Espera! ¿Quieres llevar también esta Chaqueta Nike{" "}
                <span style={{ color: NIKE_ORANGE }}>GRATIS</span>?
              </DialogTitle>
            </DialogHeader>
            <div className="relative z-10 mt-4">
              <div className="rounded-2xl overflow-hidden border-2 mb-4" style={{ borderColor: `${NIKE_ORANGE}33` }}>
                <div className="aspect-square relative bg-white">
                  <img src={jacketBlanca} alt="Chaqueta Nike Blanca" className="w-full h-full object-contain" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black" style={{ background: "#22c55e", color: "#fff" }}>
                    🎁 GRATIS
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-sm font-black backdrop-blur-md" style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
                    <span className="text-white/50 line-through text-xs mr-1">$120.000</span>
                    <span style={{ color: "#22c55e" }}>GRATIS</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold text-center">Elige tu talla</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {JACKET_SIZES.map((s) => {
                    const active = jacketSize === s;
                    return (
                      <button key={s} onClick={() => setJacketSize(s)}
                        className="py-2 rounded-lg text-xs font-black transition-all border-2"
                        style={{
                          borderColor: active ? NIKE_ORANGE : "rgba(255,255,255,0.15)",
                          background: active ? NIKE_ORANGE : "transparent",
                          color: active ? "#000" : "#fff",
                          boxShadow: active ? `0 0 12px ${NIKE_ORANGE}88` : "none",
                        }}>{s}</button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Button onClick={() => handleUpsellDecision(true)}
                  className="w-full font-black py-5 rounded-xl text-base"
                  style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`, color: "#fff", boxShadow: `0 8px 24px -4px ${NIKE_ORANGE}` }}>
                  <Check className="w-5 h-5 mr-2" /> SÍ, AGREGAR GRATIS
                </Button>
                <button onClick={() => handleUpsellDecision(false)}
                  className="w-full text-white/50 hover:text-white/80 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1.5">
                  <X className="w-3.5 h-3.5" /> No, gracias. Continuar sin la chaqueta.
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
        <DialogContent className="w-[calc(100vw-16px)] max-w-lg max-h-[90dvh] overflow-y-auto p-0 border-0"
          style={{ background: `linear-gradient(160deg, #1a1a1a, ${BLACK})`, boxShadow: `0 30px 80px ${NIKE_ORANGE}55` }}>
          <div className="relative p-5 sm:p-6" style={{ borderTop: `3px solid ${NIKE_ORANGE}` }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: NIKE_ORANGE }} />
            <DialogHeader className="relative z-10">
              <div className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ borderColor: `${NIKE_ORANGE}66`, background: `${NIKE_ORANGE}15` }}>
                <Ruler className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
                <span className="text-[11px] font-black tracking-widest" style={{ color: NIKE_ORANGE }}>GUÍA DE TALLAS</span>
              </div>
              <DialogTitle className="text-center text-white text-xl font-black">Encuentra tu talla ideal</DialogTitle>
              <p className="text-center text-white/60 text-xs mt-1">Medidas aproximadas en centímetros (cm)</p>
            </DialogHeader>

            <div className="relative z-10 mt-5">
              <div className="mb-5">
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: NIKE_ORANGE }}>👖 Trackpants</div>
                <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${NIKE_ORANGE}33` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${NIKE_ORANGE}22` }}>
                        <th className="py-2 px-2 text-left text-white font-black">Talla</th>
                        <th className="py-2 px-2 text-center text-white font-black">Cintura</th>
                        <th className="py-2 px-2 text-center text-white font-black">Cadera</th>
                        <th className="py-2 px-2 text-center text-white font-black">Largo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_GUIDE.map((row, i) => (
                        <tr key={row.size} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)" }}>
                          <td className="py-2 px-2 font-black" style={{ color: NIKE_ORANGE }}>{row.size}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.cintura}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.cadera}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.largo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-lg p-3 text-[11px] text-white/70 border" style={{ borderColor: `${NIKE_ORANGE}33`, background: `${NIKE_ORANGE}10` }}>
                💡 <strong className="text-white">Tip:</strong> Si estás entre dos tallas, te recomendamos elegir la talla mayor para un fit más cómodo.
              </div>

              <Button onClick={() => setShowSizeGuide(false)}
                className="w-full mt-4 font-black py-5 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`, color: "#fff", boxShadow: `0 8px 24px -4px ${NIKE_ORANGE}` }}>
                <Check className="w-5 h-5 mr-2" /> Entendido
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="relative z-10 bg-background">
        <LegalFooter />
      </div>
    </div>
  );
};

export default JoggerKitsKitPage;
