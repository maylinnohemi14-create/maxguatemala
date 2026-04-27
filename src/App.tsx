import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TrackingPixels } from "@/components/TrackingPixels";
import Index from "./pages/Index";
import Proyector from "./pages/Proyector";
import Taladro from "./pages/Taladro";
import Gafas from "./pages/Gafas";
import Guatemala from "./pages/Guatemala";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import DownloadDepartamentos from "./pages/DownloadDepartamentos";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import PoliticaEnvios from "./pages/PoliticaEnvios";
import PoliticaDevoluciones from "./pages/PoliticaDevoluciones";
import Contacto from "./pages/Contacto";
import NinjaCrispi from "./pages/NinjaCrispi";
import UnderArmour from "./pages/UnderArmour";
import ConjuntosKit4 from "./pages/ConjuntosKit4";
import ConjuntosCL from "./pages/ConjuntosCL";
import ConjuntosCO from "./pages/ConjuntosCO";
import Feminino from "./pages/Feminino";
import VestidoKit4 from "./pages/VestidoKit4";
import VestidoKit3 from "./pages/VestidoKit3";
import VestidoElegance from "./pages/VestidoElegance";
import VestidoGlam from "./pages/VestidoGlam";
import VestidoDuo from "./pages/VestidoDuo";
import VestidoCorset from "./pages/VestidoCorset";
import VestidoNoche from "./pages/VestidoNoche";
import Refletiva from "./pages/Refletiva";
import Catalogo from "./pages/Catalogo";
import ConjuntosKit4CO from "./pages/ConjuntosKit4CO";
import Deportivo from "./pages/Deportivo";
import DeportivoCatalogo from "./pages/DeportivoCatalogo";
import DeportivoFuture from "./pages/DeportivoFuture";
import Jogger from "./pages/Jogger";
import Lino from "./pages/Lino";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <TrackingPixels />
        <Routes>
          <Route path="/" element={<Proyector />} />
          <Route path="/proyector" element={<Index />} />
          <Route path="/taladro" element={<Taladro />} />
          <Route path="/gafas" element={<Gafas />} />
          <Route path="/guatemala" element={<Guatemala />} />
          
          <Route path="/cocinaaire" element={<NinjaCrispi />} />
          <Route path="/conjuntosfit" element={<UnderArmour />} />
          <Route path="/colombiaconjunto" element={<ConjuntosKit4 />} />
          <Route path="/feminino" element={<Feminino />} />
          <Route path="/conjuntoscl" element={<ConjuntosCL />} />
          <Route path="/ropaconjuntos" element={<ConjuntosCO />} />
          <Route path="/feminino/vestido-kit4" element={<VestidoKit4 />} />
          <Route path="/feminino/vestido-kit3" element={<VestidoKit3 />} />
          <Route path="/feminino/elegance" element={<VestidoElegance />} />
          <Route path="/feminino/glam" element={<VestidoGlam />} />
          <Route path="/feminino/duo" element={<VestidoDuo />} />
          <Route path="/feminino/corset" element={<VestidoCorset />} />
          <Route path="/feminino/noche" element={<VestidoNoche />} />
          <Route path="/refletiva" element={<Refletiva />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contraentregaco" element={<ConjuntosKit4CO />} />
          <Route path="/deportivo" element={<Deportivo />} />
          <Route path="/deportivocatalogo" element={<DeportivoCatalogo />} />
          <Route path="/deportivofuture" element={<DeportivoFuture />} />
          <Route path="/jogger" element={<Jogger />} />
          <Route path="/elegancia" element={<Lino />} />
          <Route path="/lino" element={<Lino />} />
          
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/download-departamentos" element={<DownloadDepartamentos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
          <Route path="/politica-envios" element={<PoliticaEnvios />} />
          <Route path="/politica-devoluciones" element={<PoliticaDevoluciones />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
