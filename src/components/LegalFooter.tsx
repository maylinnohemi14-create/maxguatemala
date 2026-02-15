import { Link } from "react-router-dom";

export const LegalFooter = () => {
  return (
    <footer className="bg-foreground text-background py-8 sm:py-12">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Seguridad</h4>
            <ul className="space-y-2 text-xs opacity-75">
              <li className="flex items-center gap-1">🔒 Sitio Seguro SSL</li>
              <li className="flex items-center gap-1">✅ Pago Contra Entrega</li>
              <li className="flex items-center gap-1">🛡️ Garantía 2 Años</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-xs opacity-75">
            © 2024 VEVSHAO. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
