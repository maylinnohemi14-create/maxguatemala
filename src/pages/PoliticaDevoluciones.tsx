import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LegalFooter } from "@/components/LegalFooter";

const PoliticaDevoluciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Política de Devoluciones y Reembolsos</h1>
        <p className="text-sm text-muted-foreground mb-8">Última actualización: febrero 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Garantía de Satisfacción</h2>
            <p>Ofrecemos una <strong>garantía de satisfacción de 30 días</strong>. Si no estás completamente satisfecho con tu compra, puedes solicitar una devolución o cambio dentro de los primeros 30 días calendario después de recibir el producto.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Condiciones para Devolución</h2>
            <p>Para que tu devolución sea aceptada, el producto debe:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Estar en su empaque original</li>
              <li>No presentar daños causados por mal uso</li>
              <li>Incluir todos los accesorios y manuales</li>
              <li>Ser solicitada dentro de los 30 días posteriores a la entrega</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Proceso de Devolución</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Contáctanos a través de nuestra <Link to="/contacto" className="text-primary hover:underline">página de contacto</Link></li>
              <li>Indica tu número de pedido y motivo de devolución</li>
              <li>Te enviaremos instrucciones para el envío de retorno</li>
              <li>Una vez recibido y verificado el producto, procesaremos tu reembolso</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Reembolsos</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Los reembolsos se procesan dentro de 5 a 10 días hábiles</li>
              <li>El reembolso se realiza por el mismo medio de pago utilizado</li>
              <li>El monto reembolsado corresponde al valor del producto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Productos Defectuosos</h2>
            <p>Si tu producto llega con defectos de fabricación:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contáctanos inmediatamente con fotos o video del defecto</li>
              <li>Te enviaremos un reemplazo sin costo adicional</li>
              <li>La garantía del fabricante cubre 2 años contra defectos de fabricación</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Exclusiones</h2>
            <p>No se aceptan devoluciones por:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Daños causados por mal uso o negligencia</li>
              <li>Productos modificados por el cliente</li>
              <li>Desgaste normal por uso</li>
              <li>Solicitudes fuera del plazo de 30 días</li>
            </ul>
          </section>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
};

export default PoliticaDevoluciones;
