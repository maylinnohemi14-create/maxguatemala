import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";

const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Términos y Condiciones</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: febrero 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, te recomendamos no utilizar nuestro sitio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Productos y Precios</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Los precios están expresados en Quetzales guatemaltecos (GTQ)</li>
              <li>Los precios incluyen impuestos aplicables</li>
              <li>Nos reservamos el derecho de modificar precios sin previo aviso</li>
              <li>Las promociones tienen vigencia limitada y están sujetas a disponibilidad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Proceso de Compra</h2>
            <p>Al realizar un pedido:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Debes proporcionar información veraz y completa</li>
              <li>El pedido se confirma mediante WhatsApp</li>
              <li>El pago se realiza contra entrega en efectivo</li>
              <li>Nos reservamos el derecho de rechazar pedidos por información incorrecta</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Envío y Entrega</h2>
            <p>El tiempo estimado de entrega es de 3 a 5 días hábiles para toda Guatemala. Los tiempos pueden variar según la ubicación y disponibilidad del producto. El envío es gratuito en todo el territorio guatemalteco.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Garantía</h2>
            <p>Todos nuestros productos cuentan con:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>30 días de garantía de satisfacción o devolución de dinero</li>
              <li>2 años de garantía del fabricante contra defectos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Propiedad Intelectual</h2>
            <p>Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, está protegido por derechos de propiedad intelectual. Queda prohibida su reproducción sin autorización previa.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Limitación de Responsabilidad</h2>
            <p>No nos hacemos responsables por daños indirectos derivados del uso de nuestros productos fuera de las especificaciones indicadas. Nuestra responsabilidad se limita al valor del producto adquirido.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Contacto</h2>
            <p>Para cualquier duda sobre estos términos, contáctanos a través de nuestra <Link to="/contacto" className="text-primary hover:underline">página de contacto</Link>.</p>
          </section>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
};

export default TerminosCondiciones;
