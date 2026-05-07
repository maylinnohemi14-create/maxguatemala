import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import { CODFormGuatemala } from "@/components/CODFormGuatemala";
import { Button } from "@/components/ui/button";
import { trackTikTokConversion, trackFacebookConversion, usePagePixels } from "@/hooks/useTrackingPixels";
import { Check, Heart, Shield, Truck, Sparkles, Star, ChevronLeft, ShoppingBag, CreditCard, Ruler, Gift, X, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import regaloVestido from "@/assets/regalo-vestido.webp";

// Feminine futuristic palette
const PINK = "#E91E8C";
const ROSE = "#F472B6";
const PURPLE = "#A855F7";
const DARK = "#111111";
const BLACK = "#0A0A0A";
const WHITE = "#F5F5F5";

const PAGE_ROUTE = "/vestidosgt";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const REGALO_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SIZE_GUIDE = [
  { size: "XS", busto: "80-84", cintura: "60-64", cadera: "86-90", largo: "85" },
  { size: "S", busto: "84-88", cintura: "64-68", cadera: "90-94", largo: "87" },
  { size: "M", busto: "88-92", cintura: "68-72", cadera: "94-98", largo: "89" },
  { size: "L", busto: "92-98", cintura: "72-78", cadera: "98-104", largo: "91" },
  { size: "XL", busto: "98-104", cintura: "78-84", cadera: "104-110", largo: "93" },
  { size: "XXL", busto: "104-112", cintura: "84-92", cadera: "110-118", largo: "95" },
];

interface ProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  color?: string;
  category?: string;
}

const ALL_PRODUCTS: ProductData[] = [
  { id: "vestido-dulsura", slug: "dulsura", name: "Vestido Dulsura", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00089-c18e3b57329816fe5a17770970828377-640-0.webp", badge: "🌸 DÍA DE LAS MADRES", color: "Rosa", category: "Elegante" },
  { id: "vestido-mia", slug: "mia", name: "Vestido Mía", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00136-1ea060f31f6b445e3417776865361963-640-0.webp", badge: "🌸 DÍA DE LAS MADRES", color: "Azul", category: "Elegante" },
  { id: "vestido-sara", slug: "sara", name: "Vestido Corto Sara", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00171-2b7384c79c28aa1e2617777044233691-640-0.webp", badge: "NUEVO", color: "Azul", category: "Casual" },
  { id: "vestido-imperial-scarlet", slug: "imperial-scarlet", name: "Vestido Imperial Scarlet", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-04-03-12-bed4fc770309ed1f4a17635075297197-640-0.webp", badge: "MÁS VENDIDO", color: "Rojo", category: "Elegante" },
  { id: "vestido-imperial", slug: "imperial", name: "Vestido Imperial", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-09-10-03-36-02-35f17e814f9bc7d86d17575440436127-640-0.webp", badge: "EXCLUSIVO", color: "Beige", category: "Elegante" },
  { id: "vestido-zera", slug: "zera", name: "Vestido Zera", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-06-55-40-1f8cadd102168c016617635179479404-640-0.webp", badge: "PREMIUM", color: "Beige", category: "Casual" },
  { id: "vestido-aurora", slug: "aurora", name: "Vestido Aurora", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-10-19-10-39-15-9ffaf49c27894eef8217612026247943-640-0.webp", badge: "TOP VENTAS", color: "Beige", category: "Elegante" },
  { id: "vestido-fancy", slug: "fancy", name: "Vestido Fancy", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00103-c0dc02ba12956ed05317770977107067-640-0.webp", badge: "NUEVO", color: "Beige", category: "Fiesta" },
  { id: "vestido-elda-rosa", slug: "elda-rosa", name: "Vestido Elda Rosa", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00099-69c143aa02b0b2809717770963882904-640-0.webp", color: "Rosa", category: "Casual" },
  { id: "vestido-calma", slug: "calma", name: "Vestido Calma", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00022-4bbe1c8a65f6338c8f17763715319007-640-0.webp", color: "Beige", category: "Casual" },
  { id: "vestido-ariana", slug: "ariana", name: "Vestido Ariana", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00029-54b95152ce7c6b50aa17763712028554-640-0.webp", badge: "FLORAL", color: "Floral", category: "Casual" },
  { id: "vestido-petra", slug: "petra", name: "Vestido Petra", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00010-1dfc13f9cf5f7d17cb17763699660920-640-0.webp", color: "Beige", category: "Elegante" },
  { id: "vestido-londres", slug: "londres", name: "Vestido Londres", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00058-db82bb2094b8c9d4ac17763674057324-640-0.webp", badge: "ELEGANTE", color: "Violeta", category: "Fiesta" },
  { id: "vestido-delicadeza-rosa", slug: "delicadeza-rosa", name: "Vestido Delicadeza Rosa", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00056-6d7578b9d97cb8f56f17763671549975-640-0.webp", color: "Rosa", category: "Casual" },
  { id: "conjunto-bordado-flora", slug: "bordado-flora", name: "Conjunto Bordado Flora", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00079-503a52550cf09eb5b817763665595232-640-0.webp", badge: "BORDADO", color: "Floral", category: "Elegante" },
  { id: "vestido-mantequilla", slug: "mantequilla", name: "Vestido Mantequilla", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00008-918923f8d125ad365317733855065658-640-0.webp", color: "Amarillo", category: "Casual" },
  { id: "vestido-delicadeza", slug: "delicadeza", name: "Vestido Delicadeza", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00023-c3eb8abf96a4a7d17317733851168648-640-0.webp", badge: "ELEGANTE", color: "Beige", category: "Elegante" },
  { id: "vestido-rosas", slug: "rosas", name: "Vestido Rosas", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00032-346078d3c3b099336c17733849455091-640-0.webp", color: "Rosa", category: "Casual" },
  { id: "vestido-primavera-encantada", slug: "primavera-encantada", name: "Vestido Primavera Encantada", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00018-8c6bc97c376766631a17733845849206-640-0.webp", badge: "NUEVO", color: "Verde Pastel", category: "Casual" },
  { id: "vestido-encanto", slug: "encanto", name: "Vestido Encanto", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00021-bf4c48275e383a9cba17733842661665-640-0.webp", color: "Rosa", category: "Fiesta" },
  { id: "vestido-oliva", slug: "oliva", name: "Vestido Oliva", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2026-01-16-06-20-21-837519d45f009cab7d17686857300095-640-0.webp", badge: "NATURAL", color: "Verde", category: "Casual" },
  { id: "vestido-ivory", slug: "ivory", name: "Vestido Ivory", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-23-04-08-04-d20fce37b1dcf060c317639473675389-640-0.webp", color: "Beige", category: "Elegante" },
  { id: "vestido-terra", slug: "terra", name: "Vestido Terra", price: 259, originalPrice: 599, image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-04-01-45-55-9d5a791a4098a6dd3417630279649919-640-0.webp", badge: "CLÁSICO", color: "Negro", category: "Fiesta" },
];

const VestidoProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState("M");
  const [showForm, setShowForm] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showRegalo, setShowRegalo] = useState(false);
  const [addRegalo, setAddRegalo] = useState(false);
  const [regaloSize, setRegaloSize] = useState("M");
  const [qty, setQty] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

  const { tiktokPixelIds, facebookPixelIds } = usePagePixels(PAGE_ROUTE);

  const product = ALL_PRODUCTS.find((p) => p.slug === slug);

  // Suggested products (different from current)
  const suggestions = useMemo(() => {
    if (!product) return [];
    return ALL_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);
  }, [slug, product]);

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

  if (!product) {
    return <Navigate to="/vestidosgt" replace />;
  }

  const totalPrice = product.price * qty;
  const productDisplayName = `${product.name} x${qty}`;
  const extraNote = `${product.name} | Talla: ${selectedSize} | Cantidad: ${qty} | Color: ${product.color || "Único"}${addRegalo ? ` | 🎁 REGALO Vestido Blanco Encaje (Talla: ${regaloSize}) GRATIS` : ""}`;

  const goToForm = () => {
    setShowRegalo(false);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const handleRegaloDecision = (accept: boolean) => {
    setAddRegalo(accept);
    goToForm();
  };

  const handleRegaloClose = () => {
    setAddRegalo(false);
    goToForm();
  };

  const handleBuyClick = () => {
    trackTikTokConversion(
      "AddToCart",
      {
        contents: [{ content_id: product.id, content_type: "product", content_name: product.name, quantity: qty, price: totalPrice }],
        value: totalPrice,
        currency: "GTQ",
      },
      undefined
    );
    trackFacebookConversion(
      "AddToCart",
      { content_ids: [product.id], content_type: "product", value: totalPrice, currency: "GTQ" },
      undefined
    );
    setShowRegalo(true);
  };

  return (
    <div
      className="min-h-screen relative overflow-x-clip"
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #1a1020 0%, #0d0a10 50%, #050308 100%)`,
        transition: "background 0.4s ease-out",
      }}
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${PINK}33 1px, transparent 1px), linear-gradient(90deg, ${PINK}33 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ background: PINK }} />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none animate-pulse" style={{ background: PURPLE, animationDelay: "1.5s" }} />

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/vestidosgt" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                boxShadow: `0 0 20px ${PINK}66`,
              }}
            >
              <span className="text-white font-black text-sm">M</span>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Colección Premium</div>
              <div className="text-base sm:text-lg font-black tracking-tight text-white">
                MAX <span style={{ color: ROSE }}>·</span> Guatemala
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ROSE }} />
            <span className="text-xs text-white/80 font-medium">PAGO CONTRA ENTREGA</span>
          </div>
        </div>
      </header>

      {/* PRODUCT HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-6 pb-10 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Image */}
          <div className="relative">
            <div
              className="relative aspect-[3/4] rounded-3xl overflow-hidden border backdrop-blur-md"
              style={{
                borderColor: `${PINK}55`,
                background: `linear-gradient(160deg, #1a1020, #050308)`,
                boxShadow: `0 20px 60px -20px ${PINK}aa`,
              }}
            >
              {/* COD ribbon */}
              <div
                className="absolute top-6 -right-12 z-20 w-48 text-center py-1.5 text-[11px] font-black tracking-widest text-white rotate-45"
                style={{
                  background: `linear-gradient(90deg, ${PURPLE}, ${PINK})`,
                  boxShadow: `0 4px 16px ${PINK}66`,
                }}
              >
                💰 PAGO AL RECIBIR
              </div>

              {product.badge && (
                <div
                  className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[11px] font-black tracking-wider"
                  style={{ background: PINK, color: "#fff" }}
                >
                  {product.badge}
                </div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 60%, #000000cc 100%)" }} />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20">
                  <span className="text-xs font-bold text-white tracking-wide">{product.color || "Único"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side – product details */}
          <div className="text-white">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border backdrop-blur-md"
              style={{ borderColor: `${PINK}66`, background: `${PINK}15` }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: ROSE }} />
              <span className="text-[11px] font-bold tracking-widest" style={{ color: ROSE }}>
                COLECCIÓN EXCLUSIVA 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-[0.95] tracking-tight mb-3">
              {product.name.split(" ").slice(0, -1).join(" ")}
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${PINK} 0%, ${PURPLE} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {product.name.split(" ").slice(-1)[0]}
              </span>
            </h1>

            <p className="text-white/60 text-sm sm:text-base mb-5">
              Vestido premium con diseño exclusivo. Tela de alta calidad, corte elegante y acabado impecable. Envío gratis a toda Guatemala.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-white/50">(4.9) · 127 ventas</span>
            </div>

            {/* Live viewers */}
            <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-white/80 font-medium">{Math.floor(Math.random() * 4) + 12} personas viendo ahora</span>
            </div>

            {/* Price */}
            <div className="mb-6 p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-4xl font-black" style={{ color: ROSE }}>Q{product.price}</span>
                <span className="text-lg text-white/30 line-through">Q{product.originalPrice}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-[11px] font-black"
                  style={{ background: `${PINK}33`, color: ROSE }}
                >
                  -50%
                </span>
              </div>
              <p className="text-xs text-white/40">Precio especial por tiempo limitado</p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <div className="text-xs uppercase tracking-widest text-white/50 mb-3 font-bold">
                ✦ Cantidad
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all hover:scale-105"
                  style={{
                    borderColor: `${PINK}66`,
                    background: `${PINK}15`,
                    color: ROSE,
                  }}
                >
                  −
                </button>
                <div
                  className="w-14 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black"
                  style={{
                    borderColor: PINK,
                    background: `linear-gradient(135deg, ${PINK}22, ${PURPLE}11)`,
                    color: ROSE,
                    boxShadow: `0 0 16px ${PINK}33`,
                  }}
                >
                  {qty}
                </div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all hover:scale-105"
                  style={{
                    borderColor: `${PINK}66`,
                    background: `${PINK}15`,
                    color: ROSE,
                  }}
                >
                  +
                </button>
                <span className="text-sm text-white/40 ml-2">
                  Q{totalPrice}
                </span>
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs uppercase tracking-widest text-white/50 font-bold">
                  ✦ Talla
                </div>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all hover:scale-105"
                  style={{ borderColor: `${PINK}88`, background: `${PINK}15`, color: ROSE }}
                >
                  <Ruler className="w-3 h-3" />
                  Guía de Tallas
                </button>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {SIZES.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className="py-2.5 rounded-lg text-xs font-black transition-all border-2"
                      style={{
                        borderColor: active ? PINK : "rgba(255,255,255,0.12)",
                        background: active ? PINK : "transparent",
                        color: active ? "#fff" : "#fff",
                        boxShadow: active ? `0 0 12px ${PINK}88` : "none",
                      }}
                    >
                      {s}
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
                background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                color: "#fff",
                boxShadow: `0 12px 32px -8px ${PINK}, inset 0 1px 0 ${WHITE}33`,
              }}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              COMPRAR AHORA — Q{totalPrice}
            </Button>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              {[
                { i: <Truck className="w-4 h-4" />, t: "Envío Gratis" },
                { i: <Shield className="w-4 h-4" />, t: "Garantía Total" },
                { i: <CreditCard className="w-4 h-4" />, t: "Pago al Recibir" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center gap-1 py-2.5 rounded-lg border border-white/10 bg-white/5">
                  <span style={{ color: ROSE }}>{t.i}</span>
                  <span className="text-[10px] text-white/70 font-medium">{t.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      {showForm && (
        <section ref={formRef} className="relative z-10 max-w-3xl mx-auto px-4 pb-16">
          <div
            className="rounded-3xl p-4 sm:p-8 border backdrop-blur-md"
            style={{
              borderColor: `${PINK}55`,
              background: "linear-gradient(160deg, rgba(255,255,255,0.97), rgba(245,245,245,0.97))",
              boxShadow: `0 20px 60px -10px ${PINK}88`,
            }}
          >
            {/* Mother's Day promo */}
            <div
              className="mb-4 p-3 rounded-xl text-center"
              style={{ background: `linear-gradient(135deg, ${PINK}12, ${PURPLE}08)`, border: `1px solid ${PINK}33` }}
            >
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-4 h-4" style={{ color: PINK }} />
                <span className="text-sm font-bold" style={{ color: PINK }}>
                  🌸 Especial Día de las Madres 🌸
                </span>
              </div>
              <p className="text-[11px] text-black/50 mt-1">
                Precio exclusivo hasta el <span className="font-bold" style={{ color: PINK }}>10 de mayo</span>
              </p>
            </div>

            <div className="text-center mb-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                style={{ background: `${PINK}22`, border: `1px solid ${PINK}55` }}
              >
                <span style={{ color: PINK }} className="text-xs font-bold tracking-widest">
                  ✦ ÚLTIMO PASO ✦
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-black">Completa tus datos</h2>
              <p className="text-sm text-black/60 mt-1">Tu pedido llegará en 24-72h. Pagas al recibir.</p>
            </div>

            <CODFormGuatemala
              productId="6441"
              productPrice={totalPrice}
              productName={productDisplayName}
              productDisplayName={productDisplayName}
              productImage={product.image}
              tiktokPixelIds={tiktokPixelIds}
              facebookPixelIds={facebookPixelIds}
              extraNote={extraNote}
              promoMessage={`¡OFERTA! ${product.name} por solo Q${totalPrice}. Envío gratis.`}
              includedItems={[
                { id: "warranty", icon: "🛡️", title: "Garantía 30 días", description: "Cambios y devoluciones gratis" },
              ]}
            />
          </div>
        </section>
      )}

      {/* SUGGESTIONS */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">✦ También te puede gustar</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Más Estilos <span style={{ color: ROSE }}>Exclusivos</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {suggestions.map((p) => (
            <Link
              key={p.slug}
              to={`/vestidosgt/${p.slug}`}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur transition-all hover:border-pink-500/40 hover:shadow-lg"
              style={{ boxShadow: "none" }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black" style={{ color: ROSE }}>Q{p.price}</span>
                  <span className="text-xs text-white/30 line-through">Q{p.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* REGALO DÍA DE LAS MADRES DIALOG */}
      <Dialog open={showRegalo} onOpenChange={(open) => { if (!open) handleRegaloClose(); }}>
        <DialogContent
          className="w-[calc(100vw-16px)] max-w-md p-0 overflow-hidden border-0 max-h-[95dvh] overflow-y-auto"
          style={{
            background: `linear-gradient(160deg, #1a1020, ${BLACK})`,
            boxShadow: `0 30px 80px ${PINK}55`,
          }}
        >
          <div
            className="relative p-4 sm:p-6"
            style={{ borderTop: `3px solid ${PINK}` }}
          >
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: PINK }}
            />

            {/* Close button — visible, high z-index */}
            <button
              type="button"
              onClick={handleRegaloClose}
              aria-label="Cerrar"
              className="absolute top-2 right-2 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                boxShadow: `0 0 12px ${PINK}`,
                border: `2px solid rgba(255,255,255,0.8)`,
              }}
            >
              <X className="w-4 h-4 text-white" strokeWidth={3} />
            </button>

            <DialogHeader className="relative z-10">
              <div
                className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full mb-2 border"
                style={{ borderColor: `${PINK}66`, background: `${PINK}15` }}
              >
                <Gift className="w-3.5 h-3.5" style={{ color: PINK }} />
                <span className="text-[10px] sm:text-[11px] font-black tracking-widest" style={{ color: PINK }}>
                  🌸 REGALO DÍA DE LAS MADRES 🌸
                </span>
              </div>
              <DialogTitle className="text-center text-white text-lg sm:text-2xl font-black leading-tight">
                ¡Sorprende a Mamá! Lleva este Vestido de Encaje{" "}
                <span style={{ color: ROSE }}>GRATIS</span> 🎁
              </DialogTitle>
              <p className="text-center text-white/50 text-[11px] sm:text-xs mt-1">
                Promoción especial por el <span className="font-bold" style={{ color: ROSE }}>Día de las Madres</span> — Solo por tiempo limitado
              </p>
            </DialogHeader>

            <div className="relative z-10 mt-3">
              <div
                className="rounded-2xl overflow-hidden border-2 mb-3"
                style={{ borderColor: `${PINK}33` }}
              >
                <div className="aspect-square relative bg-white">
                  <img
                    src={regaloVestido}
                    alt="Vestido Blanco de Encaje — Regalo Día de las Madres"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black"
                    style={{ background: PINK, color: "#fff" }}
                  >
                    🎁 REGALO GRATIS
                  </div>
                  <div
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full text-sm font-black backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}
                  >
                    <span className="text-white/50 line-through text-xs mr-1">Q499</span>
                    <span style={{ color: ROSE }}>GRATIS</span>
                  </div>
                  <div
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.7)", color: ROSE }}
                  >
                    🌸 Día de las Madres
                  </div>
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-3">
                <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2 font-bold text-center">
                  Elige la talla del regalo
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {REGALO_SIZES.map((s) => {
                    const active = regaloSize === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setRegaloSize(s)}
                        className="py-2 rounded-lg text-xs font-black transition-all border-2"
                        style={{
                          borderColor: active ? PINK : "rgba(255,255,255,0.15)",
                          background: active ? PINK : "transparent",
                          color: "#fff",
                          boxShadow: active ? `0 0 12px ${PINK}88` : "none",
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
                  onClick={() => handleRegaloDecision(true)}
                  className="w-full font-black py-5 rounded-xl text-sm sm:text-base"
                  style={{
                    background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                    color: "#fff",
                    boxShadow: `0 8px 24px -4px ${PINK}`,
                  }}
                >
                  <Gift className="w-5 h-5 mr-2" />
                  SÍ, ¡QUIERO MI REGALO GRATIS!
                </Button>
                <button
                  onClick={() => handleRegaloDecision(false)}
                  className="w-full text-white/50 hover:text-white/80 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  No, gracias. Continuar sin el regalo.
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SIZE GUIDE DIALOG */}
      <Dialog open={showSizeGuide} onOpenChange={setShowSizeGuide}>
        <DialogContent
          className="w-[calc(100vw-16px)] max-w-lg max-h-[90dvh] overflow-y-auto p-0 border-0"
          style={{
            background: `linear-gradient(160deg, #1a1020, ${BLACK})`,
            boxShadow: `0 30px 80px ${PINK}55`,
          }}
        >
          <div className="relative p-5 sm:p-6" style={{ borderTop: `3px solid ${PINK}` }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: PINK }} />

            <DialogHeader className="relative z-10">
              <div
                className="inline-flex self-center items-center gap-2 px-3 py-1 rounded-full mb-3 border"
                style={{ borderColor: `${PINK}66`, background: `${PINK}15` }}
              >
                <Ruler className="w-3.5 h-3.5" style={{ color: ROSE }} />
                <span className="text-[11px] font-black tracking-widest" style={{ color: ROSE }}>
                  GUÍA DE TALLAS
                </span>
              </div>
              <DialogTitle className="text-center text-white text-xl font-black">
                Encuentra tu talla ideal
              </DialogTitle>
              <p className="text-center text-white/60 text-xs mt-1">Medidas aproximadas en centímetros (cm)</p>
            </DialogHeader>

            <div className="relative z-10 mt-5">
              <div className="mb-5">
                <div className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: ROSE }}>
                  👗 Vestido
                </div>
                <div className="rounded-xl overflow-hidden border" style={{ borderColor: `${PINK}33` }}>
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ background: `${PINK}22` }}>
                        <th className="py-2 px-2 text-left text-white font-black">Talla</th>
                        <th className="py-2 px-2 text-center text-white font-black">Busto</th>
                        <th className="py-2 px-2 text-center text-white font-black">Cintura</th>
                        <th className="py-2 px-2 text-center text-white font-black">Cadera</th>
                        <th className="py-2 px-2 text-center text-white font-black">Largo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SIZE_GUIDE.map((row, i) => (
                        <tr key={row.size} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)" }}>
                          <td className="py-2 px-2 font-black" style={{ color: ROSE }}>{row.size}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.busto}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.cintura}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.cadera}</td>
                          <td className="py-2 px-2 text-center text-white/80">{row.largo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="rounded-lg p-3 text-[11px] text-white/70 border"
                style={{ borderColor: `${PINK}33`, background: `${PINK}10` }}
              >
                💡 <strong className="text-white">Tip:</strong> Si estás entre dos tallas, te recomendamos elegir la talla mayor para un fit más cómodo.
              </div>

              <Button
                onClick={() => setShowSizeGuide(false)}
                className="w-full mt-4 font-black py-5 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${PINK}, ${PURPLE})`,
                  color: "#fff",
                  boxShadow: `0 8px 24px -4px ${PINK}`,
                }}
              >
                <Check className="w-5 h-5 mr-2" />
                Entendido
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

export default VestidoProductPage;
