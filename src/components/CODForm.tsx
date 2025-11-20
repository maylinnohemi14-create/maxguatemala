import { useState } from "react";
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
import { Download, Loader2, Package, DollarSign } from "lucide-react";
import * as XLSX from 'xlsx';
import guaranteeBadge from "@/assets/guarantee-badge.png";
import trustSeals from "@/assets/trust-seals.jpg";
import testimonialConfidence from "@/assets/testimonial-confidence.gif";

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
  const [orders, setOrders] = useState<any[]>([]);

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

  const selectedDepartamento = form.watch("departamento");
  const availableCiudades = selectedDepartamento ? CIUDADES_POR_DEPARTAMENTO[selectedDepartamento] || [] : [];

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const newOrder = {
        NOMBRES: data.nombres,
        APELLIDOS: data.apellidos,
        "DIRECCIÓN Y BARRIO": data.direccion,
        DEPARTAMENTO: data.departamento,
        CIUDAD: data.ciudad,
        TELÉFONO: data.telefono,
        "ID DE PRODUCTO": productId,
        CANTIDAD: 1,
        "PRECIO TOTAL (SIN PUNTOS NI COMAS)": productPrice,
        "CON RECAUDO": "SI",
        NOTA: data.nota || "",
        "EMAIL (OPCIONAL)": data.email || "",
        "ID DE VARIABLE (OPCIONAL)": "",
        "CODIGO POSTAL (OPCIONAL)": "",
        "TRANSPORTADORA (OPCIONAL)": "",
        "CEDULA (OPCIONAL)": "",
        "COLONIA (OBLIGATORIO SOLO PARA QUIKEN)": data.complemento || "",
        "SEGURO (SOLO APLICA PARA ENVIA)": "",
      };

      setOrders([...orders, newOrder]);

      toast.success("¡Pedido registrado!", {
        description: `Pedido de ${data.nombres} ${data.apellidos} agregado. Total de pedidos: ${orders.length + 1}`,
      });

      form.reset();
      onOrderComplete?.();
    } catch (error) {
      console.error("Error al registrar pedido:", error);
      toast.error("Error al registrar pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadExcel = () => {
    if (orders.length === 0) {
      toast.error("No hay pedidos para descargar");
      return;
    }

    try {
      const ws = XLSX.utils.json_to_sheet(orders);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Ordenes");
      
      const today = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `ordenes_dropi_${today}.xlsx`);

      toast.success(`Archivo descargado con ${orders.length} pedidos`);
    } catch (error) {
      console.error("Error al generar Excel:", error);
      toast.error("Error al generar archivo");
    }
  };

  return (
    <div className="space-y-6">
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
            <div className="mt-2 space-y-2">
              <p className="text-sm font-semibold text-green-600 animate-pulse">
                ✓ Pago Contra Entrega • ✓ Envío Gratis • ✓ Garantía 2 Años
              </p>
              <div className="text-sm font-semibold text-primary space-y-1 border-t pt-2 mt-2">
                <p className="text-xs uppercase tracking-wide mb-2 text-muted-foreground">Incluido Gratis:</p>
                <p>🎬 MagisTV - Transforma tu proyector en un cine completo</p>
                <p>🛡️ Garantía Extendida 2 Años - Protección Extra</p>
                <p>✨ Kit Premium de Limpieza para Lentes - Mantén tu proyector siempre con imagen nítida</p>
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

      {orders.length > 0 && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="flex items-center justify-center">
            <Button onClick={downloadExcel} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Descargar Excel ({orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'})
            </Button>
          </div>
        </div>
      )}

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

          <FormField
            control={form.control}
            name="nota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones (Opcional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Información adicional sobre la entrega..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar Pedido"
            )}
          </Button>
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
