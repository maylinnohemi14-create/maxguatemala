import { useEffect, useState } from "react";
import { LegalFooter } from "@/components/LegalFooter";
import deportivoVerdeBuzo from "@/assets/deportivo-verde-buzo.webp";

// Lacoste brand palette (used as inline tokens for this scoped futuristic theme)
const LACOSTE_GREEN = "#004526";
const LACOSTE_GREEN_LIGHT = "#00A859";
const LACOSTE_GOLD = "#D4AF37";

type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  image: string;
  link: string;
  badge?: string;
  tags?: string[];
};

// Add your Lacoste products here. Replace image URLs and links as you go.
const products: Product[] = [
  // Example placeholder — substitua/adicione livremente
  // {
  //   id: "lac-polo-kit3",
  //   title: "Kit 3 Polos Lacoste",
  //   subtitle: "Algodón Premium · Edición Limitada",
  //   price: "Q299",
  //   originalPrice: "Q899",
  //   image: "https://...",
  //   link: "/deportivo",
  //   badge: "🔥 Más Vendido",
  //   tags: ["Polo", "Algodón Pima"],
  // },
];

const DeportivoCatalogo = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

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

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, #003820 0%, #001a10 40%, #000805 100%)`,
        transition: "background 0.4s ease-out",
      }}
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${LACOSTE_GREEN_LIGHT}33 1px, transparent 1px), linear-gradient(90deg, ${LACOSTE_GREEN_LIGHT}33 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Floating glow orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse"
        style={{ background: LACOSTE_GREEN_LIGHT }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"
        style={{ background: LACOSTE_GOLD, animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-0 left-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-25 pointer-events-none animate-pulse"
        style={{ background: LACOSTE_GREEN, animationDelay: "2s" }}
      />

      {/* HEADER */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Crocodile-inspired emblem (SVG) */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${LACOSTE_GREEN_LIGHT}, ${LACOSTE_GREEN})`,
                boxShadow: `0 0 20px ${LACOSTE_GREEN_LIGHT}66`,
              }}
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
                <path d="M2 14c2-2 5-3 8-3 2 0 3 .5 4 1l3-2 5 2-3 2c-1 1-3 2-5 2H8c-2 0-4-1-6-2zm5-2c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">Premium Catalogue</div>
              <div
                className="text-xl font-black tracking-tight"
                style={{ color: "white", fontFamily: "Georgia, serif" }}
              >
                LACOSTE <span style={{ color: LACOSTE_GOLD }}>·</span> SPORT
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: LACOSTE_GREEN_LIGHT }} />
            <span className="text-xs text-white/80 font-medium">PAGO CONTRA ENTREGA</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-10 sm:pt-20 sm:pb-16 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border backdrop-blur-md"
          style={{
            borderColor: `${LACOSTE_GOLD}66`,
            background: `${LACOSTE_GOLD}11`,
          }}
        >
          <span style={{ color: LACOSTE_GOLD }} className="text-xs font-bold tracking-widest">
            ✦ COLECCIÓN EXCLUSIVA 2026 ✦
          </span>
        </div>

        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-5"
          style={{ fontFamily: "Georgia, serif" }}
        >
          El estilo del{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${LACOSTE_GREEN_LIGHT} 0%, ${LACOSTE_GOLD} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            cocodrilo
          </span>
          <br />
          en tu armario.
        </h1>
        <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Descubre nuestra selección premium de prendas Lacoste con la calidad y elegancia que solo una marca legendaria puede ofrecer. Pago contra entrega en toda Guatemala.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/80 text-sm">
          {[
            { v: "+2,500", l: "Clientes felices" },
            { v: "4.9★", l: "Calificación" },
            { v: "24-72h", l: "Entrega" },
            { v: "100%", l: "Garantía" },
          ].map((s) => (
            <div key={s.l} className="flex items-baseline gap-2">
              <span
                className="text-2xl font-black"
                style={{ color: LACOSTE_GOLD }}
              >
                {s.v}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/50">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        {products.length === 0 ? (
          <div
            className="rounded-3xl border backdrop-blur-md p-10 sm:p-16 text-center"
            style={{
              borderColor: `${LACOSTE_GREEN_LIGHT}33`,
              background: `linear-gradient(135deg, ${LACOSTE_GREEN}22, transparent)`,
            }}
          >
            <div className="text-6xl mb-4">🐊</div>
            <h2
              className="text-2xl sm:text-3xl font-black text-white mb-3"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Próximamente: Productos Lacoste
            </h2>
            <p className="text-white/60 max-w-md mx-auto text-sm sm:text-base">
              El catálogo está listo para recibir tus productos. Envíame las imágenes y datos de cada Lacoste y los agrego con este mismo estilo futurista.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, idx) => (
              <a
                key={p.id}
                href={p.link}
                className="group relative rounded-3xl overflow-hidden border backdrop-blur-md transition-all duration-500 hover:-translate-y-2"
                style={{
                  borderColor: `${LACOSTE_GREEN_LIGHT}33`,
                  background: `linear-gradient(160deg, ${LACOSTE_GREEN}33, rgba(0,0,0,0.5))`,
                  boxShadow: `0 10px 40px -10px ${LACOSTE_GREEN}aa`,
                  animationDelay: `${idx * 80}ms`,
                }}
              >
                {/* Glow border on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 60px ${LACOSTE_GREEN_LIGHT}55, 0 0 30px ${LACOSTE_GOLD}66`,
                    borderRadius: "1.5rem",
                  }}
                />

                {/* Badge */}
                {p.badge && (
                  <div
                    className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-black backdrop-blur-md border"
                    style={{
                      background: `${LACOSTE_GOLD}dd`,
                      borderColor: LACOSTE_GOLD,
                      color: "#1a1208",
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-black">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 50%, ${LACOSTE_GREEN}cc 100%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                      className="text-lg sm:text-xl font-black text-white leading-tight"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{p.subtitle}</p>

                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-white/40 text-xs line-through">{p.originalPrice}</div>
                      <div
                        className="text-3xl font-black"
                        style={{ color: LACOSTE_GOLD }}
                      >
                        {p.price}
                      </div>
                    </div>
                    {p.tags && (
                      <div className="flex flex-col items-end gap-1">
                        {p.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border text-white/70"
                            style={{ borderColor: `${LACOSTE_GREEN_LIGHT}55` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className="w-full text-center font-black py-3.5 rounded-xl transition-all duration-300 group-hover:tracking-widest text-sm uppercase tracking-wide"
                    style={{
                      background: `linear-gradient(135deg, ${LACOSTE_GREEN_LIGHT}, ${LACOSTE_GREEN})`,
                      color: "white",
                      boxShadow: `0 8px 24px -8px ${LACOSTE_GREEN_LIGHT}`,
                    }}
                  >
                    Comprar ahora →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-6 sm:p-8 border backdrop-blur-md"
          style={{
            borderColor: `${LACOSTE_GOLD}33`,
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            {[
              { i: "🚚", t: "Envío rápido", s: "24-72 horas" },
              { i: "💵", t: "Pago al recibir", s: "Sin adelantos" },
              { i: "🐊", t: "100% Original", s: "Calidad Premium" },
              { i: "🛡️", t: "Garantía total", s: "Cambios fáciles" },
            ].map((item) => (
              <div key={item.t}>
                <div className="text-3xl mb-2">{item.i}</div>
                <div className="font-bold text-sm" style={{ color: LACOSTE_GOLD }}>
                  {item.t}
                </div>
                <div className="text-xs text-white/60 mt-1">{item.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-background">
        <LegalFooter />
      </div>
    </div>
  );
};

export default DeportivoCatalogo;
