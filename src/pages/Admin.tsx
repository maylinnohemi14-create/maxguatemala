import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Loader2, LogOut, Package } from "lucide-react";
import * as XLSX from 'xlsx';
import type { User, Session } from '@supabase/supabase-js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  created_at: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion_y_barrio: string;
  departamento: string;
  ciudad: string;
  precio_total: string;
  email?: string;
  cedula?: string;
  colonia?: string;
  nota?: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        // Fetch orders when authenticated
        setTimeout(() => {
          fetchOrders();
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar pedidos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const downloadExcel = () => {
    if (orders.length === 0) {
      toast.error("Não há pedidos para baixar");
      return;
    }

    const excelData = orders.map((order) => ({
      'NOMBRES (OBLIGATORIO)': order.nombres,
      'APELLIDOS (OBLIGATORIO)': order.apellidos,
      'TELEFONO (OBLIGATORIO)': order.telefono,
      'DIRECCION (OBLIGATORIO)': order.direccion_y_barrio,
      'DEPARTAMENTO (OBLIGATORIO)': order.departamento,
      'CIUDAD O MUNICIPIO (OBLIGATORIO)': order.ciudad,
      'CORREO ELECTRONICO': order.email || '',
      'CEDULA': order.cedula || '',
      'COLONIA (OBLIGATORIO SOLO PARA QUIKEN)': order.colonia || '',
      'CODIGO POSTAL': '',
      'TRANSPORTADORA': '',
      'NOTA': order.nota || '',
      'ID PRODUCTO (OBLIGATORIO)': '1989831',
      'CANTIDAD (OBLIGATORIO)': '1',
      'ID VARIABLE': '',
      'SEGURO': '',
      'PRECIO TOTAL (OBLIGATORIO)': order.precio_total,
      'CON RECAUDO (OBLIGATORIO)': 'SI'
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    
    XLSX.writeFile(wb, `pedidos_dropi_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Arquivo Excel baixado com sucesso!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">Gerencie seus pedidos Dropi</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total de Pedidos</p>
                <p className="text-4xl font-bold text-foreground">{orders.length}</p>
              </div>
              <Package className="h-12 w-12 text-primary opacity-20" />
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
            <Button 
              onClick={downloadExcel}
              className="w-full h-full text-lg"
              disabled={orders.length === 0}
            >
              <Download className="mr-2 h-5 w-5" />
              Baixar Excel para Dropi
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Pedidos Recentes</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Nenhum pedido registrado ainda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.nombres} {order.apellidos}
                      </TableCell>
                      <TableCell>{order.telefono}</TableCell>
                      <TableCell>{order.ciudad}</TableCell>
                      <TableCell>{order.departamento}</TableCell>
                      <TableCell className="font-semibold">
                        ${parseInt(order.precio_total).toLocaleString('es-CO')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
