import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LegalFooter } from "@/components/LegalFooter";
import maxHeader from "@/assets/max-header.png";
import { Truck, CreditCard, Shield, Star, ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  route: string;
  badge?: string;
  color?: string;
}

const products: Product[] = [
  {
    id: "vestido-imperial-scarlet",
    name: "Vestido Imperial Scarlet",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-04-03-12-bed4fc770309ed1f4a17635075297197-640-0.webp",
    route: "/vestidosgt/imperial-scarlet",
    badge: "🔥 MÁS VENDIDO",
    color: "Rojo",
  },
  {
    id: "vestido-imperial",
    name: "Vestido Imperial",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-09-10-03-36-02-35f17e814f9bc7d86d17575440436127-640-0.webp",
    route: "/vestidosgt/imperial",
    badge: "✨ EXCLUSIVO",
    color: "Beige",
  },
  {
    id: "vestido-zera",
    name: "Vestido Zera",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-18-06-55-40-1f8cadd102168c016617635179479404-640-0.webp",
    route: "/vestidosgt/zera",
    badge: "💎 PREMIUM",
    color: "Beige",
  },
  {
    id: "vestido-aurora",
    name: "Vestido Aurora",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-10-19-10-39-15-9ffaf49c27894eef8217612026247943-640-0.webp",
    route: "/vestidosgt/aurora",
    badge: "🔥 TOP VENTAS",
    color: "Beige",
  },
  {
    id: "vestido-fancy",
    name: "Vestido Fancy",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00103-c0dc02ba12956ed05317770977107067-640-0.webp",
    route: "/vestidosgt/fancy",
    badge: "👑 NUEVO",
    color: "Beige",
  },
  {
    id: "vestido-elda-rosa",
    name: "Vestido Elda Rosa",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00099-69c143aa02b0b2809717770963882904-640-0.webp",
    route: "/vestidosgt/elda-rosa",
    color: "Rosa",
  },
  {
    id: "vestido-calma",
    name: "Vestido Calma",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00022-4bbe1c8a65f6338c8f17763715319007-640-0.webp",
    route: "/vestidosgt/calma",
    color: "Beige",
  },
  {
    id: "vestido-ariana",
    name: "Vestido Ariana",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00029-54b95152ce7c6b50aa17763712028554-640-0.webp",
    route: "/vestidosgt/ariana",
    badge: "🌸 FLORAL",
    color: "Floral",
  },
  {
    id: "vestido-petra",
    name: "Vestido Petra",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00010-1dfc13f9cf5f7d17cb17763699660920-640-0.webp",
    route: "/vestidosgt/petra",
    color: "Beige",
  },
  {
    id: "vestido-londres",
    name: "Vestido Londres",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00058-db82bb2094b8c9d4ac17763674057324-640-0.webp",
    route: "/vestidosgt/londres",
    badge: "💜 ELEGANTE",
    color: "Violeta",
  },
  {
    id: "vestido-delicadeza-rosa",
    name: "Vestido Delicadeza Rosa",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00056-6d7578b9d97cb8f56f17763671549975-640-0.webp",
    route: "/vestidosgt/delicadeza-rosa",
    color: "Rosa",
  },
  {
    id: "conjunto-bordado-flora",
    name: "Conjunto Bordado Flora",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00079-503a52550cf09eb5b817763665595232-640-0.webp",
    route: "/vestidosgt/bordado-flora",
    badge: "🌺 BORDADO",
    color: "Floral",
  },
  {
    id: "vestido-mantequilla",
    name: "Vestido Mantequilla",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00008-918923f8d125ad365317733855065658-640-0.webp",
    route: "/vestidosgt/mantequilla",
    color: "Amarillo",
  },
  {
    id: "vestido-delicadeza",
    name: "Vestido Delicadeza",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00023-c3eb8abf96a4a7d17317733851168648-640-0.webp",
    route: "/vestidosgt/delicadeza",
    badge: "✨ ELEGANTE",
    color: "Beige",
  },
  {
    id: "vestido-rosas",
    name: "Vestido Rosas",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00032-346078d3c3b099336c17733849455091-640-0.webp",
    route: "/vestidosgt/rosas",
    color: "Rosa",
  },
  {
    id: "vestido-primavera-encantada",
    name: "Vestido Primavera Encantada",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00018-8c6bc97c376766631a17733845849206-640-0.webp",
    route: "/vestidosgt/primavera-encantada",
    badge: "🌿 NUEVO",
    color: "Verde Pastel",
  },
  {
    id: "vestido-encanto",
    name: "Vestido Encanto",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/img_00021-bf4c48275e383a9cba17733842661665-640-0.webp",
    route: "/vestidosgt/encanto",
    color: "Rosa",
  },
  {
    id: "vestido-oliva",
    name: "Vestido Oliva",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2026-01-16-06-20-21-837519d45f009cab7d17686857300095-640-0.webp",
    route: "/vestidosgt/oliva",
    badge: "🍃 NATURAL",
    color: "Verde",
  },
  {
    id: "vestido-ivory",
    name: "Vestido Ivory",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-23-04-08-04-d20fce37b1dcf060c317639473675389-640-0.webp",
    route: "/vestidosgt/ivory",
    color: "Beige",
  },
  {
    id: "vestido-terra",
    name: "Vestido Terra",
    price: 299,
    originalPrice: 599,
    image: "https://dcdn-us.mitiendanube.com/stores/006/470/948/products/facelab-2025-11-04-01-45-55-9d5a791a4098a6dd3417630279649919-640-0.webp",
    route: "/vestidosgt/terra",
    badge: "🖤 CLÁSICO",
    color: "Negro",
  },
];

const VestidosGT = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
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

      {/* Trust Bar */}
      <div className="bg-gradient-hero text-primary-foreground py-2">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Envío Gratis</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Pago Contra Entrega</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Garantía Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-pink-50 to-rose-50 py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <Badge className="bg-pink-600 text-white font-bold text-xs sm:text-sm px-4 py-1.5 mb-4">
            🇬🇹 Envío Gratis a toda Guatemala
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Vestidos Premium 👗
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Los vestidos más exclusivos con envío gratis y pago contra entrega
          </p>
          <p className="text-muted-foreground text-xs sm:text-sm mt-2">
            {products.length} productos disponibles
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              Nuestros Vestidos
            </h2>
            <span className="text-sm text-muted-foreground">
              {products.length} producto{products.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {products.map((product) => (
              <Link
                key={product.id}
                to={product.route}
                className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1">
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  {product.color && (
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                        {product.color}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-extrabold text-destructive">
                      Q{product.price}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">
                      Q{product.originalPrice}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <span className="inline-block w-full text-center bg-foreground text-background text-xs sm:text-sm font-bold py-2 rounded-lg group-hover:bg-primary transition-colors">
                      Ver Producto
                    </span>
                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground font-medium">
                      💵 Solo pagas al recibir
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
};

export default VestidosGT;
