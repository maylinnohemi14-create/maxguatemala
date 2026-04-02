import { Link } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import maxHeader from "@/assets/max-header.png";
import underArmourMain from "@/assets/under-armour-main.png";
import conjunto4Negro from "@/assets/conjunto4-negro-gen.webp";
import refletivaHero from "@/assets/refletiva-hero.jpg";

const products = [
  {
    title: "Conjuntos Kit 3 en 1",
    description: "3 conjuntos completos: Buzo + Camiseta + Pantalón en colores Gris, Negro y Azul.",
    price: "Q299",
    originalPrice: "Q589",
    image: underArmourMain,
    link: "/conjuntos",
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
    price: "Q359",
    originalPrice: "Q720",
    image: refletivaHero,
    link: "/refletiva",
    badge: "✨ Premium",
  },
];

const Catalogo = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#1a1a1a] py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <img src={maxHeader} alt="MAX Guatemala" className="h-10 sm:h-12" />
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] text-white py-6 sm:py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            🇬🇹 Nuestros Kits Deportivos
          </h1>
          <p className="text-sm sm:text-lg text-gray-300">
            Pago contra entrega · Envío a toda Guatemala · ¡Los mejores precios!
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.link}
              to={product.link}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              {/* Badge */}
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

              {/* Info */}
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {product.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                </div>

                {/* CTA */}
                <div className="w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-3 rounded-xl transition-colors text-sm sm:text-base">
                  VER PRODUCTO →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-10 bg-[#1a1a1a] rounded-2xl p-6 text-white text-center">
          <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🚚</span>
              <span className="font-semibold">Envío a toda Guatemala</span>
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
