import { useState } from "react";
import { Link } from "react-router-dom";
import { LegalFooter } from "@/components/LegalFooter";
import { Truck, CreditCard, Shield, Star, ShoppingBag, Sparkles, Heart, Zap, Flame } from "lucide-react";

const NIKE_ORANGE = "#FF6B00";
const NIKE_RED = "#FA0F00";

interface Product {
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

interface KitItem {
  name: string;
  image: string;
  color: string;
}

export interface JoggerKit {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  items: KitItem[];
  badge?: string;
  category: string;
}

const products: Product[] = [
  { id: "tn-trackpants", slug: "tn-trackpants", name: "Nike Tn Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/0007496A-35A8-44FA-BA1A-390113ED5B7B.jpg?width=800", badge: "🔥 TOP VENTAS", color: "Negro", category: "Clásico" },
  { id: "shox-trackpants", slug: "shox-trackpants", name: "Nike Shox Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/D75B501C-C708-42B6-B435-9DACA68730C3.jpg?width=800", badge: "EXCLUSIVO", color: "Beige/Negro", category: "Retro" },
  { id: "trackpants-classic", slug: "trackpants-classic", name: "Nike Trackpants Classic", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/D56E8296-ABC5-43A1-8ADE-32059E0BD650.jpg?width=800", color: "Negro/Blanco", category: "Clásico" },
  { id: "trackpants-stripe", slug: "trackpants-stripe", name: "Nike Trackpants Stripe", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/89DA5914-71E5-43A7-99C8-01D8743D0035.jpg?width=800", badge: "NUEVO", color: "Beige", category: "Retro" },
  { id: "trackpants-10s", slug: "trackpants-10s", name: "Nike Trackpants 10's", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/15BE8420-1FE4-4192-B42B-FA5DD33A4D5C.jpg?width=800", color: "Negro/Gris", category: "Clásico" },
  { id: "windrunner-pants", slug: "windrunner-pants", name: "Nike Windrunner Pants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/8ED2BD4F-1E75-445A-BB86-748A04E767B4.jpg?width=800", badge: "PREMIUM", color: "Negro", category: "Sport" },
  { id: "cargo-trackpants", slug: "cargo-trackpants", name: "Nike Cargo Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/377D7289-8DBE-4667-9B8B-B7E12C8B1859.jpg?width=800", color: "Negro", category: "Clásico" },
  { id: "heritage-pants", slug: "heritage-pants", name: "Nike Heritage Pants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/4D671E07-9A36-47DA-BB24-29F4F82EE935.jpg?width=800", badge: "CLÁSICO", color: "Negro/Blanco", category: "Retro" },
  { id: "zip-trackpants", slug: "zip-trackpants", name: "Nike Zip Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/C1344741-7760-429C-94BA-A85F10102634.jpg?width=800", color: "Negro", category: "Sport" },
  { id: "duo-tone", slug: "duo-tone", name: "Nike Duo Tone", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/DFF3F39B-0F49-4389-8C3F-96E6CAC40FC9.jpg?width=800", color: "Blanco/Negro", category: "Clásico" },
  { id: "urban-pants", slug: "urban-pants", name: "Nike Urban Pants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/B4BCF1EF-5FCD-4F15-A142-C4ABCBBB4D68.jpg?width=800", badge: "PREMIUM", color: "Negro/Gris", category: "Clásico" },
  { id: "flow-pants", slug: "flow-pants", name: "Nike Flow Pants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/4397943A-FA94-42FB-8A6A-58C8B4C60152.jpg?width=800", color: "Negro", category: "Sport" },
  { id: "edge-trackpants", slug: "edge-trackpants", name: "Nike Edge Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/96F64311-B320-4A26-979E-1BB8C1500E40.jpg?width=800", color: "Negro/Blanco", category: "Retro" },
  { id: "golf-trackpants", slug: "golf-trackpants", name: "Nike Golf Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/17DE9CDB-6181-4725-9EF8-67C17C8E327F.jpg?width=800", color: "Gris", category: "Sport" },
  { id: "trackpants-beige", slug: "trackpants-beige", name: "Nike Trackpants Beige", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/40281FF8-4309-442C-8B23-097F19640346.jpg?width=800", badge: "NUEVO", color: "Beige", category: "Retro" },
  { id: "shox-classic", slug: "shox-classic", name: "Nike Shox Classic", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/EB5B10A5-4C56-46A8-B157-5D4696BC8BF9.jpg?width=800", color: "Beige/Blanco", category: "Retro" },
  { id: "trackpants-white", slug: "trackpants-white", name: "Nike Trackpants White", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/BFEC8871-92F3-4B84-A22B-E5DCDBD45CC8.jpg?width=800", badge: "MÁS ELEGIDO", color: "Blanco", category: "Clásico" },
  { id: "psg-trackpants", slug: "psg-trackpants", name: "Nike PSG Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/6C5CC989-C3A1-4E7E-98FC-9AD01649E4D1.jpg?width=800", color: "Azul", category: "Sport" },
  { id: "navy-trackpants", slug: "navy-trackpants", name: "Nike Navy Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/45D75FFB-268A-4485-9887-25D7E55313F5.jpg?width=800", color: "Azul Marino", category: "Clásico" },
  { id: "vintage-brown", slug: "vintage-brown", name: "Nike Vintage Brown", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/9DBA0ACA-7720-4FC3-8A58-AF8400EA67C5.jpg?width=800", color: "Marrón", category: "Retro" },
  { id: "90s-trackpants", slug: "90s-trackpants", name: "Nike 90's Trackpants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/8AD4B107-2DEB-4515-B4B9-E93EF13CF56B.jpg?width=800", badge: "CLÁSICO", color: "Negro", category: "Retro" },
  { id: "premium-black", slug: "premium-black", name: "Nike Premium Black", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/CA992EB1-A237-42F3-8B34-BD18193335ED.jpg?width=800", color: "Negro", category: "Sport" },
  { id: "casual-pants", slug: "casual-pants", name: "Nike Casual Pants", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/11AD84AC-3C0E-4D4D-9C91-2216B9734077.jpg?width=800", color: "Negro", category: "Clásico" },
  { id: "classic-line", slug: "classic-line", name: "Nike Classic Line", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/E5B806F1-CBEB-49CF-948C-CA90AE2B2E75.jpg?width=800", color: "Negro", category: "Sport" },
  { id: "track-vintage-blue", slug: "track-vintage-blue", name: "Nike Track Vintage", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/4E95FC40-7C06-4B87-A0FD-9A9AABA29604.jpg?width=800", color: "Azul", category: "Retro" },
  { id: "multicolor-track", slug: "multicolor-track", name: "Nike Multicolor Track", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/C890AF18-A6B0-4299-883B-064BD514FD73.jpg?width=800", badge: "NUEVO", color: "Negro/Rojo", category: "Sport" },
  { id: "classic-navy", slug: "classic-navy", name: "Nike Classic Navy", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/7107C39B-B235-4EAF-BC9F-EFF066228908.jpg?width=800", color: "Azul Marino", category: "Clásico" },
  { id: "vintage-grey", slug: "vintage-grey", name: "Nike Vintage Grey", price: 249, originalPrice: 499, image: "https://sportsvintage.de/cdn/shop/files/96889E7A-9FE7-4BD3-9F21-20C58311104B.jpg?width=800", color: "Gris", category: "Retro" },
];

export { products as JOGGER_GT_PRODUCTS };

const kits: JoggerKit[] = [
  {
    id: "kit-negro-clasico", slug: "kit-negro-clasico", name: "Negro Clásico", price: 280, originalPrice: 747,
    badge: "🔥 MÁS VENDIDO", category: "Kit",
    items: [
      { name: "Nike Tn Trackpants", image: products[0].image, color: "Negro" },
      { name: "Nike Cargo Trackpants", image: products[6].image, color: "Negro" },
      { name: "Nike Premium Black", image: products[20].image, color: "Negro" },
    ],
  },
  {
    id: "kit-retro-beige", slug: "kit-retro-beige", name: "Retro Beige", price: 280, originalPrice: 747,
    badge: "EXCLUSIVO", category: "Kit",
    items: [
      { name: "Nike Shox Trackpants", image: products[1].image, color: "Beige/Negro" },
      { name: "Nike Trackpants Beige", image: products[14].image, color: "Beige" },
      { name: "Nike Shox Classic", image: products[15].image, color: "Beige/Blanco" },
    ],
  },
  {
    id: "kit-sport-mix", slug: "kit-sport-mix", name: "Sport Mix", price: 280, originalPrice: 747,
    category: "Kit",
    items: [
      { name: "Nike Windrunner Pants", image: products[5].image, color: "Negro" },
      { name: "Nike Flow Pants", image: products[11].image, color: "Negro" },
      { name: "Nike Multicolor Track", image: products[25].image, color: "Negro/Rojo" },
    ],
  },
  {
    id: "kit-blanco-negro", slug: "kit-blanco-negro", name: "Blanco & Negro", price: 280, originalPrice: 747,
    category: "Kit",
    items: [
      { name: "Nike Trackpants White", image: products[16].image, color: "Blanco" },
      { name: "Nike Duo Tone", image: products[9].image, color: "Blanco/Negro" },
      { name: "Nike Trackpants Classic", image: products[2].image, color: "Negro/Blanco" },
    ],
  },
  {
    id: "kit-azul-marino", slug: "kit-azul-marino", name: "Azul Marino", price: 280, originalPrice: 747,
    badge: "NUEVO", category: "Kit",
    items: [
      { name: "Nike PSG Trackpants", image: products[17].image, color: "Azul" },
      { name: "Nike Navy Trackpants", image: products[18].image, color: "Azul Marino" },
      { name: "Nike Classic Navy", image: products[26].image, color: "Azul Marino" },
    ],
  },
  {
    id: "kit-vintage-retro", slug: "kit-vintage-retro", name: "Vintage Retro", price: 280, originalPrice: 747,
    category: "Kit",
    items: [
      { name: "Nike Heritage Pants", image: products[7].image, color: "Negro/Blanco" },
      { name: "Nike 90's Trackpants", image: products[20].image, color: "Negro" },
      { name: "Nike Vintage Brown", image: products[19].image, color: "Marrón" },
    ],
  },
  {
    id: "kit-urban-gris", slug: "kit-urban-gris", name: "Urban Gris", price: 280, originalPrice: 747,
    category: "Kit",
    items: [
      { name: "Nike Urban Pants", image: products[10].image, color: "Negro/Gris" },
      { name: "Nike Golf Trackpants", image: products[13].image, color: "Gris" },
      { name: "Nike Vintage Grey", image: products[27].image, color: "Gris" },
    ],
  },
  {
    id: "kit-total-black", slug: "kit-total-black", name: "Total Black", price: 280, originalPrice: 747,
    category: "Kit",
    items: [
      { name: "Nike Zip Trackpants", image: products[8].image, color: "Negro" },
      { name: "Nike Casual Pants", image: products[22].image, color: "Negro" },
      { name: "Nike Classic Line", image: products[23].image, color: "Negro" },
    ],
  },
  {
    id: "kit-mix-colores", slug: "kit-mix-colores", name: "Mix de Colores", price: 280, originalPrice: 747,
    badge: "PREMIUM", category: "Kit",
    items: [
      { name: "Nike Trackpants Stripe", image: products[3].image, color: "Beige" },
      { name: "Nike Track Vintage", image: products[24].image, color: "Azul" },
      { name: "Nike Edge Trackpants", image: products[12].image, color: "Negro/Blanco" },
    ],
  },
];

export { kits as JOGGER_GT_KITS };

const categories = ["Todos", "Kit 3en1", "Clásico", "Sport", "Retro"];

const JoggerGT = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const showKits = activeCategory === "Todos" || activeCategory === "Kit 3en1";
  const showProducts = activeCategory !== "Kit 3en1";

  const filteredProducts = showProducts
    ? (activeCategory === "Todos" ? products : products.filter((p) => p.category === activeCategory))
    : [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-clip" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`, boxShadow: `0 0 20px ${NIKE_ORANGE}66` }}
            >
              <svg viewBox="0 0 24 12" className="w-7 h-4" fill="white">
                <path d="M24 1.5c-3 5-8.5 9-15 9-3.5 0-6-1-7-2.5C2.5 9 4 8.5 6 8c4-1 9-3 13-5.5 1.5-1 3-2 5-2.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
                TRACKPANTS
              </h2>
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/35 font-medium">
                Guatemala
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-white/30 font-medium">
            <span className="hidden sm:inline">Tienda Oficial</span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: NIKE_ORANGE }} />
            <span>En línea</span>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3 text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/30 font-medium">
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

      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: NIKE_ORANGE }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: NIKE_RED }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
            <span className="text-[11px] tracking-[0.25em] uppercase text-white/50 font-medium">
              Colección Vintage Guatemala
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Trackpants
            <span className="block font-black" style={{
              background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Vintage
            </span>
          </h1>

          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
            Pantalones deportivos vintage originales. Piezas únicas con envío gratis a toda Guatemala.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-white/30">
            <span>{products.length} estilos</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Envío gratis</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Pago al recibir</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-1 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300
                    ${activeCategory === cat
                      ? "text-black shadow-lg"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                    }`}
                  style={activeCategory === cat ? {
                    background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})`,
                    boxShadow: `0 4px 16px ${NIKE_ORANGE}44`,
                  } : {}}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-white/30 hidden sm:block">
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
                to={`/joggergt/${product.slug}`}
                className="group relative"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 transition-all group-hover:border-orange-500/40">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${hoveredId === product.id ? "scale-110" : "scale-100"}`}
                      loading="lazy"
                    />
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${hoveredId === product.id ? "opacity-100" : "opacity-0"}`} />

                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white border border-white/20 shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}cc, ${NIKE_RED}cc)`, backdropFilter: "blur(8px)" }}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className={`absolute top-3 right-3 transition-all duration-300 ${hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Heart className="w-4 h-4 text-white/60" />
                    </div>
                  </div>

                  <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${hoveredId === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <div className="w-full py-2.5 rounded-xl text-center text-xs font-semibold tracking-wider uppercase text-black shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})` }}>
                      Ver Producto
                    </div>
                  </div>

                  {!product.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${NIKE_ORANGE}, ${NIKE_RED})` }}>
                        -50%
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 pb-2 px-1">
                  <div className="flex items-center gap-0.5 mb-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-white/30 ml-1">(4.9)</span>
                  </div>
                  <h3 className="font-medium text-sm sm:text-base text-white/80 leading-tight mb-1.5 line-clamp-1 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                  {product.color && (
                    <p className="text-[11px] text-white/30 mb-2 tracking-wide uppercase">{product.color}</p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-semibold" style={{ color: NIKE_ORANGE }}>Q{product.price}</span>
                    <span className="text-xs text-white/30 line-through">Q{product.originalPrice}</span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-white/30 mt-1.5 font-medium">Pago contra entrega</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 mb-6">
              <ShoppingBag className="w-3.5 h-3.5" style={{ color: NIKE_ORANGE }} />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/40 font-medium">Compra Segura</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-4">
              Solo pagas al <span className="font-semibold" style={{ color: NIKE_ORANGE }}>recibir</span>
            </h2>
            <p className="text-sm text-white/40 font-light leading-relaxed mb-8">
              Envío gratis a toda Guatemala. Sin riesgos, sin pagos adelantados. Tu satisfacción es nuestra prioridad.
            </p>
            <div className="flex items-center justify-center gap-8 text-white/25">
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">Envío Gratis</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">100% Garantía</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span className="text-[10px] tracking-widest uppercase">Contra Entrega</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-background">
        <LegalFooter />
      </div>
    </div>
  );
};

export default JoggerGT;
