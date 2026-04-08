import { useState, useEffect, useRef, useCallback } from "react";
import selosConfianza from "@/assets/selos-confianza.jpg";
import { trackTikTokConversion, trackFacebookConversion, identifyTikTokUser, trackTikTokPurchase } from "@/hooks/useTrackingPixels";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Package, AlertTriangle, CheckCircle, Shield, Truck, Award, LockKeyhole } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import guaranteeBadge from "@/assets/guarantee-badge.png";

import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Departamentos de Colombia
const DEPARTAMENTOS = [
  "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ATLÁNTICO", "BOGOTÁ D.C.", "BOLÍVAR",
  "BOYACÁ", "CALDAS", "CAQUETÁ", "CASANARE", "CAUCA", "CESAR", "CHOCÓ",
  "CÓRDOBA", "CUNDINAMARCA", "GUAINÍA", "GUAVIARE", "HUILA", "LA GUAJIRA",
  "MAGDALENA", "META", "NARIÑO", "NORTE DE SANTANDER", "PUTUMAYO", "QUINDÍO",
  "RISARALDA", "SAN ANDRÉS Y PROVIDENCIA", "SANTANDER", "SUCRE", "TOLIMA",
  "VALLE DEL CAUCA", "VAUPÉS", "VICHADA"
];

const CIUDADES_POR_DEPARTAMENTO: Record<string, string[]> = {
  "AMAZONAS": ["Leticia", "Puerto Nariño"],
  "ANTIOQUIA": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro", "Caucasia", "Copacabana", "La Estrella", "Sabaneta", "Caldas", "Girardota", "Barbosa", "Marinilla", "El Carmen de Viboral", "La Ceja", "Chigorodó", "Carepa", "Yarumal", "Santa Rosa de Osos", "Andes", "Cisneros", "Don Matías", "Guatapé", "Jardín", "Jericó", "Puerto Berrío", "Segovia", "Sonsón", "Támesis", "Urrao", "Necoclí"],
  "ARAUCA": ["Arauca", "Saravena", "Tame", "Fortul", "Arauquita"],
  "ATLÁNTICO": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Baranoa", "Galapa", "Puerto Colombia", "Palmar de Varela", "Juan de Acosta", "Luruaco", "Repelón", "Santo Tomás", "Polonuevo"],
  "BOGOTÁ D.C.": ["Bogotá"],
  "BOLÍVAR": ["Cartagena", "Magangué", "Turbaco", "Arjona", "Carmen de Bolívar", "San Juan Nepomuceno", "Simití", "Mompox", "Turbana", "El Guamo", "María la Baja"],
  "BOYACÁ": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Puerto Boyacá", "Moniquirá", "Villa de Leyva", "Nobsa", "Samacá", "Garagoa", "Miraflores"],
  "CALDAS": ["Manizales", "La Dorada", "Chinchiná", "Villamaría", "Riosucio", "Anserma", "Supía", "Neira", "Aguadas", "Pensilvania", "Manzanares"],
  "CAQUETÁ": ["Florencia", "San Vicente del Caguán", "El Doncello", "Puerto Rico", "Belén de los Andaquíes", "Morelia"],
  "CASANARE": ["Yopal", "Aguazul", "Villanueva", "Tauramena", "Monterrey", "Paz de Ariporo", "Maní"],
  "CAUCA": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Piendamó", "El Tambo", "Patía", "Miranda", "Corinto", "Guapi", "Bolívar"],
  "CESAR": ["Valledupar", "Aguachica", "Codazzi", "Bosconia", "La Jagua de Ibirico", "Chimichagua", "Curumaní", "El Copey", "Pailitas", "San Alberto"],
  "CHOCÓ": ["Quibdó", "Istmina", "Tadó", "Condoto", "Bahía Solano", "Nuquí"],
  "CÓRDOBA": ["Montería", "Lorica", "Cereté", "Sahagún", "Planeta Rica", "Tierralta", "Montelíbano", "San Pelayo", "Ciénaga de Oro", "San Carlos"],
  "CUNDINAMARCA": ["Soacha", "Facatativá", "Zipaquirá", "Chía", "Fusagasugá", "Girardot", "Madrid", "Mosquera", "Funza", "Cajicá", "Sibaté", "Tocancipá", "Sopó", "La Calera", "Cota", "Tabio", "Tenjo", "Villeta", "La Mesa", "Anapoima", "Gachancipá", "Cogua", "Nemocón", "Pacho", "Ubaté", "Guaduas"],
  "GUAINÍA": ["Inírida"],
  "GUAVIARE": ["San José del Guaviare"],
  "HUILA": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre", "Palermo", "San Agustín", "Aipe", "Algeciras", "Rivera"],
  "LA GUAJIRA": ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar", "Fonseca", "Villanueva", "Barrancas"],
  "MAGDALENA": ["Santa Marta", "Ciénaga", "Fundación", "El Banco", "Aracataca", "Plato", "Pivijay", "Zona Bananera"],
  "META": ["Villavicencio", "Acacías", "Granada", "Puerto López", "San Martín", "Cumaral", "Restrepo", "Guamal", "Castilla la Nueva"],
  "NARIÑO": ["Pasto", "Tumaco", "Ipiales", "La Unión", "Túquerres", "Samaniego", "Barbacoas", "El Charco"],
  "NORTE DE SANTANDER": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios", "El Zulia", "Tibú", "Chinácota", "Ábrego", "Convención"],
  "PUTUMAYO": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "Villagarzón", "Puerto Caicedo"],
  "QUINDÍO": ["Armenia", "Calarcá", "Montenegro", "La Tebaida", "Circasia", "Quimbaya", "Filandia", "Salento"],
  "RISARALDA": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella", "Belén de Umbría", "Quinchía"],
  "SAN ANDRÉS Y PROVIDENCIA": ["San Andrés", "Providencia"],
  "SANTANDER": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "San Gil", "Socorro", "Barbosa", "Málaga", "Lebrija", "Zapatoca"],
  "SUCRE": ["Sincelejo", "Corozal", "San Marcos", "Tolú", "Sampués", "San Onofre", "Ovejas", "Coveñas", "Majagual"],
  "TOLIMA": ["Ibagué", "Espinal", "Melgar", "Chaparral", "Honda", "Mariquita", "Líbano", "Flandes", "Guamo", "Lérida", "Fresno", "Purificación"],
  "VALLE DEL CAUCA": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Buga", "Cartago", "Jamundí", "Yumbo", "Candelaria", "Florida", "Pradera", "Dagua", "Caicedonia", "Sevilla", "Zarzal", "Roldanillo", "El Cerrito", "Ginebra"],
  "VAUPÉS": ["Mitú"],
  "VICHADA": ["Puerto Carreño"],
};

const formSchema = z.object({
  nombres: z.string().min(2, "Nombre debe tener al menos 2 caracteres").max(50),
  apellidos: z.string().min(2, "Apellido debe tener al menos 2 caracteres").max(50),
  direccion: z.string().min(10, "Dirección debe ser más detallada").max(200),
  complemento: z.string().max(100).optional().or(z.literal("")),
  departamento: z.string().min(1, "Seleccione un departamento"),
  ciudad: z.string().min(1, "Seleccione una ciudad"),
  telefono: z.string().regex(/^[0-9]{4,15}$/, "Ingrese un número de teléfono válido"),
  email: z.string().email("Por favor, ingrese un correo electrónico válido").optional().or(z.literal("")),
  nota: z.string().max(500).optional(),
});

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 15);

type FormValues = z.infer<typeof formSchema>;

export interface IncludedItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SizeDetail {
  name: string;
  image: string;
  topSize: string;
  bottomSize: string;
  topLabel?: string;
  bottomLabel?: string;
}

interface CODFormColombiaProps {
  productId: string;
  productPrice: number;
  productName?: string;
  productImage?: string;
  onOrderComplete?: () => void;
  includedItems?: IncludedItem[];
  sizeDetails?: SizeDetail[];
  productDisplayName?: string;
  tiktokPixelId?: string;
  facebookPixelId?: string;
  idVariable?: string;
  defaultNota?: string;
}

const DEFAULT_INCLUDED_ITEMS: IncludedItem[] = [
  { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' },
];

export function CODFormColombia({ productId, productPrice, productName = "Producto", productImage, onOrderComplete, includedItems = DEFAULT_INCLUDED_ITEMS, sizeDetails, productDisplayName, tiktokPixelId, facebookPixelId, idVariable, defaultNota }: CODFormColombiaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [phoneBlocked, setPhoneBlocked] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [upsells, setUpsells] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    includedItems.forEach(item => {
      initial[item.id] = true;
    });
    return initial;
  });
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 11) + 10);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      direccion: "",
      complemento: "",
      departamento: "",
      ciudad: "",
      telefono: "",
      email: "",
      nota: "",
    },
  });

  useEffect(() => {
    const getIp = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-client-ip');
        if (error) throw error;
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error getting IP:', error);
      }
    };
    getIp();
  }, []);

  const [hasTrackedInitiateCheckout, setHasTrackedInitiateCheckout] = useState(false);

  const handleFormInteraction = () => {
    if (!hasTrackedInitiateCheckout) {
      trackTikTokConversion('InitiateCheckout', {
        contents: [{ content_id: productId, content_type: 'product', content_name: productName || productId, quantity: 1, price: productPrice }],
        value: productPrice,
        currency: 'COP',
        content_category: 'Conjuntos Deportivos',
      }, tiktokPixelId);
      trackFacebookConversion('InitiateCheckout', {
        content_ids: [productId],
        content_type: 'product',
        value: productPrice,
        currency: 'COP'
      }, facebookPixelId);
      setHasTrackedInitiateCheckout(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(Math.floor(Math.random() * 11) + 10);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // === Abandoned Cart Tracking ===
  const orderSubmittedRef = useRef(false);
  const submitLockRef = useRef(false);
  const lastSavedAbandonedPhoneRef = useRef<string | null>(null);

  const saveAbandonedCart = useCallback(async ({ keepalive = false }: { keepalive?: boolean } = {}) => {
    if (orderSubmittedRef.current || phoneBlocked) return;
    const telefono = normalizePhone(form.getValues('telefono') || '');
    if (!telefono || !/^[0-9]{4,15}$/.test(telefono)) return;
    if (lastSavedAbandonedPhoneRef.current === telefono) return;

    const nombres = form.getValues('nombres') || '';
    const page_url = window.location.pathname;
    const body = { nombres, telefono, page_url, product_id: productId };
    const payload = JSON.stringify(body);
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-abandoned-cart`;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    lastSavedAbandonedPhoneRef.current = telefono;

    try {
      const response = await fetch(url, {
        method: 'POST',
        keepalive,
        headers: {
          'Content-Type': 'application/json',
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
        },
        body: payload,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }
    } catch (error) {
      lastSavedAbandonedPhoneRef.current = null;
      console.error('Error saving abandoned cart:', error);
    }
  }, [phoneBlocked, productId, form]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') void saveAbandonedCart({ keepalive: true });
    };
    const handleBeforeUnload = () => void saveAbandonedCart({ keepalive: true });
    const handlePageHide = () => void saveAbandonedCart({ keepalive: true });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [saveAbandonedCart]);

  const watchedPhone = form.watch('telefono');
  const selectedDepartamento = form.watch("departamento");
  const availableCiudades = selectedDepartamento ? CIUDADES_POR_DEPARTAMENTO[selectedDepartamento] || [] : [];

  useEffect(() => {
    const telefono = normalizePhone(watchedPhone || '');
    if (orderSubmittedRef.current || phoneBlocked || !/^[0-9]{4,15}$/.test(telefono)) return;
    const timeoutId = window.setTimeout(() => void saveAbandonedCart(), 600);
    return () => window.clearTimeout(timeoutId);
  }, [watchedPhone, phoneBlocked, saveAbandonedCart]);

  const onSubmit = async (data: FormValues) => {
    const normalizedPhone = normalizePhone(data.telefono);
    let resolvedClientIp = clientIp;

    if (submitLockRef.current || isSubmitting) return;
    if (phoneBlocked) {
      toast.error("Ya realizaste una compra anteriormente", {
        description: "Solo se permite una compra por persona.",
      });
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    orderSubmittedRef.current = true;

    try {
      const { data: ipCheck } = await supabase.functions.invoke('get-client-ip', {
        body: { phone: normalizedPhone },
      });
      if (ipCheck?.isPhoneBlocked) {
        setPhoneBlocked(true);
        toast.error("Ya realizaste una compra anteriormente", {
          description: "Solo se permite una compra por persona.",
        });
        setIsSubmitting(false);
        submitLockRef.current = false;
        orderSubmittedRef.current = false;
        return;
      }
      if (ipCheck?.ip) {
        resolvedClientIp = ipCheck.ip;
        setClientIp(ipCheck.ip);
      }
    } catch (e) {
      console.error('Error re-checking IP (continuing with purchase):', e);
    }

    const purchaseEventId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      await identifyTikTokUser({ email: data.email || undefined, phone: normalizedPhone, externalId: normalizedPhone });
    } catch (e) { console.error('TikTok identify failed:', e); }

    try {
      await trackTikTokPurchase({
        productId, productName: productName || productId, value: productPrice, currency: 'COP',
        email: data.email || undefined, phone: normalizedPhone, externalId: normalizedPhone,
        ip: resolvedClientIp || undefined, pixelId: tiktokPixelId, eventId: purchaseEventId,
      });
    } catch (e) { console.error('TikTok CompletePayment failed:', e); }

    try {
      trackFacebookConversion('Purchase', {
        content_ids: [productId], content_type: 'product', content_name: productName || productId,
        value: productPrice, currency: 'COP', num_items: 1
      }, facebookPixelId);
    } catch (e) { console.error('Facebook Purchase failed:', e); }

    try { trackFacebookConversion('Lead', { content_name: productName || productId, value: productPrice, currency: 'COP' }, facebookPixelId); } catch (e) {}

    if (tiktokPixelId) {
      try {
        await supabase.functions.invoke('tiktok-events-api', {
          body: {
            pixel_id: tiktokPixelId, event: 'CompletePayment', event_id: purchaseEventId,
            timestamp: Math.floor(Date.now() / 1000), user_agent: navigator.userAgent,
            ip: resolvedClientIp || undefined, page_url: window.location.href, page_referrer: document.referrer || '',
            email: data.email || undefined, phone: normalizedPhone, external_id: normalizedPhone,
            ttclid: new URLSearchParams(window.location.search).get('ttclid') || '',
            ttp: document.cookie.match(/(?:^| )_ttp=([^;]+)/)?.[1] || '',
            content_id: productId, content_name: productName || productId, content_type: 'product',
            value: productPrice, currency: 'COP', quantity: 1,
          },
        });
      } catch (e) { console.error('TikTok Server-Side failed:', e); }
    }

    try {
      const { error } = await supabase.from('orders').insert({
        nombres: data.nombres,
        apellidos: data.apellidos,
        direccion_y_barrio: data.complemento ? `${data.direccion}, ${data.complemento}` : data.direccion,
        departamento: data.departamento,
        ciudad: data.ciudad,
        telefono: normalizedPhone,
        email: data.email || null,
        colonia: null,
        nota: data.nota || defaultNota || null,
        id_producto: productId,
        id_variable: idVariable || null,
        cantidad: 1,
        precio_total: productPrice.toString(),
        con_recaudo: 'SI',
        ip_address: resolvedClientIp,
      });

      if (error) throw error;

      try {
        await supabase.from('blocked_phones').insert({ telefono: normalizedPhone });
      } catch (e) { console.error('Error saving blocked phone:', e); }
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: { precio_total: `$${productPrice.toLocaleString('es-CO')} COP` }
        });
      } catch (telegramError) {
        console.error('Error sending Telegram notification:', telegramError);
      }
      try {
        await supabase.from('abandoned_carts').delete().eq('telefono', normalizedPhone);
      } catch (e) {}

      form.reset();
      setShowSuccessDialog(true);
    } catch (error: any) {
      orderSubmittedRef.current = false;
      console.error("Error al registrar pedido:", error);
      toast.error("Error al registrar pedido: " + (error.message || "Intenta nuevamente"));
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (phoneBlocked && !showSuccessDialog) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
          <h3 className="text-xl font-bold text-amber-600">Ya realizaste una compra</h3>
          <p className="text-muted-foreground">Solo se permite una compra por persona. Si tienes alguna duda, contáctanos por WhatsApp.</p>
        </div>
      </div>
    );
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    onOrderComplete?.();
  };

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`;

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="w-[calc(100vw-16px)] max-w-lg max-h-[95dvh] overflow-x-hidden overflow-y-auto p-4 sm:p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-3 sm:space-y-4 py-2 max-w-full overflow-x-hidden">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center justify-center gap-1 sm:gap-2">
              <span>🎉</span><span>¡Tu compra se ha realizado con éxito!</span><span>🎉</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Tu pedido llegará a tu domicilio en un plazo de 3 a 5 días hábiles
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 animate-pulse">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg">
                <span className="text-green-600">✅</span>
                Contamos con 2 años de garantía
              </p>
            </div>
            <div className="pt-2">
              <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">Para cualquier duda llama al WhatsApp</p>
              <a
                href="https://wa.me/573001234567?text=Hola,%20acabo%20de%20realizar%20una%20compra%20y%20tengo%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-8 rounded-full transition-colors text-base sm:text-lg animate-pulse text-center"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="break-words">WhatsApp Colombia</span>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 pt-3 sm:pt-4 border-t">
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Producto Original</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Envío Gratis</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">2 Años Garantía</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Pago Seguro</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mt-2">
              <p className="font-semibold text-foreground text-sm sm:text-base">¡Gracias por confiar en nosotros!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Viewers */}
      <div className="flex max-w-full items-center justify-center gap-2 py-2 px-4 bg-destructive/10 rounded-lg border border-destructive/20 overflow-x-hidden">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
        <span className="text-sm font-medium text-destructive text-center break-words">
          {viewerCount} personas están viendo este producto
        </span>
      </div>

      {/* Order Summary */}
      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 w-full max-w-full overflow-x-hidden">
        <div className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {productImage && !sizeDetails && (
              <img src={productImage} alt={productName} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-white shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-foreground break-words">{productDisplayName || productName}</h3>
              <div className="flex flex-wrap items-baseline gap-2 mt-1">
                <span className="text-sm font-semibold text-muted-foreground">Total a pagar:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-destructive">
                  {formatPrice(productPrice)}
                </span>
              </div>
            </div>
          </div>
          {sizeDetails && sizeDetails.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {sizeDetails.map((detail, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border min-w-0">
                  <img src={detail.image} alt={detail.name} className="w-10 h-10 rounded-md object-cover shrink-0" />
                  <div className="text-xs min-w-0">
                    <span className="font-bold text-foreground block break-words">{detail.name}</span>
                    <span className="text-muted-foreground break-words">{detail.topLabel || 'Camiseta'}: {detail.topSize}</span>
                    <br />
                    <span className="text-muted-foreground break-words">{detail.bottomLabel || 'Pantalón'}: {detail.bottomSize}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Included Items */}
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-xs sm:text-sm font-semibold text-foreground">Incluye GRATIS:</p>
          {includedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-success/10 border border-success/20 min-w-0">
              <Checkbox
                id={item.id}
                checked={upsells[item.id]}
                onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, [item.id]: !!checked }))}
                className="border-success data-[state=checked]:bg-success shrink-0"
              />
              <label htmlFor={item.id} className="flex-1 cursor-pointer min-w-0">
                <span className="text-sm font-medium flex items-center gap-1.5 min-w-0">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="break-words">{item.title}</span>
                </span>
                <p className="text-xs text-muted-foreground break-words">{item.description}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleFormInteraction} className="space-y-3 sm:space-y-4 w-full max-w-full overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Nombres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} className="w-full text-base" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tus apellidos" {...field} className="w-full text-base" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          {/* Departamento & Ciudad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Departamento *</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("ciudad", "");
                  }} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full text-base bg-background min-w-0">
                        <SelectValue placeholder="Selecciona departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {DEPARTAMENTOS.map((dep) => (
                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Ciudad *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartamento}>
                    <FormControl>
                      <SelectTrigger className="w-full text-base bg-background min-w-0">
                        <SelectValue placeholder="Selecciona ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {availableCiudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>{ciudad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Dirección completa *</FormLabel>
                <FormControl>
                  <Input placeholder="Calle, número, barrio" {...field} className="w-full text-base" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Complemento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apto, torre, conjunto, etc." {...field} className="w-full text-base" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Teléfono / Celular *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="3001234567"
                      {...field}
                      onChange={(e) => field.onChange(normalizePhone(e.target.value))}
                      className="w-full text-base"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Correo electrónico (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} className="w-full text-base" type="email" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nota"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Nota adicional (opcional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="¿Alguna indicación especial para la entrega?" {...field} className="w-full text-base min-h-[60px]" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          {/* Trust Seals */}
          <div className="flex justify-center py-2">
            <img src={selosConfianza} alt="Sellos de confianza" className="h-10 sm:h-14 object-contain" />
          </div>

          {/* Guarantee badge */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
            <img src={guaranteeBadge} alt="Garantía" className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">Garantía de Satisfacción</p>
              <p className="text-xs text-muted-foreground">Si no quedas satisfecho, te devolvemos tu dinero. Sin preguntas.</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 sm:py-6 text-base sm:text-lg font-bold bg-[#E31837] hover:bg-[#C41430] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Package className="w-5 h-5 mr-2" />
                CONFIRMAR PEDIDO - Pago Contra Entrega
              </>
            )}
          </Button>

          <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
            🔒 Tus datos están protegidos. Pagas al recibir tu producto.
          </p>
        </form>
      </Form>
    </div>
  );
}
