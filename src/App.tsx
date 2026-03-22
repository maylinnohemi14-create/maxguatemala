import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TrackingPixels } from "@/components/TrackingPixels";
import Index from "./pages/Index";
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
import Feminino from "./pages/Feminino";
import VestidoKit4 from "./pages/VestidoKit4";
import VestidoKit3 from "./pages/VestidoKit3";
import VestidoElegance from "./pages/VestidoElegance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <TrackingPixels />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/taladro" element={<Taladro />} />
          <Route path="/gafas" element={<Gafas />} />
          <Route path="/guatemala" element={<Guatemala />} />
          
          <Route path="/crispi" element={<NinjaCrispi />} />
          <Route path="/conjuntos" element={<UnderArmour />} />
          <Route path="/feminino" element={<Feminino />} />
          <Route path="/feminino/vestido-kit4" element={<VestidoKit4 />} />
          <Route path="/feminino/vestido-kit3" element={<VestidoKit3 />} />
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
