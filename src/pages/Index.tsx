import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Truck, Shield, CreditCard, Star, ArrowRight, Menu, X } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";
import heroFuturistic from "@/assets/hero-futuristic.jpg";
import underArmourMain from "@/assets/under-armour-main.png";
import conjunto4Negro from "@/assets/conjunto4-negro-gen.webp";
import refletivaHero from "@/assets/refletiva-hero.jpg";
import projectorPromo from "@/assets/projector-promo.png";

const products = [
  {
    title: "Conjuntos Kit 3 en 1",
    description: "Buzo + Camiseta + Pantalón en 3 colores",
    price: "Q299",
    originalPrice: "Q589",
    image: underArmourMain,
    link: "/conjuntos",
    badge: "MÁS VENDIDO",
  },
  {
    title: "Conjuntos Kit 4 en 1",
    description: "4 conjuntos deportivos completos",
    price: "Q299",
    originalPrice: "Q599",
    image: conjunto4Negro,
    link: "/contraentrega",
    badge: "NUEVO",
  },
  {
    title: "Kit 8 Camisetas Reflectivas",
    description: "8 camisetas reflectivas premium",
    price: "Q279",
    originalPrice: "Q720",
    image: refletivaHero,
    link: "/refletiva",
    badge: "PREMIUM",
  },
  {
    title: "Proyector VEVSHAO A10",
    description: "Cine en casa — Compra 1 y Lleva 2",
    price: "Q359",
    originalPrice: "Q899",
    image: projectorPromo,
    link: "/proyector",
    badge: "2x1",
  },
];

const testimonials = [
  { name: "María R.", comment: "¡Increíble calidad! Transformó mi estilo.", rating: 5 },
  { name: "Carlos G.", comment: "¡Mejor compra del año! Lo recomiendo.", rating: 5 },
  { name: "Ana L.", comment: "Entrega rápida y producto de primera.", rating: 5 },
  { name: "José H.", comment: "Mis hijos están felices. Gran inversión.", rating: 5 },
  { name: "Sofía M.", comment: "Calidad impresionante por el precio.", rating: 5 },
  { name: "Pedro G.", comment: "Llegó rápido y funciona perfecto.", rating: 5 },
];

const stats = [
  { value: "2,000+", label: "Clientes Satisfechos" },
  { value: "99%", label: "Entregas Exitosas" },
  { value: "24h", label: "Atención al Cliente" },
  { value: "🇬🇹", label: "Envío Nacional" },
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="text-xl sm:text-2xl font-black tracking-[0.3em] text-white">
              MAX
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/catalogo" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">
                Catálogo
              </Link>
              <Link to="/conjuntos" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">
                Conjuntos
              </Link>
              <Link to="/refletiva" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">
                Reflectivas
              </Link>
              <Link to="/proyector" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">
                Proyector
              </Link>
              <Link to="/contacto" className="text-sm text-white/70 hover:text-white transition-colors tracking-wider">
                Contacto
              </Link>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-t border-white/5 animate-fade-in">
            <div className="px-6 py-6 space-y-4">
              {[
                { to: "/catalogo", label: "Catálogo" },
                { to: "/conjuntos", label: "Conjuntos" },
                { to: "/refletiva", label: "Reflectivas" },
                { to: "/proyector", label: "Proyector" },
                { to: "/contacto", label: "Contacto" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg text-white/80 hover:text-white transition-colors tracking-wider"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={heroFuturistic}
            alt="MAX Guatemala"
            className="w-full h-full object-cover opacity-40"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>

        {/* Animated glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-[0.05em] mb-6 sm:mb-8">
              <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                MAX
              </span>
              <span className="block text-[clamp(1rem,3.5vw,2.5rem)] font-light tracking-[0.4em] text-white/50 mt-2 sm:mt-4">
                G U A T E M A L A
              </span>
            </h1>

            <p className="text-base sm:text-xl text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
              Diseñado para el futuro del estilo. Descubre productos que superan los límites.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/catalogo"
                className="group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm sm:text-base rounded-full hover:shadow-[0_0_40px_rgba(255,0,0,0.3)] transition-all duration-500 tracking-wider"
              >
                COMPRAR AHORA
                <ChevronRight className="inline-block w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/conjuntos"
                className="px-8 sm:px-10 py-4 border border-white/20 text-white font-medium text-sm sm:text-base rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-500 tracking-wider"
              >
                EXPLORAR COLECCIÓN
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Spaced Section Title: Recién Llegados */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[0.15em] sm:tracking-[0.25em] text-white mb-4">
              NUESTROS PRODUCTOS
            </h2>
            <p className="text-sm sm:text-base text-white/40 max-w-xl tracking-wider leading-relaxed">
              Tecnología y estilo de alto rendimiento para tus días. Pago contra entrega en toda Guatemala.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.link}
                to={product.link}
                className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,0,0,0.08)]"
              >
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full bg-red-500 text-white tracking-wider">
                    {product.badge}
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
                </div>

                {/* Info */}
                <div className="p-3 sm:p-5">
                  <h3 className="text-xs sm:text-base font-bold text-white mb-1 tracking-wide line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-white/40 mb-3 line-clamp-1">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm sm:text-xl font-black text-red-500">{product.price}</span>
                      <span className="text-[10px] sm:text-sm text-white/30 line-through">{product.originalPrice}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/40 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-[0.15em] sm:tracking-[0.25em] text-white mb-4">
              OPINIONES
            </h2>
            <p className="text-sm sm:text-base text-white/40 max-w-xl tracking-wider">
              Con la confianza de miles de clientes en toda Guatemala.
            </p>
          </div>

          {/* Scrolling testimonials */}
          <div className="relative">
            <div className="flex gap-4 sm:gap-6 animate-[scroll_30s_linear_infinite]">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[280px] sm:w-[350px] bg-[#111] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-red-500/20 transition-colors"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-red-500 text-red-500" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-white/70 mb-4 leading-relaxed italic">"{t.comment}"</p>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="py-12 sm:py-16 border-y border-white/5 overflow-hidden">
        <div ref={marqueeRef} className="flex gap-12 sm:gap-20 animate-[scroll_20s_linear_infinite]">
          {[...Array(3)].flatMap(() => [
            "🚚 Envío Gratis",
            "💵 Pago Contra Entrega",
            "🛡️ Garantía Total",
            "⚡ Entrega Rápida",
            "⭐ +2,000 Clientes",
          ]).map((text, idx) => (
            <span
              key={idx}
              className="flex-shrink-0 text-lg sm:text-2xl font-bold text-white/10 tracking-[0.15em] whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[200px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
            <span className="text-white">EL FUTURO</span>
            <br />
            <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              ESTÁ AQUÍ
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/40 mb-8 sm:mb-12 max-w-xl mx-auto">
            Pago contra entrega en toda Guatemala. Sin riesgos, solo satisfacción.
          </p>
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 px-10 sm:px-14 py-4 sm:py-5 bg-white text-black font-bold text-sm sm:text-base rounded-full hover:shadow-[0_0_50px_rgba(255,255,255,0.15)] transition-all duration-500 tracking-wider"
          >
            VER CATÁLOGO COMPLETO
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
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

export default Index;
