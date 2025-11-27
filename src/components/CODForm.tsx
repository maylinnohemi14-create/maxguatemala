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
import { Loader2, Package, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";
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

interface CODFormProps {
  productId: string;
  productPrice: number;
  productName?: string;
  productImage?: string;
  onOrderComplete?: () => void;
}

export function CODForm({ productId, productPrice, productName = "Proyector Vevshao A10", productImage, onOrderComplete }: CODFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [ipHasOrder, setIpHasOrder] = useState(false);
  const [checkingIp, setCheckingIp] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [upsells, setUpsells] = useState({
    magistv: true,
    warranty: true,
    cleaningKit: true,
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
        value: productPrice,
        currency: 'COP',
        content_name: productName,
        content_id: '1989831',
        content_type: 'product'
      });

      // Send Telegram notification
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

  // Show message if user already purchased
  if (ipHasOrder && !checkingIp) {
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
    <div className="space-y-6">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="text-5xl mb-4">🎉✅🎊</div>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 ¡Su compra se ha realizado con éxito! 🎉
            </h2>
            <p className="text-muted-foreground text-lg">
              📦 Su pedido llegará a su casa en un plazo de <strong>3 a 5 días</strong>.
            </p>
            <p className="text-muted-foreground">
              🛡️ Contamos con <strong>2 años de garantía</strong>.
            </p>
            
            <div className="border-t pt-4 mt-4">
              <p className="text-muted-foreground text-sm mb-3">
                Para cualquier duda, contáctenos por WhatsApp:
              </p>
              <a
                href="https://wa.me/56984591932?text=Hola,%20acabo%20de%20realizar%20una%20compra%20y%20tengo%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
              >
                <span className="text-2xl">📱</span> WhatsApp
              </a>
            </div>
            
            <Button 
              onClick={handleCloseSuccessDialog}
              className="w-full mt-4 text-lg py-6"
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Loading IP check */}
      {checkingIp && (
        <div className="flex items-center justify-center gap-2 py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Verificando disponibilidad...</span>
        </div>
      )}

      {/* Live Viewer Counter */}
      <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-bold">
          <span className="text-red-600">{viewerCount}</span> personas están viendo este producto ahora
        </span>
      </div>

      {/* Product Info */}
      <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
        <div className="flex items-start gap-4">
          {productImage && (
            <img src={productImage} alt={productName} className="w-24 h-24 object-cover rounded-lg" />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg">{productName}</h3>
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
              <DollarSign className="w-6 h-6" />
              <span>${productPrice.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="mt-3 space-y-3">
              <p className="text-sm font-semibold text-green-600 animate-pulse">
                ✓ Pago Contra Entrega • ✓ Envío Gratis • ✓ Garantía 2 Años
              </p>
              
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-3 border-2 border-primary/20">
                <p className="text-base font-black text-black mb-3 animate-pulse text-center" style={{ textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7)' }}>
                  ✨ INCLUIDO GRATIS ✨
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-background/80 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-colors">
                    <Checkbox 
                      id="magistv"
                      checked={upsells.magistv}
                      onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, magistv: checked as boolean }))}
                      className="mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 animate-pulse"
                    />
                    <label htmlFor="magistv" className="flex-1 cursor-pointer">
                      <p className="font-bold text-sm">🎬 MagisTV</p>
                      <p className="text-xs text-muted-foreground">Transforma tu proyector en un cine completo con MagisTV</p>
                    </label>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-background/80 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-colors">
                    <Checkbox 
                      id="warranty"
                      checked={upsells.warranty}
                      onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, warranty: checked as boolean }))}
                      className="mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 animate-pulse"
                    />
                    <label htmlFor="warranty" className="flex-1 cursor-pointer">
                      <p className="font-bold text-sm">🛡️ Garantía Extendida 2 Años</p>
                      <p className="text-xs text-muted-foreground">Protección Extra para tu inversión</p>
                    </label>
                  </div>

                  <div className="flex items-start gap-2 p-2 bg-background/80 rounded-lg border border-green-500/30 hover:border-green-500/60 transition-colors">
                    <Checkbox 
                      id="cleaningKit"
                      checked={upsells.cleaningKit}
                      onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, cleaningKit: checked as boolean }))}
                      className="mt-0.5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 animate-pulse"
                    />
                    <label htmlFor="cleaningKit" className="flex-1 cursor-pointer">
                      <p className="font-bold text-sm">✨ Kit Premium de Limpieza para Lentes</p>
                      <p className="text-xs text-muted-foreground">Mantén tu proyector siempre con imagen nítida. Retira polvo, manchas e impresiones sin rayar la lente</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Badge with Promo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
        <img src={guaranteeBadge} alt="100% Garantía" className="w-64 h-auto" />
        <div className="text-center md:text-left">
          <p className="text-xl md:text-2xl font-bold text-black animate-pulse" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
            PROMOCIÓN DE BLACK FRIDAY
          </p>
          <p className="text-lg md:text-xl font-semibold text-black animate-pulse" style={{ textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
            VÁLIDA HASTA EL 5 DE DICIEMBRE
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan Carlos" {...field} />
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
                  <FormLabel>Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Rodríguez Pérez" {...field} />
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
                <FormLabel>Dirección completa y Barrio *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Calle 50 # 25-30, Barrio El Poblado, Torre 3 Apto 401" 
                    {...field} 
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
                <FormLabel>Complemento (Opcional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Torre, apartamento, oficina, etc." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                  <FormLabel>Ciudad/Municipio *</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                    }} 
                    value={field.value}
                    disabled={!selectedDepartamento}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                <FormLabel>Teléfono/WhatsApp *</FormLabel>
                <FormControl>
                  <Input placeholder="3001234567" {...field} />
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
                <FormLabel>Email (Opcional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="cliente@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full text-xl font-bold py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <span className="mr-2 animate-bounce">👉</span>
                  COMPRAR AHORA - ${productPrice.toLocaleString('es-CO')} COP
                </>
              )}
            </Button>
            <p className="text-sm font-bold" style={{ textShadow: '0 0 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}>
              Solo pagas al recibir
            </p>
          </div>
        </form>
      </Form>

      {/* Trust Seals */}
      <div className="pt-6 border-t">
        <img src={trustSeals} alt="Selos de Confianza" className="w-full max-w-2xl mx-auto" />
      </div>

      {/* Testimonial */}
      <div className="flex justify-center">
        <img src={testimonialConfidence} alt="Testimonio" className="w-full max-w-2xl rounded-lg" />
      </div>
    </div>
  );
}
