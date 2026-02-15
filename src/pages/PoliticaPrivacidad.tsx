import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";

const PoliticaPrivacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: febrero 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Información que Recopilamos</h2>
            <p>Recopilamos la siguiente información cuando realizas un pedido:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nombre completo y apellidos</li>
              <li>Número de teléfono</li>
              <li>Dirección de entrega (departamento, ciudad, dirección)</li>
              <li>Correo electrónico (opcional)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Uso de la Información</h2>
            <p>Tu información personal se utiliza exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Procesar y entregar tu pedido</li>
              <li>Comunicarnos contigo sobre el estado de tu orden</li>
              <li>Mejorar nuestros servicios y experiencia de compra</li>
              <li>Enviar confirmaciones de compra por WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Protección de Datos</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra acceso no autorizado, pérdida o alteración. Utilizamos conexiones cifradas (SSL/TLS) para la transmisión de datos.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Compartición de Datos</h2>
            <p>No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Con empresas de mensajería para la entrega de tu pedido</li>
              <li>Cuando sea requerido por ley o autoridades competentes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Cookies y Tecnologías de Rastreo</h2>
            <p>Utilizamos cookies y píxeles de seguimiento (Facebook Pixel, TikTok Pixel) para mejorar la experiencia del usuario y medir la efectividad de nuestras campañas publicitarias. Estas herramientas recopilan datos anónimos de navegación.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al tratamiento de tus datos</li>
            </ul>
            <p>Para ejercer estos derechos, contáctanos a través de nuestra <Link to="/contacto" className="text-primary hover:underline">página de contacto</Link>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Cambios en esta Política</h2>
            <p>Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio será publicado en esta página con la fecha de actualización correspondiente.</p>
          </section>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
};

export default PoliticaPrivacidad;
