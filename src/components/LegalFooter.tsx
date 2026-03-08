import { Link } from "react-router-dom";

export const LegalFooter = () => {
  return (
    <footer className="bg-foreground text-background py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <h4 className="font-semibold mb-3 text-sm">Empresa</h4>
            <ul className="space-y-2 text-xs opacity-75">
              <li>MAX Guatemala Sociedad Anónima</li>
              <li>NIT: 33369003</li>
              <li>Guatemala, Guatemala</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-xs opacity-75">
              <li><Link to="/politica-privacidad" className="hover:opacity-100 transition-opacity">Política de Privacidad</Link></li>
              <li><Link to="/terminos-condiciones" className="hover:opacity-100 transition-opacity">Términos y Condiciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Compras</h4>
            <ul className="space-y-2 text-xs opacity-75">
              <li><Link to="/politica-envios" className="hover:opacity-100 transition-opacity">Política de Envíos</Link></li>
              <li><Link to="/politica-devoluciones" className="hover:opacity-100 transition-opacity">Política de Devoluciones</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Soporte</h4>
            <ul className="space-y-2 text-xs opacity-75">
              <li><Link to="/contacto" className="hover:opacity-100 transition-opacity">Contáctanos</Link></li>
              <li className="flex items-center gap-1">🔒 Sitio Seguro SSL</li>
              <li className="flex items-center gap-1">✅ Pago Contra Entrega</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-xs opacity-75">
            © 2026 MAX Guatemala Sociedad Anónima — NIT: 33369003. Todos los derechos reservados.
          </p>
          <p className="text-xs opacity-50 mt-1">
            Distribuidor autorizado de productos electrónicos en Guatemala.
          </p>
        </div>
      </div>
    </footer>
  );
};
