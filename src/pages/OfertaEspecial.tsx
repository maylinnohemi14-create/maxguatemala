import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import linoBeige from "@/assets/lino-beige.jpg";
import linoVerde from "@/assets/lino-verde.jpg";
import linoNegro from "@/assets/lino-negro.jpg";

const PRIMARY = "#0a3d2e";
const ACCENT = "#c9a96e";
const DARK = "#1a1a1a";

const TARGET_ROUTE = "/elegancia";

const OfertaEspecial = () => {
  const navigate = useNavigate();
  const [stockLeft] = useState(() => Math.floor(Math.random() * 8) + 12);
  const [viewers, setViewers] = useState(() => Math.floor(Math.random() * 4) + 12);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = v + change;
        return Math.max(10, Math.min(18, next));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGoToOffer = () => {
    navigate(TARGET_ROUTE);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "Georgia, serif" }}>
      {/* TOP BAR */}
      <div style={{ background: PRIMARY }} className="text-white text-center py-2 text-xs sm:text-sm tracking-wider">
        ✦ COLECCIÓN PREMIUM 2026 · ENVÍO A TODA GUATEMALA ✦
      </div>

      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-lg"
              style={{ background: PRIMARY }}
            >
              M
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500">Tiendas Max</div>
              <div className="text-base font-black" style={{ color: DARK }}>
                MODA <span style={{ color: ACCENT }}>·</span> ELEGANTE
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>{viewers} personas viendo ahora</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-8">
        <div className="text-center mb-8">
          <div
            className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-5"
            style={{ background: `${ACCENT}22`, color: PRIMARY, border: `1px solid ${ACCENT}66` }}
          >
            ✦ EDICIÓN LIMITADA ✦
          </div>
          <h1
            className="text-4xl sm:text-6xl font-black leading-[1.05] mb-5"
            style={{ color: DARK }}
          >
            Eleva tu estilo con la
            <br />
            <span style={{ color: PRIMARY }}>colección más elegante</span>
            <br />
            del año.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Diseño exclusivo, tejido premium y un acabado que destaca en cualquier ocasión.
            Más de <strong>2,500 hombres en Guatemala</strong> ya eligieron esta colección.
          </p>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-10">
          {[linoBeige, linoVerde, linoNegro].map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg"
              style={{ border: `1px solid ${ACCENT}33` }}
            >
              <img src={img} alt={`Estilo ${i + 1}`} className="w-full h-full object-cover" loading="eager" />
            </div>
          ))}
        </div>

        {/* MAIN CTA */}
        <div
          className="rounded-3xl p-6 sm:p-10 text-center"
          style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, #0d4a37 100%)`,
            boxShadow: `0 20px 50px -15px ${PRIMARY}66`,
          }}
        >
          <div className="text-white/80 text-xs uppercase tracking-[0.3em] mb-3">
            Oferta exclusiva por tiempo limitado
          </div>
          <div className="text-white text-3xl sm:text-5xl font-black mb-2">
            Hasta <span style={{ color: ACCENT }}>58% OFF</span>
          </div>
          <div className="text-white/70 text-sm sm:text-base mb-6">
            Pago contra entrega · Envío 24-72h · Garantía total
          </div>

          <button
            onClick={handleGoToOffer}
            className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: ACCENT,
              color: DARK,
              boxShadow: `0 10px 30px -5px ${ACCENT}aa`,
            }}
          >
            Ver la oferta
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          <div className="mt-5 text-white/60 text-xs">
            🔥 Solo quedan <strong className="text-white">{stockLeft} unidades</strong> a este precio
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-black text-center mb-10" style={{ color: DARK }}>
          ¿Por qué eligen esta colección?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "✨",
              title: "Tejido Premium",
              text: "Material fresco, transpirable y de larga durabilidad. Confección de alta calidad.",
            },
            {
              icon: "💵",
              title: "Pago al recibir",
              text: "Sin adelantos. Pagas solo cuando recibes tu pedido en la puerta de tu casa.",
            },
            {
              icon: "🚚",
              title: "Envío rápido",
              text: "Entregamos en 24-72 horas a todos los departamentos de Guatemala.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl border bg-white"
              style={{ borderColor: `${ACCENT}33` }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-black text-lg mb-2" style={{ color: PRIMARY }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: `${PRIMARY}08`, border: `1px solid ${PRIMARY}22` }}
        >
          <div className="text-3xl mb-3">⭐⭐⭐⭐⭐</div>
          <p className="text-lg italic text-gray-700 leading-relaxed mb-4" style={{ color: DARK }}>
            "La calidad superó mis expectativas. El tejido es muy fresco y se ve elegante.
            Pagué cuando lo recibí, todo perfecto."
          </p>
          <div className="text-sm font-bold" style={{ color: PRIMARY }}>
            — Carlos M., Ciudad de Guatemala
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: DARK }}>
            Aprovecha antes que se agote
          </h2>
          <p className="text-gray-600 mb-6">
            La promoción termina hoy. Reserva tu kit con pago contra entrega.
          </p>
          <button
            onClick={handleGoToOffer}
            className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-black text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 text-white"
            style={{
              background: PRIMARY,
              boxShadow: `0 10px 30px -5px ${PRIMARY}aa`,
            }}
          >
            Quiero mi oferta →
          </button>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
};

export default OfertaEspecial;
