import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { LegalFooter } from "@/components/LegalFooter";
import maxHeader from "@/assets/max-header.png";
import { Truck, CreditCard, Shield, Star, ShoppingBag } from "lucide-react";

import vestidoAmareloFrente from "@/assets/vestido-amarelo-frente.jpg";
import vestidoRendaFrente from "@/assets/vestido-renda-frente.jpg";
import vestidoVerde2Frente from "@/assets/vestido-verde2-frente.jpg";
import vestidoBolinha2Frente from "@/assets/vestido-bolinha2-frente.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  route: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: "vestido-kit4",
    name: "Vestido Premium Kit 4 en 1",
    price: 299,
    originalPrice: 599,
    image: vestidoAmareloFrente,
    route: "/feminino/vestido-kit4",
    badge: "🔥 MÁS VENDIDO",
  },
  {
    id: "vestido-kit3",
    name: "Vestido Premium Kit 3 en 1",
    price: 299,
    originalPrice: 499,
    image: vestidoRendaFrente,
    route: "/feminino/vestido-kit3",
    badge: "✨ NUEVO",
  },
  {
    id: "vestido-elegance",
    name: "Vestido Elegance Kit 3 en 1",
    price: 299,
    originalPrice: 499,
    image: vestidoVerde2Frente,
    route: "/feminino/elegance",
    badge: "💎 EXCLUSIVO",
  },
  {
    id: "vestido-glam",
    name: "Vestido Glam Kit 4 en 1",
    price: 299,
    originalPrice: 599,
    image: vestidoBolinha2Frente,
    route: "/feminino/glam",
    badge: "🔥 TOP VENTAS",
  },
];

const Feminino = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* MAX Header */}
      <div className="w-full bg-white">
        <img src={maxHeader} alt="MAX Guatemala - Tienda Online" className="w-full h-auto object-contain sm:object-cover max-h-[120px] sm:max-h-none mx-auto sm:mx-0 p-2 sm:p-0" />
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
            Moda Femenina Premium 👗
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Los vestidos y outfits más exclusivos con envío gratis y pago contra entrega
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              Nuestros Productos
            </h2>
            <span className="text-sm text-muted-foreground">{products.length} producto{products.length !== 1 ? 's' : ''}</span>
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
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1">
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg sm:text-xl font-extrabold text-destructive">Q{product.price}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground line-through">Q{product.originalPrice}</span>
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <span className="inline-block w-full text-center bg-foreground text-background text-xs sm:text-sm font-bold py-2 rounded-lg group-hover:bg-primary transition-colors">
                      Ver Producto
                    </span>
                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground font-medium">💵 Solo pagas al recibir</p>
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

export default Feminino;
