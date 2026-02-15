import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";

const PoliticaEnvios = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Política de Envíos</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: febrero 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Cobertura de Envío</h2>
            <p>Realizamos envíos a todo el territorio de Guatemala, incluyendo todos los departamentos y sus municipios principales.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Costo de Envío</h2>
            <p><strong>¡Envío completamente GRATIS!</strong> No cobramos ningún cargo adicional por el envío de tu pedido a cualquier parte de Guatemala.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Tiempo de Entrega</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Ciudad de Guatemala y zonas metropolitanas:</strong> 2 a 3 días hábiles</li>
              <li><strong>Resto de departamentos:</strong> 3 a 5 días hábiles</li>
              <li><strong>Zonas rurales:</strong> 5 a 7 días hábiles</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">Los tiempos pueden variar en temporadas de alta demanda o por condiciones climáticas.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Empresa de Mensajería</h2>
            <p>Trabajamos con empresas de mensajería certificadas para garantizar que tu pedido llegue en perfectas condiciones y a tiempo.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Seguimiento del Pedido</h2>
            <p>Una vez despachado tu pedido, recibirás una confirmación por WhatsApp con los detalles de entrega. Podrás comunicarte con nosotros en cualquier momento para conocer el estado de tu envío.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Recepción del Pedido</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>El pago se realiza en efectivo al momento de recibir el producto</li>
              <li>Verifica el estado del paquete antes de aceptar la entrega</li>
              <li>Si el paquete presenta daños visibles, puedes rechazarlo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Problemas con el Envío</h2>
            <p>Si tienes algún problema con tu envío, contáctanos inmediatamente a través de nuestra <Link to="/contacto" className="text-primary hover:underline">página de contacto</Link> y resolveremos tu situación lo antes posible.</p>
          </section>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
};

export default PoliticaEnvios;
