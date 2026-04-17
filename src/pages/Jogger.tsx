import { useEffect, useMemo, useRef, useState } from "react";
import { LegalFooter } from "@/components/LegalFooter";
import { CODFormGuatemala } from "@/components/CODFormGuatemala";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackTikTokConversion, trackFacebookConversion, usePagePixels } from "@/hooks/useTrackingPixels";
import { Check, Flame, Shield, Truck, Zap, Sparkles, X } from "lucide-react";

import joggerNegro from "@/assets/jogger-negro.jpg";
import joggerCeleste from "@/assets/jogger-celeste.jpg";
import joggerAzulMarino from "@/assets/jogger-azul-marino.jpg";
import joggerVinotinto from "@/assets/jogger-vinotinto.jpg";
import joggerBlanco from "@/assets/jogger-blanco.jpg";
import joggerAzulRey from "@/assets/jogger-azul-rey.jpg";
import joggerGris from "@/assets/jogger-gris.jpg";
import joggerHueso from "@/assets/jogger-hueso.jpg";
import jacketBlanca from "@/assets/jacket-nike-blanca.jpg";

// Nike-inspired palette (scoped tokens for this futuristic theme)
const NIKE_BLACK = "#0A0A0A";
const NIKE_DARK = "#111111";
const NIKE_ORANGE = "#FF6B00";
const NIKE_RED = "#FA0F00";
const NIKE_WHITE = "#F5F5F5";
const NIKE_GRAY = "#1F1F1F";

const PAGE_ROUTE = "/jogger";
const PRODUCT_ID = "JOGGER-NIKE-GT";
const JACKET_PRICE = 40;
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];

type Color = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

const COLORS: Color[] = [
  { id: "negro", name: "Negro", hex: "#000000", image: joggerNegro },
  { id: "celeste", name: "Celeste", hex: "#A6D8F0", image: joggerCeleste },
  { id: "azul-marino", name: "Azul Marino", hex: "#1A2B4A", image: joggerAzulMarino },
  { id: "vinotinto", name: "Vinotinto", hex: "#7A1F2E", image: joggerVinotinto },
  { id: "blanco", name: "Blanco", hex: "#FFFFFF", image: joggerBlanco },
  { id: "azul-rey", name: "Azul Rey", hex: "#1E5BC6", image: joggerAzulRey },
  { id: "gris", name: "Gris", hex: "#9CA3AF", image: joggerGris },
  { id: "hueso", name: "Hueso", hex: "#EFE7D8", image: joggerHueso },
];

type QtyOption = {
  qty: 1 | 2 | 3;
  price: number;
  label: string;
  highlight?: boolean;
  saving: number;
};

const QTY_OPTIONS: QtyOption[] = [
  { qty: 1, price: 249, label: "1 Pantalón Jogger", saving: 0 },
  { qty: 2, price: 279, label: "2 Pantalones Jogger", saving: 219, highlight: true },
  { qty: 3, price: 299, label: "3 Pantalones Jogger", saving: 448 },
];

const Jogger = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [selectedQty, setSelectedQty] = useState<1 | 2 | 3>(2);
  const [selectedColors, setSelectedColors] = useState<string[]>(["negro", "azul-marino"]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [addJacket, setAddJacket] = useState(false);
  const [jacketSize, setJacketSize] = useState<string>("M");
  const formRef = useRef<HTMLDivElement>(null);

  const { tiktokPixelIds, facebookPixelIds } = usePagePixels(PAGE_ROUTE);

  // Mouse-tracking radial background
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % COLORS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const currentOption = QTY_OPTIONS.find((o) => o.qty === selectedQty)!;
  const basePrice = currentOption.price;
  const finalPrice = basePrice + (addJacket ? JACKET_PRICE : 0);

  const productDisplayName = useMemo(() => {
    const colorsTxt = selectedColors.length > 0
      ? selectedColors.map((id) => COLORS.find((c) => c.id === id)?.name).filter(Boolean).join(", ")
      : "—";
    return `Pantalón Jogger Nike x${selectedQty} (${colorsTxt})`;
  }, [selectedQty, selectedColors]);

  const extraNote = useMemo(() => {
    const parts: string[] = [];
    parts.push(`JOGGER x${selectedQty}`);
    if (selectedColors.length) {
      parts.push(`Colores: ${selectedColors.map((id) => COLORS.find((c) => c.id === id)?.name).filter(Boolean).join(", ")}`);
    }
    if (addJacket) {
      parts.push(`+ JAQUETA NIKE BLANCA Talla ${jacketSize} (Q${JACKET_PRICE})`);
    }
    return parts.join(" | ");
  }, [selectedQty, selectedColors, addJacket, jacketSize]);

  const toggleColor = (id: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(id)) {
        return prev.filter((c) => c !== id);
      }
      if (prev.length >= selectedQty) {
        // Replace the first
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const handleBuyClick = () => {
    if (selectedColors.length === 0) {
      // pick at least 1 color from current carousel
      setSelectedColors([COLORS[selectedImage].id]);
    }
    // Track AddToCart
    trackTikTokConversion(
      "AddToCart",
      {
        contents: [{ content_id: PRODUCT_ID, content_type: "product", content_name: productDisplayName, quantity: selectedQty, price: basePrice }],
        value: basePrice,
        currency: "GTQ",
      },
      tiktokPixelIds[0]
    );
    trackFacebookConversion(
      "AddToCart",
      { content_ids: [PRODUCT_ID], content_type: "product", value: basePrice, currency: "GTQ" },
      facebookPixelIds[0]
    );
    setShowUpsell(true);
  };

  const handleUpsellDecision = (accept: boolean) => {
    setAddJacket(accept);
    setShowUpsell(false);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #181818 0%, #0a0a0a 50%, #000000 100%)`,
        transition: "background 0.4s ease-out",
      }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${NIKE_ORANGE}33 1px, transparent 1px), linear-gradient(90deg, ${NIKE_ORANGE}33 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Floating glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"
        style={{ background: NIKE_ORANGE }}
      />
      <div
        className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"
        style={{ background: NIKE_RED, animationDelay: "1.5s" }}
      />

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
                boxShadow: `0 0 20px ${NIKE_ORANGE}66`,
              }}
            >
              {/* Swoosh-inspired icon */}
              <svg viewBox="0 0 24 12" className="w-7 h-4" fill="white">
                <path d="M24 1.5c-3 5-8.5 9-15 9-3.5 0-6-1-7-2.5C2.5 9 4 8.5 6 8c4-1 9-3 13-5.5 1.5-1 3-2 5-2.5z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">Sport Edition</div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-white">
                JOGGER <span style={{ color: NIKE_ORANGE }}>·</span> PRO
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: NIKE_ORANGE }} />
            <span className="text-xs text-white/80 font-medium">PAGO CONTRA ENTREGA</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-6 pb-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image carousel */}
          <div className="relative">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden border backdrop-blur-md"
              style={{
                borderColor: `${NIKE_ORANGE}55`,
                background: `linear-gradient(160deg, ${NIKE_GRAY}, #000)`,
                boxShadow: `0 20px 60px -20px ${NIKE_ORANGE}aa`,
              }}
            >
              {/* COD ribbon */}
              <div
                className="absolute top-6 -right-12 z-20 w-48 text-center py-1.5 text-[11px] font-black tracking-widest text-white rotate-45"
                style={{
                  background: `linear-gradient(90deg, ${NIKE_RED}, ${NIKE_ORANGE})`,
                  boxShadow: `0 4px 16px ${NIKE_RED}66`,
                }}
              >
                💰 PAGO AL RECIBIR
              </div>

              <img
                src={COLORS[selectedImage].image}
                alt={`Pantalón Jogger Nike ${COLORS[selectedImage].name}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                loading="eager"
                fetchPriority="high"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `linear-gradient(180deg, transparent 60%, #000000cc 100%)` }}
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                  <span className="text-xs font-bold text-white tracking-wide">{COLORS[selectedImage].name}</span>
                </div>
                <div className="flex gap-1.5">
                  {COLORS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      aria-label={`Ver color ${COLORS[i].name}`}
                      className="w-2 h-2 rounded-full transition-all"
                      style={{
                        background: i === selectedImage ? NIKE_ORANGE : "rgba(255,255,255,0.3)",
                        width: i === selectedImage ? "18px" : "8px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-3 grid grid-cols-8 gap-1.5">
              {COLORS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedImage(i)}
                  aria-label={c.name}
                  className="aspect-square rounded-lg overflow-hidden border-2 transition-all"
                  style={{
                    borderColor: i === selectedImage ? NIKE_ORANGE : "rgba(255,255,255,0.1)",
                    boxShadow: i === selectedImage ? `0 0 12px ${NIKE_ORANGE}88` : "none",
                  }}
                >
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Right side – Title + selectors */}
          <div className="text-white">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border backdrop-blur-md"
              style={{ borderColor: `${NIKE_ORANGE}66`, background: `${NIKE_ORANGE}15` }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
              <span className="text-[11px] font-bold tracking-widest" style={{ color: NIKE_ORANGE }}>
                COLECCIÓN PREMIUM 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-[0.95] tracking-tight mb-3">
              Pantalón Jogger
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${NIKE_ORANGE} 0%, ${NIKE_RED} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Estilo Pro
              </span>
            </h1>

            <p className="text-white/70 text-sm sm:text-base mb-5">
              Tejido premium, corte amplio y comodidad para entrenar o vestir casual. Ediciones limitadas con envío rápido a toda Guatemala.
            </p>

            {/* Live viewers */}
            <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-white/80 font-medium">14 personas viendo ahora</span>
            </div>

            {/* QTY OPTIONS */}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-white/60 mb-3 font-bold">
                ✦ Elige tu kit
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {QTY_OPTIONS.map((opt) => {
                  const active = selectedQty === opt.qty;
                  return (
                    <button
                      key={opt.qty}
                      onClick={() => {
                        setSelectedQty(opt.qty);
                        // trim or keep colors
                        setSelectedColors((prev) => prev.slice(0, opt.qty));
                      }}
                      className="relative text-left rounded-2xl p-4 border-2 transition-all overflow-hidden"
                      style={{
                        borderColor: active ? NIKE_ORANGE : "rgba(255,255,255,0.12)",
                        background: active
                          ? `linear-gradient(135deg, ${NIKE_ORANGE}22, ${NIKE_RED}11)`
                          : "rgba(255,255,255,0.03)",
                        boxShadow: active ? `0 0 24px ${NIKE_ORANGE}44` : "none",
                      }}
                    >
                      {opt.highlight && (
                        <div
                          className="absolute top-0 right-0 px-2.5 py-0.5 text-[10px] font-black tracking-wider rounded-bl-xl"
                          style={{ background: NIKE_ORANGE, color: "#000" }}
                        >
                          🔥 MÁS ELEGIDO
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center border-2"
                            style={{
                              borderColor: active ? NIKE_ORANGE : "rgba(255,255,255,0.3)",
                              background: active ? NIKE_ORANGE : "transparent",
                            }}
                          >
                            {active && <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />}
                          </div>
                          <div>
                            <div className="font-bold text-white">{opt.label}</div>
                            {opt.saving > 0 && (
                              <div className="text-[11px] text-white/60">Ahorras Q{opt.saving}</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-black" style={{ color: active ? NIKE_ORANGE : "#fff" }}>
                            Q{opt.price}
                          </div>
                          <div className="text-[10px] text-white/50 uppercase tracking-wider">
                            Q{Math.round(opt.price / opt.qty)} c/u
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLOR SELECTOR */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-white/60 font-bold">
                  ✦ Elige {selectedQty === 1 ? "tu color" : `tus ${selectedQty} colores`}
                </div>
                <div className="text-[11px] text-white/50">
                  {selectedColors.length}/{selectedQty}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map((c) => {
                  const active = selectedColors.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleColor(c.id)}
                      className="relative rounded-xl overflow-hidden border-2 transition-all aspect-square group"
                      style={{
                        borderColor: active ? NIKE_ORANGE : "rgba(255,255,255,0.12)",
                        boxShadow: active ? `0 0 16px ${NIKE_ORANGE}88` : "none",
                      }}
                    >
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" loading="lazy" />
                      <div
                        className="absolute inset-0 transition-opacity"
                        style={{
                          background: active
                            ? `linear-gradient(180deg, transparent 50%, ${NIKE_ORANGE}cc 100%)`
                            : `linear-gradient(180deg, transparent 60%, #000000cc 100%)`,
                        }}
                      />
                      <div className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white text-center leading-tight">
                        {c.name}
                      </div>
                      {active && (
                        <div
                          className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ background: NIKE_ORANGE }}
                        >
                          <Check className="w-3 h-3 text-black" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Button
              onClick={handleBuyClick}
              size="lg"
              className="w-full text-base sm:text-lg font-black py-6 sm:py-7 rounded-2xl tracking-wider transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
                color: "#fff",
                boxShadow: `0 12px 32px -8px ${NIKE_ORANGE}, inset 0 1px 0 ${NIKE_WHITE}33`,
              }}
            >
              <Flame className="w-5 h-5 mr-2" />
              COMPRAR AHORA — Q{basePrice}
            </Button>

            {/* Trust mini-row */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[
                { i: <Truck className="w-4 h-4" />, t: "Envío 24-72h" },
                { i: <Shield className="w-4 h-4" />, t: "Garantía total" },
                { i: <Zap className="w-4 h-4" />, t: "Pago al recibir" },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 py-2.5 rounded-lg border border-white/10 bg-white/5"
                >
                  <span style={{ color: NIKE_ORANGE }}>{t.i}</span>
                  <span className="text-[10px] text-white/70 font-medium">{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      {showForm && (
        <section
          ref={formRef}
          className="relative z-10 max-w-3xl mx-auto px-4 pb-16"
        >
          <div
            className="rounded-3xl p-4 sm:p-8 border backdrop-blur-md"
            style={{
              borderColor: `${NIKE_ORANGE}55`,
              background: `linear-gradient(160deg, rgba(255,255,255,0.97), rgba(245,245,245,0.97))`,
              boxShadow: `0 20px 60px -10px ${NIKE_ORANGE}88`,
            }}
          >
            <div className="text-center mb-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                style={{ background: `${NIKE_ORANGE}22`, border: `1px solid ${NIKE_ORANGE}55` }}
              >
                <span style={{ color: NIKE_RED }} className="text-xs font-bold tracking-widest">
                  ✦ ÚLTIMO PASO ✦
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black">Completa tus datos</h2>
              <p className="text-sm text-black/60 mt-1">Tu pedido llegará en 24-72h. Pagas al recibir.</p>
            </div>

            <CODFormGuatemala
              productId={PRODUCT_ID}
              productPrice={finalPrice}
              productName={productDisplayName}
              productDisplayName={productDisplayName + (addJacket ? ` + Jaqueta Nike Talla ${jacketSize}` : "")}
              productImage={COLORS.find((c) => c.id === selectedColors[0])?.image || COLORS[0].image}
              tiktokPixelId={tiktokPixelIds[0]}
              facebookPixelId={facebookPixelIds[0]}
              extraNote={extraNote}
              promoMessage={`¡PROMOCIÓN! ${selectedQty} Pantalón(es) Jogger Nike por solo Q${basePrice}${addJacket ? ` + Chaqueta Q${JACKET_PRICE}` : ""}.`}
              includedItems={[
                { id: "warranty", icon: "🛡️", title: "Garantía 30 días", description: "Cambios y devoluciones gratis" },
              ]}
            />
          </div>
        </section>
      )}

      {/* UPSELL DIALOG */}
      <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
        <DialogContent
          className="w-[calc(100vw-16px)] max-w-md p-0 overflow-hidden border-0"
          style={{
            background: `linear-gradient(160deg, ${NIKE_DARK}, ${NIKE_BLACK})`,
            boxShadow: `0 30px 80px ${NIKE_ORANGE}55`,
          }}
        >
          <div
            className="relative p-5 sm:p-6"
            style={{
              borderTop: `3px solid ${NIKE_ORANGE}`,
            }}
          >
            {/* Glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: NIKE_ORANGE }}
            />

            {/* Neon close button (custom — overlays the default one) */}
            <button
              type="button"
              onClick={() => setShowUpsell(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-pulse"
              style={{
                background: `radial-gradient(circle, ${NIKE_ORANGE} 0%, ${NIKE_RED} 100%)`,
                boxShadow: `0 0 16px ${NIKE_ORANGE}, 0 0 32px ${NIKE_ORANGE}99, 0 0 48px ${NIKE_RED}66, inset 0 0 8px rgba(255,255,255,0.3)`,
                border: `2px solid ${NIKE_WHITE}`,
              }}
            >
              <X className="w-5 h-5 text-white" strokeWidth={3} />
            </button>

            <DialogHeader className="relative z-10">
              <div
                className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ borderColor: `${NIKE_ORANGE}66`, background: `${NIKE_ORANGE}15` }}
              >
                <Flame className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
                <span className="text-[11px] font-black tracking-widest" style={{ color: NIKE_ORANGE }}>
                  OFERTA EXCLUSIVA
                </span>
              </div>
              <DialogTitle className="text-center text-white text-xl sm:text-2xl font-black leading-tight">
                ¡Espera! ¿Quieres llevar también esta Jaqueta Nike por solo{" "}
                <span style={{ color: NIKE_ORANGE }}>Q{JACKET_PRICE}</span>?
              </DialogTitle>
            </DialogHeader>

            <div className="relative z-10 mt-4">
              <div
                className="rounded-2xl overflow-hidden border-2 mb-4"
                style={{ borderColor: `${NIKE_ORANGE}33` }}
              >
                <div className="aspect-square relative bg-white">
                  <img
                    src={jacketBlanca}
                    alt="Jaqueta Nike Blanca"
                    className="w-full h-full object-contain"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black"
                    style={{ background: NIKE_ORANGE, color: "#000" }}
                  >
                    -85% OFF
                  </div>
                  <div
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-sm font-black backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}
                  >
                    <span className="text-white/50 line-through text-xs mr-1">Q280</span>
                    <span style={{ color: NIKE_ORANGE }}>Q{JACKET_PRICE}</span>
                  </div>
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold text-center">
                  Elige tu talla
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {SIZES.map((s) => {
                    const active = jacketSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setJacketSize(s)}
                        className="py-2 rounded-lg text-xs font-black transition-all border-2"
                        style={{
                          borderColor: active ? NIKE_ORANGE : "rgba(255,255,255,0.15)",
                          background: active ? NIKE_ORANGE : "transparent",
                          color: active ? "#000" : "#fff",
                          boxShadow: active ? `0 0 12px ${NIKE_ORANGE}88` : "none",
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={() => handleUpsellDecision(true)}
                  className="w-full font-black py-5 rounded-xl text-base"
                  style={{
                    background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
                    color: "#fff",
                    boxShadow: `0 8px 24px -4px ${NIKE_ORANGE}`,
                  }}
                >
                  <Check className="w-5 h-5 mr-2" />
                  SÍ, AGREGAR POR Q{JACKET_PRICE}
                </Button>
                <button
                  onClick={() => handleUpsellDecision(false)}
                  className="w-full text-white/50 hover:text-white/80 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  No, gracias. Continuar sin la jaqueta.
                </button>
              </div>
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

export default Jogger;
