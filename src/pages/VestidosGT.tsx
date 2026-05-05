import { useState } from "react";
import { Link } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import maxHeader from "@/assets/max-header.png";
import { Truck, CreditCard, Shield, Star, ShoppingBag, Sparkles, Heart, Filter, ChevronDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  route: string;
  badge?: string;
  color?: string;
  category?: string;
}

const products: Product[] = [
  {
    id: "vestido-imperial-scarlet",
    name: "Vestido Imperial Scarlet",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-04-03-12-bed4fc770309ed1f4a17635075297197-640-0.webp",
    route: "/vestidosgt/imperial-scarlet",
    badge: "MÁS VENDIDO",
    color: "Rojo",
    category: "Elegante",
  },
  {
    id: "vestido-imperial",
    name: "Vestido Imperial",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-09-10-03-36-02-35f17e814f9bc7d86d17575440436127-640-0.webp",
    route: "/vestidosgt/imperial",
    badge: "EXCLUSIVO",
    color: "Beige",
    category: "Elegante",
  },
  {
    id: "vestido-zera",
    name: "Vestido Zera",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-06-55-40-1f8cadd102168c016617635179479404-640-0.webp",
    route: "/vestidosgt/zera",
    badge: "PREMIUM",
    color: "Beige",
    category: "Casual",
  },
  {
    id: "vestido-aurora",
    name: "Vestido Aurora",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-10-19-10-39-15-9ffaf49c27894eef8217612026247943-640-0.webp",
    route: "/vestidosgt/aurora",
    badge: "TOP VENTAS",
    color: "Beige",
    category: "Elegante",
  },
  {
    id: "vestido-fancy",
    name: "Vestido Fancy",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00103-c0dc02ba12956ed05317770977107067-640-0.webp",
    route: "/vestidosgt/fancy",
    badge: "NUEVO",
    color: "Beige",
    category: "Fiesta",
  },
  {
    id: "vestido-elda-rosa",
    name: "Vestido Elda Rosa",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00099-69c143aa02b0b2809717770963882904-640-0.webp",
    route: "/vestidosgt/elda-rosa",
    color: "Rosa",
    category: "Casual",
  },
  {
    id: "vestido-calma",
    name: "Vestido Calma",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00022-4bbe1c8a65f6338c8f17763715319007-640-0.webp",
    route: "/vestidosgt/calma",
    color: "Beige",
    category: "Casual",
  },
  {
    id: "vestido-ariana",
    name: "Vestido Ariana",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00029-54b95152ce7c6b50aa17763712028554-640-0.webp",
    route: "/vestidosgt/ariana",
    badge: "FLORAL",
    color: "Floral",
    category: "Casual",
  },
  {
    id: "vestido-petra",
    name: "Vestido Petra",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00010-1dfc13f9cf5f7d17cb17763699660920-640-0.webp",
    route: "/vestidosgt/petra",
    color: "Beige",
    category: "Elegante",
  },
  {
    id: "vestido-londres",
    name: "Vestido Londres",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00058-db82bb2094b8c9d4ac17763674057324-640-0.webp",
    route: "/vestidosgt/londres",
    badge: "ELEGANTE",
    color: "Violeta",
    category: "Fiesta",
  },
  {
    id: "vestido-delicadeza-rosa",
    name: "Vestido Delicadeza Rosa",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00056-6d7578b9d97cb8f56f17763671549975-640-0.webp",
    route: "/vestidosgt/delicadeza-rosa",
    color: "Rosa",
    category: "Casual",
  },
  {
    id: "conjunto-bordado-flora",
    name: "Conjunto Bordado Flora",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00079-503a52550cf09eb5b817763665595232-640-0.webp",
    route: "/vestidosgt/bordado-flora",
    badge: "BORDADO",
    color: "Floral",
    category: "Elegante",
  },
  {
    id: "vestido-mantequilla",
    name: "Vestido Mantequilla",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00008-918923f8d125ad365317733855065658-640-0.webp",
    route: "/vestidosgt/mantequilla",
    color: "Amarillo",
    category: "Casual",
  },
  {
    id: "vestido-delicadeza",
    name: "Vestido Delicadeza",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00023-c3eb8abf96a4a7d17317733851168648-640-0.webp",
    route: "/vestidosgt/delicadeza",
    badge: "ELEGANTE",
    color: "Beige",
    category: "Elegante",
  },
  {
    id: "vestido-rosas",
    name: "Vestido Rosas",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00032-346078d3c3b099336c17733849455091-640-0.webp",
    route: "/vestidosgt/rosas",
    color: "Rosa",
    category: "Casual",
  },
  {
    id: "vestido-primavera-encantada",
    name: "Vestido Primavera Encantada",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00018-8c6bc97c376766631a17733845849206-640-0.webp",
    route: "/vestidosgt/primavera-encantada",
    badge: "NUEVO",
    color: "Verde Pastel",
    category: "Casual",
  },
  {
    id: "vestido-encanto",
    name: "Vestido Encanto",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00021-bf4c48275e383a9cba17733842661665-640-0.webp",
    route: "/vestidosgt/encanto",
    color: "Rosa",
    category: "Fiesta",
  },
  {
    id: "vestido-oliva",
    name: "Vestido Oliva",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2026-01-16-06-20-21-837519d45f009cab7d17686857300095-640-0.webp",
    route: "/vestidosgt/oliva",
    badge: "NATURAL",
    color: "Verde",
    category: "Casual",
  },
  {
    id: "vestido-ivory",
    name: "Vestido Ivory",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-23-04-08-04-d20fce37b1dcf060c317639473675389-640-0.webp",
    route: "/vestidosgt/ivory",
    color: "Beige",
    category: "Elegante",
  },
  {
    id: "vestido-terra",
    name: "Vestido Terra",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-04-01-45-55-9d5a791a4098a6dd3417630279649919-640-0.webp",
    route: "/vestidosgt/terra",
    badge: "CLÁSICO",
    color: "Negro",
    category: "Fiesta",
  },
];

const categories = ["Todos", "Elegante", "Casual", "Fiesta"];

const VestidosGT = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white overflow-x-clip" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* MAX Header */}
      <div className="w-full bg-white">
        <img
          src={maxHeader}
          alt="MAX Guatemala - Tienda Online"
          className="w-full h-auto object-contain sm:object-cover max-h-[120px] sm:max-h-none mx-auto sm:mx-0 p-2 sm:p-0"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Minimal Trust Bar */}
      <div className="border-b border-black/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-black/40 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5" />
              <span>Envío Gratis</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pago Contra Entrega</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" />
              <span>Garantía Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Editorial Style */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Subtle gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-100/30 to-amber-100/20 rounded-full blur-3xl translate-y-1/2" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white/80 backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-black/50 font-medium">
              Colección Exclusiva Guatemala
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-black tracking-tight leading-[1.1] mb-6">
            Vestidos
            <span className="block font-semibold bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
              Premium
            </span>
          </h1>
          
          <p className="text-black/40 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
            Elegancia contemporánea para la mujer moderna. Diseños únicos con envío gratis a toda Guatemala.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-black/30">
            <span>{products.length} estilos</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>Envío gratis</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>Pago al recibir</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                    ${activeCategory === cat
                      ? "bg-black text-white shadow-lg shadow-black/20"
                      : "text-black/40 hover:text-black/70 hover:bg-black/5"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-black/30 hidden sm:block">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={product.route}
                className="group relative"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-gray-100/50">
                  {/* Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`
                        w-full h-full object-cover transition-all duration-700 ease-out
                        ${hoveredId === product.id ? "scale-110" : "scale-100"}
                      `}
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                    transition-opacity duration-500
                    ${hoveredId === product.id ? "opacity-100" : "opacity-0"}
                  `} />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase bg-white/90 backdrop-blur-sm text-black/70 border border-white/50 shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Heart icon */}
                  <div className={`
                    absolute top-3 right-3 transition-all duration-300
                    ${hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                  `}>
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 text-black/40" />
                    </div>
                  </div>

                  {/* Quick view button on hover */}
                  <div className={`
                    absolute bottom-4 left-4 right-4 transition-all duration-500
                    ${hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}>
                    <div className="w-full py-2.5 rounded-xl bg-white/95 backdrop-blur-sm text-center text-xs font-semibold tracking-wider uppercase text-black/80 shadow-lg">
                      Ver Producto
                    </div>
                  </div>

                  {/* Discount percentage */}
                  <div className="absolute top-3 right-3">
                    {!product.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm">
                        -50%
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="pt-4 pb-2 px-1">
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-[10px] text-black/30 ml-1">(4.9)</span>
                  </div>

                  <h3 className="font-medium text-sm sm:text-base text-black/80 leading-tight mb-1.5 line-clamp-1 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>

                  {product.color && (
                    <p className="text-[11px] text-black/30 mb-2 tracking-wide uppercase">{product.color}</p>
                  )}

                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-semibold text-black">
                      Q{product.price}
                    </span>
                    <span className="text-xs text-black/30 line-through">
                      Q{product.originalPrice}
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-[11px] text-black/30 mt-1.5 font-medium">
                    Pago contra entrega
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 mb-6">
              <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-black/40 font-medium">
                Compra Segura
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-black mb-4">
              Solo pagas al <span className="font-semibold">recibir</span>
            </h2>
            <p className="text-sm text-black/40 font-light leading-relaxed mb-8">
              Envío gratis a toda Guatemala. Sin riesgos, sin pagos adelantados. 
              Tu satisfacción es nuestra prioridad.
            </p>
            <div className="flex items-center justify-center gap-8 text-black/25">
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">Envío Gratis</span>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">100% Garantía</span>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">Contra Entrega</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
};

export default VestidosGT;
