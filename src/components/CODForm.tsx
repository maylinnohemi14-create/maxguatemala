import { useState, useEffect } from "react";
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
import { Loader2, Package, DollarSign, AlertTriangle, CheckCircle, Shield, Truck, Award, LockKeyhole } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import guaranteeBadge from "@/assets/guarantee-badge.png";
import trustSeals from "@/assets/trust-seals.jpg";
import testimonialConfidence from "@/assets/testimonial-confidence.gif";
import { trackFacebookConversion, trackTikTokConversion } from "@/hooks/useTrackingPixels";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEPARTAMENTOS = [
  "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ATLANTICO", "BOLIVAR", "BOYACA",
  "CALDAS", "CAQUETA", "CASANARE", "CAUCA", "CESAR", "CHOCO",
  "CORDOBA", "CUNDINAMARCA", "GUAINIA", "GUAVIARE", "HUILA", "LA GUAJIRA",
  "MAGDALENA", "META", "NARIÑO", "NORTE DE SANTANDER", "PUTUMAYO", "QUINDIO",
  "RISARALDA", "SAN ANDRES Y PROVIDENCIA", "SANTANDER", "SUCRE", "TOLIMA",
  "VALLE DEL CAUCA", "VAUPES", "VICHADA"
];

const CIUDADES_POR_DEPARTAMENTO: Record<string, string[]> = {
  "AMAZONAS": ["Leticia", "Puerto Nariño"],
  "ANTIOQUIA": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro", "Caucasia", "Sabaneta", "La Estrella"],
  "ARAUCA": ["Arauca", "Arauquita", "Saravena", "Tame", "Fortul"],
  "ATLANTICO": ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Puerto Colombia", "Galapa"],
  "BOLIVAR": ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar", "Mompós"],
  "BOYACA": ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa", "Villa de Leyva", "Nobsa"],
  "CALDAS": ["Manizales", "La Dorada", "Chinchiná", "Villamaría", "Riosucio", "Aguadas"],
  "CAQUETA": ["Florencia", "San Vicente del Caguán", "Puerto Rico", "El Doncello", "Belén de los Andaquíes"],
  "CASANARE": ["Yopal", "Aguazul", "Villanueva", "Monterrey", "Tauramena", "Paz de Ariporo"],
  "CAUCA": ["Popayán", "Santander de Quilichao", "Puerto Tejada", "Patía", "Guachené", "Miranda"],
  "CESAR": ["Valledupar", "Aguachica", "Codazzi", "Bosconia", "La Paz", "Chimichagua"],
  "CHOCO": ["Quibdó", "Istmina", "Condoto", "Tadó", "Bahía Solano", "Nuquí"],
  "CORDOBA": ["Montería", "Lorica", "Cereté", "Sahagún", "Planeta Rica", "Montelíbano"],
  "CUNDINAMARCA": ["Bogotá", "Soacha", "Fusagasugá", "Facatativá", "Chía", "Zipaquirá", "Girardot", "Cajicá", "Madrid", "Funza", "Mosquera", "La Calera"],
  "GUAINIA": ["Inírida", "Barranco Minas"],
  "GUAVIARE": ["San José del Guaviare", "Calamar", "El Retorno"],
  "HUILA": ["Neiva", "Pitalito", "Garzón", "La Plata", "Campoalegre"],
  "LA GUAJIRA": ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar"],
  "MAGDALENA": ["Santa Marta", "Ciénaga", "Fundación", "Plato", "El Banco"],
  "META": ["Villavicencio", "Acacías", "Granada", "Puerto López", "San Martín"],
  "NARIÑO": ["Pasto", "Tumaco", "Ipiales", "Túquerres", "Samaniego"],
  "NORTE DE SANTANDER": ["Cúcuta", "Ocaña", "Pamplona", "Villa del Rosario", "Los Patios"],
  "PUTUMAYO": ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez", "San Miguel"],
  "QUINDIO": ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya", "Circasia"],
  "RISARALDA": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella"],
  "SAN ANDRES Y PROVIDENCIA": ["San Andrés", "Providencia"],
  "SANTANDER": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja", "Socorro"],
  "SUCRE": ["Sincelejo", "Corozal", "Tolú", "Sampués", "Majagual"],
  "TOLIMA": ["Ibagué", "Espinal", "Melgar", "Honda", "Líbano", "Chaparral"],
  "VALLE DEL CAUCA": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago", "Buga", "Jamundí", "Yumbo"],
  "VAUPES": ["Mitú", "Caruru"],
  "VICHADA": ["Puerto Carreño", "La Primavera", "Cumaribo"]
};

const formSchema = z.object({
  nombres: z.string().min(2, "Nombre debe tener al menos 2 caracteres").max(50),
  apellidos: z.string().min(2, "Apellido debe tener al menos 2 caracteres").max(50),
  direccion: z.string().min(10, "Dirección debe ser más detallada").max(200),
  complemento: z.string().max(100).optional().or(z.literal("")),
  departamento: z.string().min(1, "Seleccione un departamento"),
  ciudad: z.string().min(1, "Seleccione una ciudad"),
  telefono: z.string().regex(/^[0-9]{10}$/, "Teléfono debe tener 10 dígitos"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  nota: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface IncludedItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CODFormProps {
  productId: string;
  productPrice: number;
  productName?: string;
  productImage?: string;
  onOrderComplete?: () => void;
  includedItems?: IncludedItem[];
}

const DEFAULT_INCLUDED_ITEMS: IncludedItem[] = [
  { id: 'magistv', icon: '🎬', title: 'MagisTV', description: 'Transforma tu proyector en un cine completo' },
  { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' },
  { id: 'cleaningKit', icon: '✨', title: 'Kit Premium de Limpieza', description: 'Mantén tu proyector siempre con imagen nítida' },
];

export function CODForm({ productId, productPrice, productName = "Proyector Vevshao A10", productImage, onOrderComplete, includedItems = DEFAULT_INCLUDED_ITEMS }: CODFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [ipHasOrder, setIpHasOrder] = useState(false);
  const [checkingIp, setCheckingIp] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [upsells, setUpsells] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    includedItems.forEach(item => {
      initial[item.id] = true;
    });
    return initial;
  });
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 11) + 10); // 10-20

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

  const [hasTrackedInitiate, setHasTrackedInitiate] = useState(false);

  // Track ViewContent when form loads
  useEffect(() => {
    trackTikTokConversion('ViewContent', {
      content_type: 'product',
      content_id: productId,
      content_name: productName,
      value: Number(productPrice),
      currency: 'COP',
      quantity: 1
    });
  }, [productId, productName, productPrice]);

  // Check client IP on mount
  useEffect(() => {
    const checkClientIp = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-client-ip');
        if (error) throw error;
        
        setClientIp(data.ip);
        setIpHasOrder(data.hasOrder);
      } catch (error) {
        console.error('Error checking IP:', error);
      } finally {
        setCheckingIp(false);
      }
    };
    
    checkClientIp();
  }, []);

  // Track InitiateCheckout when user starts filling the form
  const handleFormInteraction = () => {
    if (!hasTrackedInitiate) {
      trackTikTokConversion('InitiateCheckout', {
        content_type: 'product',
        content_id: productId,
        value: Number(productPrice),
        currency: 'COP',
        quantity: 1
      });
      setHasTrackedInitiate(true);
    }
  };

  // Update viewer count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(Math.floor(Math.random() * 11) + 10); // 10-20
    }, 8000); // Update every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  const selectedDepartamento = form.watch("departamento");
  const availableCiudades = selectedDepartamento ? CIUDADES_POR_DEPARTAMENTO[selectedDepartamento] || [] : [];

  const onSubmit = async (data: FormValues) => {
    // Check if IP already has an order
    if (ipHasOrder) {
      toast.error("Ya realizaste una compra anteriormente", {
        description: "Solo se permite una compra por persona.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('orders').insert({
        nombres: data.nombres,
        apellidos: data.apellidos,
        direccion_y_barrio: data.direccion,
        departamento: data.departamento,
        ciudad: data.ciudad,
        telefono: data.telefono,
        email: data.email || null,
        colonia: data.complemento || null,
        nota: data.nota || null,
        id_producto: '1989831',
        cantidad: 1,
        precio_total: productPrice.toString().replace(/\./g, '').replace(/,/g, ''),
        con_recaudo: 'SI',
        ip_address: clientIp,
      });

      if (error) {
        throw error;
      }

      // Track conversions on Facebook and TikTok
      trackFacebookConversion('Purchase', {
        value: productPrice,
        currency: 'COP',
        content_name: productName,
        content_ids: ['1989831'],
        content_type: 'product'
      });
      
      trackTikTokConversion('CompletePayment', {
        value: Number(productPrice),
        currency: 'COP',
        content_name: productName,
        content_id: '1989831',
        content_type: 'product',
        quantity: 1
      });

      // Send Telegram notification to admin
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: {
            precio_total: productPrice.toLocaleString('es-CO'),
          }
        });
      } catch (telegramError) {
        console.error('Error sending Telegram notification:', telegramError);
        // Don't fail the order if notification fails
      }


      setIpHasOrder(true); // Mark as purchased
      form.reset();
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error("Error al registrar pedido:", error);
      toast.error("Error al registrar pedido: " + (error.message || "Intenta nuevamente"));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show message if user already purchased (but not if showing success dialog)
  if (ipHasOrder && !checkingIp && !showSuccessDialog) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
          <h3 className="text-xl font-bold text-amber-600">Ya realizaste una compra</h3>
          <p className="text-muted-foreground">
            Solo se permite una compra por persona. Si tienes alguna duda sobre tu pedido, contáctanos por WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    onOrderComplete?.();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="w-[95vw] sm:max-w-lg max-h-[95vh] overflow-y-auto p-4 sm:p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              {/* Large Green Checkmark */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-3 sm:space-y-4 py-2">
            {/* Success Message */}
            <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center justify-center gap-1 sm:gap-2">
              <span>🎉</span>
              <span>¡Su compra se ha realizado con éxito!</span>
              <span>🎉</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg">
              Su pedido llegará a su casa en un plazo de 3 a 5 días
            </p>
            
            {/* Green Warranty Box with Pulse */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 animate-pulse">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg">
                <span className="text-green-600">✅</span>
                Contamos con 2 años de garantía
              </p>
            </div>
            
            {/* WhatsApp Section */}
            <div className="pt-2">
              <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">
                Para cualquier duda llama al WhatsApp
              </p>
              <a
                href="https://wa.me/56996953733?text=Hola,%20acabo%20de%20realizar%20una%20compra%20y%20tengo%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-8 rounded-full transition-colors text-base sm:text-lg animate-pulse"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp:</span> +56 996 953 733
              </a>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-3 sm:pt-4 border-t">
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Producto Original</span>
                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">100% Garantizado</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Envío Gratis</span>
                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">2-5 días hábiles</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">2 Años Garantía</span>
                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">Contra defectos</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Pago Seguro</span>
                <span className="text-[8px] sm:text-[10px] text-muted-foreground hidden sm:block">Contra Entrega</span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mt-2">
              <p className="font-semibold text-foreground text-sm sm:text-base">¡Gracias por confiar en nosotros!</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Recibirás una confirmación por WhatsApp con los detalles de tu pedido.</p>
            </div>
            
            <Button 
              onClick={handleCloseSuccessDialog}
              className="w-full mt-2 text-base sm:text-lg py-5 sm:py-6"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Loading IP check */}
      {checkingIp && (
        <div className="flex items-center justify-center gap-2 py-3 sm:py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-xs sm:text-sm text-muted-foreground">Verificando disponibilidad...</span>
        </div>
      )}

      {/* Live Viewer Counter */}
      <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 sm:px-4 py-2 animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-xs sm:text-sm font-bold">
          <span className="text-red-600">{viewerCount}</span> personas viendo este producto
        </span>
      </div>

      {/* Product Info */}
      <div className="bg-primary/5 p-4 sm:p-6 rounded-lg border-2 border-primary/20">
        <div className="flex items-start gap-3 sm:gap-4">
          {productImage && (
            <img src={productImage} alt={productName} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
              <h3 className="font-bold text-sm sm:text-lg">{productName}</h3>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-lg sm:text-2xl font-bold text-primary">
              <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>${productPrice.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="mt-2 sm:mt-3">
              <p className="text-xs sm:text-sm font-semibold text-green-600 animate-pulse">
                ✓ Pago Contra Entrega • ✓ Envío Gratis • ✓ Garantía 2 Años
              </p>
              
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-2 sm:p-3 border-2 border-primary/20">
                <p className="text-sm sm:text-base font-black text-black mb-2 sm:mb-3 animate-pulse text-center" style={{ textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7)' }}>
                  ✨ INCLUIDO GRATIS ✨
                </p>
                
                <div className="space-y-1.5 sm:space-y-2">
                  {includedItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-2 p-1.5 sm:p-2 bg-background/80 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-colors">
                      <Checkbox 
                        id={item.id}
                        checked={upsells[item.id] ?? true}
                        onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, [item.id]: checked as boolean }))}
                        className="mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 animate-pulse"
                      />
                      <label htmlFor={item.id} className="flex-1 cursor-pointer">
                        <p className="font-bold text-xs sm:text-sm">{item.icon} {item.title}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{item.description}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Badge with Promo */}
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4">
        <img src={guaranteeBadge} alt="100% Garantía" className="w-40 sm:w-64 h-auto" />
        <div className="text-center">
          <p className="text-base sm:text-xl md:text-2xl font-bold text-black animate-pulse" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
            PROMOCIÓN DE BLACK FRIDAY
          </p>
          <p className="text-sm sm:text-lg md:text-xl font-semibold text-black animate-pulse" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
            VÁLIDA HASTA EL 28 DE ENERO
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Nombres *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Juan Carlos" 
                      {...field} 
                      className="text-base"
                      onFocus={handleFormInteraction}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Rodríguez Pérez" {...field} className="text-base" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Dirección completa y Barrio *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Calle 50 # 25-30, Barrio El Poblado, Torre 3 Apto 401" 
                    {...field}
                    className="text-base min-h-[80px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Complemento (Opcional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Torre, apartamento, oficina, etc." 
                    {...field}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Departamento *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder="Seleccione departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTAMENTOS.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Ciudad/Municipio *</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                    }} 
                    value={field.value}
                    disabled={!selectedDepartamento}
                  >
                    <FormControl>
                      <SelectTrigger className="text-base">
                        <SelectValue placeholder={selectedDepartamento ? "Seleccione ciudad" : "Primero seleccione departamento"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCiudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>
                          {ciudad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Teléfono/WhatsApp *</FormLabel>
                <FormControl>
                  <Input placeholder="3001234567" {...field} className="text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email (Opcional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="cliente@email.com" {...field} className="text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full text-base sm:text-xl font-bold py-5 sm:py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <span className="mr-2 animate-bounce">👉</span>
                  COMPRAR AHORA - ${productPrice.toLocaleString('es-CO')} COP
                </>
              )}
            </Button>
            <p className="text-xs sm:text-sm font-bold" style={{ textShadow: '0 0 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}>
              Solo pagas al recibir
            </p>
          </div>
        </form>
      </Form>

      {/* Trust Seals */}
      <div className="pt-4 sm:pt-6 border-t">
        <img src={trustSeals} alt="Selos de Confianza" className="w-full max-w-2xl mx-auto" />
      </div>

      {/* Testimonial */}
      <div className="flex justify-center">
        <img src={testimonialConfidence} alt="Testimonio" className="w-full max-w-2xl rounded-lg" />
      </div>
    </div>
  );
}
