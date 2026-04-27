import { Link } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import headerDesktop from "@/assets/refletiva-header-desktop.png";
import headerMobile from "@/assets/refletiva-header-mobile.jpg";
import underArmourMain from "@/assets/under-armour-main.png";
import conjunto4Negro from "@/assets/conjunto4-negro-gen.webp";
import refletivaHero from "@/assets/refletiva-hero.jpg";

const guatemalaProducts = [
  {
    title: "Conjuntos Kit 3 en 1",
    description: "3 conjuntos completos: Buzo + Camiseta + Pantalón en colores Gris, Negro y Azul.",
    price: "Q299",
    originalPrice: "Q589",
    image: underArmourMain,
    link: "/conjuntosfit",
    badge: "🔥 Más Vendido",
  },
  {
    title: "Conjuntos Kit 4 en 1",
    description: "4 conjuntos deportivos completos: Buzo + Camiseta + Pantaloneta en Negro, Blanco, Azul y Gris.",
    price: "Q299",
    originalPrice: "Q599",
    image: conjunto4Negro,
    link: "/contraentrega",
    badge: "⚡ Nuevo",
  },
  {
    title: "Kit 8 Camisetas Reflectivas",
    description: "8 camisetas reflectivas premium en colores: Negra, Blanca, Gris, Azul, Carbón, Vino, Roja y Verde.",
    price: "Q279",
    originalPrice: "Q720",
    image: refletivaHero,
    link: "/refletiva",
    badge: "✨ Premium",
  },
];

const colombiaProducts = [
  {
    title: "Conjuntos Kit 3 en 1",
    description: "3 conjuntos completos: Buzo + Camiseta + Pantalón en colores Gris, Negro y Azul.",
    price: "$149.000",
    originalPrice: "$289.900",
    image: underArmourMain,
    link: "/ropaconjuntos",
    badge: "🔥 Más Vendido",
  },
  {
    title: "Conjuntos Kit 4 en 1",
    description: "4 conjuntos deportivos completos: Buzo + Camiseta + Pantaloneta en Negro, Blanco, Azul y Gris.",
    price: "$179.000",
    originalPrice: "$358.000",
    image: conjunto4Negro,
    link: "/contraentregaco",
    badge: "⚡ Nuevo",
  },
];

const ProductGrid = ({ products }: { products: typeof guatemalaProducts }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {products.map((product) => (
      <Link
        key={product.link}
        to={product.link}
        className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border"
      >
        <div className="relative">
          <div className="absolute top-3 left-3 z-10 bg-[#1a1a1a] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            {product.badge}
          </div>
          <div className="aspect-square overflow-hidden bg-[#f5f5f5]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
            {product.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-green-600">{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
          </div>
          <div className="w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 rounded-xl transition-colors text-sm sm:text-base">
            VER PRODUCTO →
          </div>
        </div>
      </Link>
    ))}
  </div>
);

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* UA Header */}
      <div className="w-full bg-[#1a1a1a]">
        <img src={headerDesktop} alt="Under Armour" className="hidden sm:block w-full h-auto object-cover" />
        <img src={headerMobile} alt="Under Armour" className="block sm:hidden w-full h-auto object-cover" />
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white py-6 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            🛒 Nuestro Catálogo
          </h1>
          <p className="text-sm sm:text-lg text-gray-300 mb-5">
            Pago contra entrega · ¡Los mejores precios!
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <a
              href="#guatemala"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 text-sm sm:text-base font-semibold"
            >
              🇬🇹 Guatemala
            </a>
            <a
              href="#colombia"
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-full transition-all duration-300 text-sm sm:text-base font-semibold"
            >
              🇨🇴 Colombia
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        {/* Guatemala */}
        <div id="guatemala">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            🇬🇹 Guatemala
          </h2>
          <ProductGrid products={guatemalaProducts} />
        </div>

        {/* Colombia */}
        <div id="colombia">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            🇨🇴 Colombia
          </h2>
          <ProductGrid products={colombiaProducts} />
        </div>

        {/* Trust bar */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white text-center">
          <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🚚</span>
              <span className="font-semibold">Envío a domicilio</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">💵</span>
              <span className="font-semibold">Pago contra entrega</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">+2,000 clientes felices</span>
            </div>
          </div>
        </div>
      </div>

      <LegalFooter />
    </div>
  );
};

export default Catalogo;
