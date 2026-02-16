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

// Departamentos de Guatemala
const DEPARTAMENTOS = [
  "ALTA VERAPAZ", "BAJA VERAPAZ", "CHIMALTENANGO", "CHIQUIMULA", "EL PROGRESO",
  "ESCUINTLA", "GUATEMALA", "HUEHUETENANGO", "IZABAL", "JALAPA", "JUTIAPA",
  "PETÉN", "QUETZALTENANGO", "QUICHÉ", "RETALHULEU", "SACATEPÉQUEZ",
  "SAN MARCOS", "SANTA ROSA", "SOLOLÁ", "SUCHITEPÉQUEZ", "TOTONICAPÁN", "ZACAPA"
];

// Municipios por departamento de Guatemala
const MUNICIPIOS_POR_DEPARTAMENTO: Record<string, string[]> = {
  "ALTA VERAPAZ": ["Cobán", "San Cristóbal Verapaz", "Tactic", "San Pedro Carchá", "San Juan Chamelco", "Chisec", "Santa María Cahabón", "Santa Cruz Verapaz", "Fray Bartolomé de las Casas", "Lanquín", "Chahal", "Santa Catalina La Tinta", "Panzós", "Senahú", "Tamahú", "Tucurú", "Raxruhá"],
  "BAJA VERAPAZ": ["Salamá", "San Miguel Chicaj", "Rabinal", "San Jerónimo", "Santa Cruz El Chol", "Granados", "Purulhá", "Cubulco"],
  "CHIMALTENANGO": ["Chimaltenango", "San Martín Jilotepeque", "San Andrés Itzapa", "Tecpán Guatemala", "Patzún", "Patzicía", "San José Poaquil", "Santa Cruz Balanyá", "San Juan Comalapa", "Santa Apolonia", "Parramos", "Zaragoza", "El Tejar", "Acatenango", "San Pedro Yepocapa", "Tecpán", "Pochuta"],
  "CHIQUIMULA": ["Chiquimula", "Jocotán", "Camotán", "San José de la Arada", "San Juan Ermita", "San Jacinto", "Ipala", "San José La Arada", "Esquipulas", "Concepción Las Minas", "Olopa", "Quetzaltepeque"],
  "EL PROGRESO": ["Guastatoya", "Morazán", "San Agustín Acasaguastlán", "San Cristóbal Acasaguastlán", "El Jícaro", "Sanarate", "San Antonio La Paz", "Sansare"],
  "ESCUINTLA": ["Escuintla", "Palín", "Masagua", "Guanagazapa", "San Vicente Pacaya", "Nueva Concepción", "Tiquisate", "La Democracia", "Santa Lucía Cotzumalguapa", "La Gomera", "Siquinalá", "Puerto San José", "Iztapa", "Sipacate"],
  "GUATEMALA": ["Santa Catarina Pinula", "San José Pinula", "San José del Golfo", "Palencia", "Chinautla", "San Pedro Ayampuc", "Mixco", "San Juan Sacatepéquez", "San Raymundo", "Chuarrancho", "Fraijanes", "Amatitlán", "Villa Nueva", "Villa Canales", "San Miguel Petapa", "Guatemala", "San Pedro Sacatepéquez Guatemala", "San Pedro Sacatepéquez"],
  "HUEHUETENANGO": ["Huehuetenango", "Aguacatán", "San Sebastián Huehuetenango", "San Rafael Petzal", "Chiantla", "Malacatancito", "Santa Cruz Barillas", "San Rafael La Independencia", "Concepción Huista", "San Juan Ixcoy", "San Mateo Ixtatán", "San Miguel Acatán", "Santa Eulalia", "San Pedro Soloma", "Todos Santos Cuchumatanes", "Colotenango", "San Gaspar Ixchil", "San Juan Atitán", "Nentón", "Jacaltenango", "San Antonio Huista", "Santa Ana Huista", "San Pedro Necta", "Santiago Chimaltenango", "Cuilco", "Tectitán", "San Ildefonso Ixtahuacán", "Unión Cantinil", "Santa Bárbara Huehuetenango", "San Sebastián Coatán", "La Libertad Huehuetenango", "La Democracia Huehuetenango", "Santa Bárbara", "Petatán"],
  "IZABAL": ["Puerto Barrios", "Morales", "Livingston", "Los Amates", "El Estor"],
  "JALAPA": ["Jalapa", "San Pedro Pinula", "Monjas", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate", "Mataquescuintla"],
  "JUTIAPA": ["Jutiapa", "El Progreso", "Zapotitlán", "Yupiltepeque", "El Adelanto", "Moyuta", "Pasaco", "Agua Blanca", "Santa Catarina Mita", "Atescatempa", "Asunción Mita", "Jerez", "Quesada", "Conguaco", "Jalpatagua", "San José Acatempa", "Comapa"],
  "PETÉN": ["San José", "La Libertad", "Flores", "San Benito", "San Andrés", "San Francisco", "Santa Ana", "Las Cruces", "Melchor de Mencos", "Sayaxché", "Dolores", "Poptún", "San Luis", "El Chal"],
  "QUETZALTENANGO": ["Quetzaltenango", "Salcajá", "San Martín Sacatepéquez", "Cajolá", "Concepción Chiquirichapa", "Huitán", "San Francisco La Unión", "San Miguel Sigüilá", "Olintepeque", "San Carlos Sija", "Sibilia", "San Juan Ostuncalco", "San Mateo", "Almolonga", "Cantel", "Zunil", "Coatepeque", "Flores Costa Cuca", "La Esperanza", "Palestina de Los Altos", "El Palmar", "Génova", "Colomba", "Cabricán"],
  "QUICHÉ": ["Santa Cruz del Quiché", "Chiché", "Chinique", "Chajul", "Chichicastenango", "Patzité", "San Antonio Ilotenango", "San Pedro Jocopilas", "Cunén", "San Juan Cotzal", "Nebaj", "Sacapulas", "Ixcán", "Canillá", "San Andrés Sajcabajá", "San Bartolomé Jocotenango", "Joyabaj", "Zacualpa", "Pachalum", "Santa María Nebaj", "Chicamán", "Uspantán"],
  "RETALHULEU": ["Retalhuleu", "San Andrés Villa Seca", "San Sebastián", "San Martín Zapotitlán", "Santa Cruz Muluá", "San Felipe", "Nuevo San Carlos", "El Asintal", "Champerico"],
  "SACATEPÉQUEZ": ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santo Domingo Xenacoj", "Santiago Sacatepéquez", "San Bartolomé Milpas Altas", "San Lucas Sacatepéquez", "Santa Lucía Milpas Altas", "Magdalena Milpas Altas", "Santa María de Jesús", "Ciudad Vieja", "San Miguel Dueñas", "San Juan Alotenango", "San Antonio Aguas Calientes", "Santa Catarina Barahona"],
  "SAN MARCOS": ["San Lorenzo", "Malacatán", "San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "San Cristóbal Cucho", "Río Blanco", "Comitancillo", "Tajumulco", "Tejutla", "San Rafael Pie de la Cuesta", "Nuevo Progreso", "El Tumbador", "El Rodeo", "Catarina", "San Pablo", "El Quetzal", "La Reforma", "Esquipulas Palo Gordo", "Ocós", "Pajapita", "Sipacapa", "San José Ojetenam", "Sibinal", "Tacaná", "Concepción Tutuapa", "San Miguel Ixtahuacán", "Ayutla", "La Blanca"],
  "SANTA ROSA": ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Casillas", "Oratorio", "Santa Cruz Naranjo", "Pueblo Nuevo Viñas", "Nueva Santa Rosa", "Chiquimulilla", "Taxisco", "San Juan Tecuaco", "Guazacapán", "Santa María Ixhuatán", "San Rafael Las Flores"],
  "SOLOLÁ": ["Sololá", "Santa Lucía Utatlán", "San Andrés Semetabaj", "San Antonio Palopó", "San José Chacayá", "María Tecún", "Los Encuentros", "Santa Catarina Palopó", "San Juan Argueta", "San Jorge La Laguna", "Concepción", "Panajachel", "Santa Cruz La Laguna", "Santa Catarina Ixtahuacán", "San Lucas Tolimán", "Santiago Atitlán", "Nahualá", "San Juan La Laguna", "San Marcos La Laguna", "San Pablo La Laguna", "San Pedro La Laguna", "Santa Clara La Laguna", "Santa María Visitación"],
  "SUCHITEPÉQUEZ": ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Ídolo", "Santo Domingo", "Samayac", "San Pablo Jocopilas", "San Antonio Suchitepéquez", "San Miguel Panán", "San Gabriel", "Chicacao", "Santo Tomás La Unión", "Zunilito", "Pueblo Nuevo", "San Lorenzo Suchitepéquez", "Santa Bárbara", "San Juan Bautista", "Patulul", "Río Bravo", "San José La Máquina", "San Lorenzo"],
  "TOTONICAPÁN": ["Santa Lucía La Reforma", "Totonicapán", "San Cristóbal", "San Andrés Xecul", "Santa María Chiquimula", "San Francisco El Alto", "Momostenango", "San Bartolo Aguas Calientes", "San Cristóbal Totonicapán"],
  "ZACAPA": ["Zacapa", "Teculután", "Río Hondo", "San Jorge", "Estanzuela", "Huité", "San Diego", "Usumatlán", "Cabañas", "Gualán", "La Unión"]
};

const formSchema = z.object({
  nombres: z.string().min(2, "Nombre debe tener al menos 2 caracteres").max(50),
  apellidos: z.string().min(2, "Apellido debe tener al menos 2 caracteres").max(50),
  direccion: z.string().min(10, "Dirección debe ser más detallada").max(200),
  complemento: z.string().max(100).optional().or(z.literal("")),
  departamento: z.string().min(1, "Seleccione un departamento"),
  municipio: z.string().min(1, "Seleccione un municipio"),
  telefono: z.string().regex(/^[0-9]{4,15}$/, "Ingrese un número de teléfono válido"),
  email: z.string().email("Por favor, ingrese un correo electrónico válido").optional().or(z.literal("")),
  nota: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export interface IncludedItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface CODFormGuatemalaProps {
  productId: string;
  productPrice: number;
  productName?: string;
  productImage?: string;
  onOrderComplete?: () => void;
  includedItems?: IncludedItem[];
}

const DEFAULT_INCLUDED_ITEMS: IncludedItem[] = [
  { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' },
];

export function CODFormGuatemala({ productId, productPrice, productName = "Producto", productImage, onOrderComplete, includedItems = DEFAULT_INCLUDED_ITEMS }: CODFormGuatemalaProps) {
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
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 11) + 10);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      direccion: "",
      complemento: "",
      departamento: "",
      municipio: "",
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
      currency: 'GTQ',
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
        currency: 'GTQ',
        quantity: 1
      });
      setHasTrackedInitiate(true);
    }
  };

  // Update viewer count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(Math.floor(Math.random() * 11) + 10);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const selectedDepartamento = form.watch("departamento");
  const availableMunicipios = selectedDepartamento ? MUNICIPIOS_POR_DEPARTAMENTO[selectedDepartamento] || [] : [];

  const onSubmit = async (data: FormValues) => {
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
        ciudad: data.municipio,
        telefono: data.telefono,
        email: data.email || null,
        colonia: data.complemento || null,
        nota: data.nota || null,
        id_producto: productId,
        cantidad: 1,
        precio_total: productPrice.toString(),
        con_recaudo: 'SI',
        ip_address: clientIp,
      });

      if (error) {
        throw error;
      }

      // Track conversions
      trackFacebookConversion('Purchase', {
        value: productPrice,
        currency: 'GTQ',
        content_name: productName,
        content_ids: [productId],
        content_type: 'product'
      });
      
      trackTikTokConversion('CompletePayment', {
        value: Number(productPrice),
        currency: 'GTQ',
        content_name: productName,
        content_id: productId,
        content_type: 'product',
        quantity: 1
      });

      // Send Telegram notification
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: {
            precio_total: `Q${productPrice}`,
          }
        });
      } catch (telegramError) {
        console.error('Error sending Telegram notification:', telegramError);
      }

      setIpHasOrder(true);
      form.reset();
      setShowSuccessDialog(true);
    } catch (error: any) {
      console.error("Error al registrar pedido:", error);
      toast.error("Error al registrar pedido: " + (error.message || "Intenta nuevamente"));
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-3 sm:space-y-4 py-2">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center justify-center gap-1 sm:gap-2">
              <span>🎉</span>
              <span>¡Su compra se ha realizado con éxito!</span>
              <span>🎉</span>
            </h2>
            
            <p className="text-muted-foreground text-base sm:text-lg">
              Su pedido llegará a su casa en un plazo de 3 a 5 días
            </p>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 animate-pulse">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg">
                <span className="text-green-600">✅</span>
                Contamos con 2 años de garantía
              </p>
            </div>
            
            <div className="pt-2">
              <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">
                Para cualquier duda llama al WhatsApp
              </p>
              <a
                href="https://wa.me/50212345678?text=Hola,%20acabo%20de%20realizar%20una%20compra%20y%20tengo%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-8 rounded-full transition-colors text-base sm:text-lg animate-pulse"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Guatemala
              </a>
            </div>
            
            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-3 sm:pt-4 border-t">
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Producto Original</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Envío Gratis</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">2 Años Garantía</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center">Pago Seguro</span>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mt-2">
              <p className="font-semibold text-foreground text-sm sm:text-base">¡Gracias por confiar en nosotros!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Viewers */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 bg-destructive/10 rounded-lg border border-destructive/20">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium text-destructive">
          {viewerCount} personas están viendo este producto
        </span>
      </div>

      {/* Order Summary */}
      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          {productImage && (
            <img src={productImage} alt={productName} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-white" />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-base sm:text-lg text-foreground">{productName}</h3>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-destructive">
                Q{productPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Included Items */}
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-xs sm:text-sm font-semibold text-foreground">Incluye GRATIS:</p>
          {includedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-success/10 border border-success/20">
              <Checkbox
                id={item.id}
                checked={upsells[item.id]}
                onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, [item.id]: !!checked }))}
                className="border-success data-[state=checked]:bg-success"
              />
              <label htmlFor={item.id} className="flex-1 cursor-pointer">
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </span>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleFormInteraction} className="space-y-3 sm:space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Nombres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tus apellidos" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Departamento & Municipio */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Departamento *</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("municipio", "");
                  }} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="text-sm bg-background">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50 max-h-[200px]">
                      {DEPARTAMENTOS.map((dep) => (
                        <SelectItem key={dep} value={dep} className="text-sm">
                          {dep}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="municipio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Municipio *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartamento}>
                    <FormControl>
                      <SelectTrigger className="text-sm bg-background">
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-background z-50 max-h-[200px]">
                      {availableMunicipios.map((mun) => (
                        <SelectItem key={mun} value={mun} className="text-sm">
                          {mun}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Address */}
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">Dirección completa *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Calle, número, zona, colonia o barrio, referencias" 
                    {...field} 
                    className="text-sm min-h-[80px]"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Complemento */}
          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">Complemento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apartamento, casa, edificio..." {...field} className="text-sm" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Teléfono *</FormLabel>
                  <FormControl>
                    <Input placeholder="12345678" {...field} className="text-sm" maxLength={15} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs sm:text-sm">Email (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} className="text-sm" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Note */}
          <FormField
            control={form.control}
            name="nota"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm">Nota adicional (opcional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Instrucciones especiales para la entrega..." 
                    {...field} 
                    className="text-sm min-h-[60px]"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || checkingIp}
            className="w-full text-base sm:text-lg font-bold py-5 sm:py-7 bg-[#FFEB3B] hover:bg-[#FDD835] text-black hover:shadow-glow transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Procesando...
              </>
            ) : checkingIp ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Package className="w-5 h-5 mr-2" />
                CONFIRMAR PEDIDO - PAGO CONTRA ENTREGA
              </>
            )}
          </Button>

          {/* Trust elements */}
          <div className="text-center space-y-2 pt-4">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <LockKeyhole className="w-4 h-4" />
              <span>Pago seguro contra entrega</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Truck className="w-4 h-4" />
              <span>Envío gratis a toda Guatemala</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
