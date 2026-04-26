import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Truck, Flame, Zap } from "lucide-react";

import linoBeige from "@/assets/lino-beige.jpg";
import linoVerde from "@/assets/lino-verde.jpg";
import linoNegro from "@/assets/lino-negro.jpg";

const TARGET_ROUTE = "/elegancia";

// Paleta futurista (mesma vibe da /elegancia)
const C = {
  black: "#0A0A0A",
  dark: "#111111",
  gray: "#1F1F1F",
  white: "#F5F5F5",
  orange: "#FF6B00",
  red: "#FA0F00",
};

const OfertaEspecial = () => {
  const navigate = useNavigate();
  const goToOffer = () => navigate(TARGET_ROUTE);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: C.black, color: C.white }}
    >
      {/* Glow / grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 20% 10%, ${C.orange}22 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, ${C.red}22 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${C.white} 1px, transparent 1px), linear-gradient(90deg, ${C.white} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 border-b"
        style={{ borderColor: "#ffffff14" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
              }}
            >
              <Zap className="w-4 h-4" style={{ color: C.white }} />
            </div>
            <span className="font-extrabold tracking-[0.2em] text-sm">
              TRENDS · 2026
            </span>
          </div>
          <span
            className="hidden sm:inline-block text-[10px] uppercase tracking-[0.3em] px-3 py-1 rounded-full"
            style={{
              border: `1px solid ${C.orange}66`,
              color: C.orange,
            }}
          >
            Edición Limitada
          </span>
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
        <section className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="order-2 md:order-1">
            <div
              className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                background: `${C.orange}1a`,
                border: `1px solid ${C.orange}55`,
                color: C.orange,
              }}
            >
              <Flame className="w-3.5 h-3.5" />
              Lo más buscado del mes
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-5 tracking-tight">
              REDEFINE TU{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ESTILO
              </span>
            </h1>

            <p
              className="text-base md:text-lg mb-8 leading-relaxed max-w-lg"
              style={{ color: "#cfcfcf" }}
            >
              La nueva generación en moda masculina. Diseño futurista,
              comodidad premium y una propuesta que está marcando tendencia
              esta temporada.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={goToOffer}
                className="group relative overflow-hidden px-8 py-4 rounded-xl font-black text-base uppercase tracking-wider transition-transform active:scale-95 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
                  color: C.white,
                  boxShadow: `0 10px 30px -10px ${C.orange}80`,
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver Oferta
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button
                onClick={goToOffer}
                className="px-8 py-4 rounded-xl font-bold text-base uppercase tracking-wider transition-colors"
                style={{
                  background: "transparent",
                  color: C.white,
                  border: `1px solid ${C.white}33`,
                }}
              >
                Conocer más
              </button>
            </div>

            <div className="flex flex-wrap gap-5 text-sm" style={{ color: "#a8a8a8" }}>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" style={{ color: C.orange }} />
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" style={{ color: C.orange }} />
                <span>Envío a todo el país</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: C.orange }} />
                <span>Edición limitada</span>
              </div>
            </div>
          </div>

          {/* Visual lateral */}
          <div className="order-1 md:order-2 relative">
            <div
              className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background: `linear-gradient(135deg, ${C.orange}55, ${C.red}55)`,
              }}
            />
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: `1px solid ${C.white}1f`,
                boxShadow: `0 30px 60px -20px #000000aa`,
              }}
            >
              <img
                src={linoBeige}
                alt="Nueva tendencia en moda masculina"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              <div
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                style={{
                  background: C.black,
                  color: C.orange,
                  border: `1px solid ${C.orange}66`,
                }}
              >
                Nuevo
              </div>
            </div>
          </div>
        </section>

        {/* Galería / pilares */}
        <section className="mt-20 grid md:grid-cols-3 gap-5">
          {[
            {
              img: linoNegro,
              title: "DISEÑO",
              text: "Líneas modernas y acabado premium para destacar en cada momento.",
            },
            {
              img: linoVerde,
              title: "COMODIDAD",
              text: "Telas frescas y ligeras pensadas para el clima cálido.",
            },
            {
              img: linoBeige,
              title: "TENDENCIA",
              text: "El estilo favorito de la temporada, con stock limitado.",
            },
          ].map((card) => (
            <article
              key={card.title}
              onClick={goToOffer}
              className="group cursor-pointer rounded-2xl overflow-hidden transition-transform hover:-translate-y-1"
              style={{
                background: C.dark,
                border: `1px solid ${C.white}14`,
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 40%, ${C.black} 100%)`,
                  }}
                />
              </div>
              <div className="p-5">
                <h3
                  className="text-lg font-black tracking-wider mb-2"
                  style={{ color: C.white }}
                >
                  {card.title}
                </h3>
                <p className="text-sm" style={{ color: "#a8a8a8" }}>
                  {card.text}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* CTA final futurista */}
        <section className="mt-20">
          <div
            className="relative rounded-3xl p-8 md:p-14 text-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${C.dark}, ${C.gray})`,
              border: `1px solid ${C.orange}33`,
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${C.orange}55, transparent 60%)`,
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
                ¿LISTO PARA EL{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  CAMBIO
                </span>
                ?
              </h2>
              <p
                className="text-base md:text-lg mb-7 max-w-xl mx-auto"
                style={{ color: "#cfcfcf" }}
              >
                Descubre la oferta completa y haz parte de la nueva
                tendencia.
              </p>
              <button
                onClick={goToOffer}
                className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl font-black text-base uppercase tracking-wider transition-transform active:scale-95 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${C.orange}, ${C.red})`,
                  color: C.white,
                  boxShadow: `0 10px 30px -10px ${C.orange}80`,
                }}
              >
                Ver Oferta Ahora
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="relative z-10 border-t mt-10"
        style={{ borderColor: "#ffffff14" }}
      >
        <div
          className="max-w-6xl mx-auto px-4 py-6 text-center text-xs"
          style={{ color: "#7a7a7a" }}
        >
          © {new Date().getFullYear()} · Contenido editorial · Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

export default OfertaEspecial;
