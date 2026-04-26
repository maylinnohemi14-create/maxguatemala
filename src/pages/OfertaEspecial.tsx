import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

import linoBeige from "@/assets/lino-beige.jpg";

const TARGET_ROUTE = "/elegancia";

const OfertaEspecial = () => {
  const navigate = useNavigate();

  const handleGoToOffer = () => {
    navigate(TARGET_ROUTE);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header simple y editorial */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold tracking-wide">Tendencias 2026</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Edición especial
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 md:py-16">
        {/* Hero editorial */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Lifestyle · Moda Masculina
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Descubre la elegancia que está marcando tendencia esta temporada
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              Una nueva propuesta en moda masculina que combina frescura,
              comodidad y un estilo refinado pensado para el día a día.
              Conoce la selección que prepararon nuestros estilistas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                size="lg"
                onClick={handleGoToOffer}
                className="text-base font-semibold"
              >
                Ver oferta
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleGoToOffer}
                className="text-base"
              >
                Conocer más
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>Envío a todo el país</span>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <img
                src={linoBeige}
                alt="Estilo elegante para hombre - tendencias de la temporada"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Sección editorial extra */}
        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <article className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2">Comodidad ante todo</h3>
            <p className="text-sm text-muted-foreground">
              Telas suaves y transpirables, ideales para el clima cálido y
              para lucir bien en cualquier ocasión.
            </p>
          </article>
          <article className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2">Estilo versátil</h3>
            <p className="text-sm text-muted-foreground">
              Combinaciones pensadas para lucir bien tanto en una reunión
              casual como en una salida de fin de semana.
            </p>
          </article>
          <article className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-2">Tendencia del momento</h3>
            <p className="text-sm text-muted-foreground">
              La selección favorita de nuestros clientes esta temporada,
              con disponibilidad limitada.
            </p>
          </article>
        </section>

        {/* CTA final */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            ¿Listo para conocer la oferta?
          </h2>
          <p className="text-muted-foreground mb-6">
            Haz clic abajo y descubre todos los detalles.
          </p>
          <Button
            size="lg"
            onClick={handleGoToOffer}
            className="text-base font-semibold px-8"
          >
            Ver oferta ahora
          </Button>
        </section>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Contenido editorial de moda
        </div>
      </footer>
    </div>
  );
};

export default OfertaEspecial;
