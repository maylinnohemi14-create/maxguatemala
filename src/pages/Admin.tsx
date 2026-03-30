import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Loader2, LogOut, Package, TrendingUp, MapPin, DollarSign, Users, Trash2, ShoppingCart } from "lucide-react";
import * as XLSX from 'xlsx';
import type { User, Session } from '@supabase/supabase-js';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PixelManager } from "@/components/PixelManager";

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
  id_producto?: string;
}

interface CityStats {
  name: string;
  value: number;
}

interface DepartmentStats {
  name: string;
  value: number;
}

interface AbandonedCart {
  id: string;
  nombres: string | null;
  telefono: string;
  page_url: string | null;
  product_id: string | null;
  created_at: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B9D'];

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityStats, setCityStats] = useState<CityStats[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
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

      const ordersData = data || [];
      setOrders(ordersData);
      
      // Calculate statistics
      calculateStats(ordersData);
    } catch (error: any) {
      toast.error("Erro ao carregar pedidos: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ordersData: Order[]) => {
    // Total revenue
    const revenue = ordersData.reduce((sum, order) => {
      return sum + parseInt(order.precio_total.replace(/\./g, '').replace(/,/g, ''));
    }, 0);
    setTotalRevenue(revenue);

    // Orders by city (top 8)
    const cityMap = new Map<string, number>();
    ordersData.forEach(order => {
      const count = cityMap.get(order.ciudad) || 0;
      cityMap.set(order.ciudad, count + 1);
    });
    const cityStatsData = Array.from(cityMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    setCityStats(cityStatsData);

    // Orders by department (top 10)
    const deptMap = new Map<string, number>();
    ordersData.forEach(order => {
      const count = deptMap.get(order.departamento) || 0;
      deptMap.set(order.departamento, count + 1);
    });
    const deptStatsData = Array.from(deptMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
    setDepartmentStats(deptStatsData);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const PRODUCTS = [
    { id: 'PROYECTOR-VEVSHAO-A10-GT', label: 'Proyector Vevshao', nota: 'PROYECTOR VEV', idProducto: '179', transportadora: 'FORZA' },
    { id: 'NINJA-CRISPI-GT', label: 'Ninja CRISPi', nota: 'NINJA CRISPI', idProducto: '179', transportadora: 'FORZA' },
    { id: 'UA-KIT3EN1-GT', label: 'Conjuntos Under Armour', nota: 'CONJUNTOS UA KIT 3EN1', idProducto: '4170', idVariable: '4741', transportadora: 'FORZA' },
    { id: 'VESTIDO-KIT4-GT', label: 'Vestido Kit 4 en 1', nota: 'VESTIDO KIT 4EN1', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-KIT3-GT', label: 'Vestido Kit 3 en 1', nota: 'VESTIDO KIT 3EN1', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-ELEGANCE-GT', label: 'Vestido Elegance', nota: 'VESTIDO ELEGANCE', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-GLAM4-GT', label: 'Vestido Glam Kit 4', nota: 'VESTIDO GLAM KIT 4', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-DUO2-GT', label: 'Vestido Dúo', nota: 'VESTIDO DUO', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-CORSET3-GT', label: 'Vestido Corset Kit 3', nota: 'VESTIDO CORSET KIT 3', idProducto: '179', transportadora: 'FORZA' },
    { id: 'VESTIDO-NOCHE3-GT', label: 'Vestido Noche Kit 3', nota: 'VESTIDO NOCHE KIT 3', idProducto: '179', transportadora: 'FORZA' },
    { id: 'UA-KIT4EN1-GT', label: 'Conjuntos UA Kit 4 en 1', nota: 'CONJUNTOS UA KIT 4EN1', idProducto: '4170', idVariable: '4741', transportadora: 'FORZA' },
  ];

  const clearProductOrders = async (product: typeof PRODUCTS[0]) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id_producto', product.id);
      
      if (error) throw error;
      
      const remaining = orders.filter(o => o.id_producto !== product.id);
      setOrders(remaining);
      calculateStats(remaining);
      
      toast.success(`Pedidos de ${product.label} limpos com sucesso!`);
    } catch (error: any) {
      toast.error("Erro ao limpar pedidos: " + error.message);
    }
  };

  const getOrdersByProduct = (productId: string) => {
    return orders.filter(order => order.id_producto === productId);
  };

  const formatOrdersForExcel = (ordersToFormat: Order[], product?: typeof PRODUCTS[0]) => {
    return ordersToFormat.map((order) => ({
      'NOMBRES': order.nombres,
      'APELLIDOS': order.apellidos,
      'DIRECCIÓN Y BARRIO': order.colonia ? `${order.direccion_y_barrio}, ${order.colonia}` : order.direccion_y_barrio,
      'DEPARTAMENTO': order.departamento,
      'CIUDAD': order.ciudad,
      'TELÉFONO': order.telefono,
      'ID DE PRODUCTO': product?.idProducto || '179',
      'CANTIDAD': '1',
      'PRECIO TOTAL (SIN PUNTOS NI COMAS)': order.precio_total,
      'CON RECAUDO': 'SI',
      'NOTA': product?.nota || order.nota || 'PROYECTOR VEV',
      'EMAIL (OPCIONAL)': order.email || '',
      'ID DE VARIABLE (OPCIONAL)': product?.idVariable || '',
      'CODIGO POSTAL (OPCIONAL)': '',
      'TRANSPORTADORA (OPCIONAL)': product?.transportadora || 'FORZA',
      'CEDULA (OPCIONAL)': order.cedula || '',
      'COLONIA (OBLIGATORIO SOLO PARA QUIKEN)': '',
      'SEGURO (SOLO APLICA PARA ENVIA)': ''
    }));
  };

  const downloadProductExcel = (product: typeof PRODUCTS[0]) => {
    const productOrders = getOrdersByProduct(product.id);
    if (productOrders.length === 0) {
      toast.error(`Não há pedidos de ${product.label} para baixar`);
      return;
    }

    const excelData = formatOrdersForExcel(productOrders, product);
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    
    const today = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `pedidos_${product.id.toLowerCase()}_${today}.xlsx`);
    toast.success(`Excel de ${product.label} baixado com sucesso! (${productOrders.length} pedidos)`);
  };

  const downloadExcel = () => {
    if (orders.length === 0) {
      toast.error("Não há pedidos para baixar");
      return;
    }

    const excelData = formatOrdersForExcel(orders);
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Pedidos");
    
    XLSX.writeFile(wb, `pedidos_todos_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Excel baixado com sucesso!");
  };

  const downloadSplitExcel = () => {
    if (orders.length === 0) {
      toast.error("Não há pedidos para baixar");
      return;
    }

    const halfIndex = Math.ceil(orders.length / 2);
    const firstHalf = orders.slice(0, halfIndex);
    const secondHalf = orders.slice(halfIndex);

    const today = new Date().toISOString().split('T')[0];

    // First file
    const excelData1 = formatOrdersForExcel(firstHalf);
    const ws1 = XLSX.utils.json_to_sheet(excelData1);
    const wb1 = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb1, ws1, "Pedidos");
    XLSX.writeFile(wb1, `pedidos_dropi_${today}_parte1.xlsx`);

    // Second file
    const excelData2 = formatOrdersForExcel(secondHalf);
    const ws2 = XLSX.utils.json_to_sheet(excelData2);
    const wb2 = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb2, ws2, "Pedidos");
    XLSX.writeFile(wb2, `pedidos_dropi_${today}_parte2.xlsx`);

    toast.success(`Excel dividido em 2 arquivos: ${firstHalf.length} pedidos na parte 1 e ${secondHalf.length} pedidos na parte 2`);
  };

  const clearAllOrders = async () => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (error) throw error;
      
      // Clear local state
      setOrders([]);
      setCityStats([]);
      setDepartmentStats([]);
      setTotalRevenue(0);
      
      toast.success("Todos os pedidos foram limpos com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao limpar pedidos: " + error.message);
    }
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
            <p className="text-muted-foreground">Dashboard de vendas e análise</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">pedidos registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString('es-CO')}</div>
              <p className="text-xs text-muted-foreground">COP acumulado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('es-CO') : 0}
              </div>
              <p className="text-xs text-muted-foreground">por pedido</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cidades Atendidas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cityStats.length}</div>
              <p className="text-xs text-muted-foreground">cidades diferentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos por Departamento</CardTitle>
              <CardDescription>Top 10 departamentos com mais pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              {departmentStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" name="Pedidos" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Nenhum dado disponível
                </div>
              )}
            </CardContent>
          </Card>

          {/* City Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Pedidos por Cidade</CardTitle>
              <CardDescription>Top 8 cidades com mais pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              {cityStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cityStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cityStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Nenhum dado disponível
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Per-Product Downloads */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Download por Produto</CardTitle>
              <CardDescription>Baixe o Excel de cada produto separadamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRODUCTS.map((product) => {
                  const count = getOrdersByProduct(product.id).length;
                  return (
                    <Card key={product.id} className="border-dashed">
                      <CardContent className="pt-4 pb-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg">{product.label}</span>
                          <span className="text-sm text-muted-foreground">{count} pedidos</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => downloadProductExcel(product)}
                            variant="outline"
                            className="flex-1"
                            disabled={count === 0}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Baixar Excel
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="default"
                                disabled={count === 0}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Limpar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Limpar pedidos de {product.label}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta ação irá deletar permanentemente os {count} pedidos de {product.label}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => clearProductOrders(product)}>
                                  Sim, limpar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download and Clear Buttons */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={downloadExcel}
                  className="w-full text-lg h-12"
                  disabled={orders.length === 0}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Baixar Excel ({orders.length} pedidos)
                </Button>

                <Button 
                  onClick={downloadSplitExcel}
                  variant="secondary"
                  className="w-full text-lg h-12"
                  disabled={orders.length < 2}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Baixar Dividido em 2 ({orders.length} pedidos)
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive"
                      className="w-full text-lg h-12"
                      disabled={orders.length === 0}
                    >
                      <Trash2 className="mr-2 h-5 w-5" />
                      Limpar Todos os Pedidos
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá deletar permanentemente todos os {orders.length} pedidos do banco de dados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={clearAllOrders}>
                        Sim, limpar todos os pedidos
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pixel Management Section */}
        <div className="mb-8">
          <PixelManager />
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pedidos Recentes</CardTitle>
            <CardDescription>Lista completa de todos os pedidos registrados</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
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
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="whitespace-nowrap">
                          {new Date(order.created_at).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.nombres} {order.apellidos}
                        </TableCell>
                        <TableCell>{order.telefono}</TableCell>
                        <TableCell>{order.ciudad}</TableCell>
                        <TableCell>{order.departamento}</TableCell>
                        <TableCell className="font-semibold text-right">
                          ${parseInt(order.precio_total).toLocaleString('es-CO')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
