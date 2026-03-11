import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Facebook } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Pixel {
  id: string;
  platform: 'facebook' | 'tiktok';
  pixel_id: string;
  is_active: boolean;
  page_route: string | null;
  created_at: string;
}

export const PixelManager = () => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newPixel, setNewPixel] = useState({ platform: '', pixel_id: '', page_route: '' });

  useEffect(() => {
    fetchPixels();
  }, []);

  const fetchPixels = async () => {
    try {
      const { data, error } = await supabase
        .from('tracking_pixels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPixels((data || []) as Pixel[]);
    } catch (error: any) {
      toast.error("Erro ao carregar pixels: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addPixel = async () => {
    if (!newPixel.platform || !newPixel.pixel_id) {
      toast.error("Preencha todos os campos");
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase
        .from('tracking_pixels')
        .insert([{
          platform: newPixel.platform as 'facebook' | 'tiktok',
          pixel_id: newPixel.pixel_id,
          is_active: true,
          page_route: newPixel.page_route || null
        }]);

      if (error) throw error;

      toast.success("Pixel adicionado com sucesso!");
      setNewPixel({ platform: '', pixel_id: '', page_route: '' });
      fetchPixels();
    } catch (error: any) {
      toast.error("Erro ao adicionar pixel: " + error.message);
    } finally {
      setAdding(false);
    }
  };

  const deletePixel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tracking_pixels')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Pixel removido com sucesso!");
      fetchPixels();
    } catch (error: any) {
      toast.error("Erro ao remover pixel: " + error.message);
    }
  };

  const togglePixel = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('tracking_pixels')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success(currentStatus ? "Pixel desativado" : "Pixel ativado");
      fetchPixels();
    } catch (error: any) {
      toast.error("Erro ao atualizar pixel: " + error.message);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Facebook className="h-5 w-5" />
          Gerenciamento de Pixels
        </CardTitle>
        <CardDescription>
          Adicione pixels do Facebook Ads e TikTok Ads para rastrear conversões
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Pixel Form */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <h3 className="font-semibold">Adicionar Novo Pixel</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Plataforma</Label>
              <Select
                value={newPixel.platform}
                onValueChange={(value) => setNewPixel({ ...newPixel, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>ID do Pixel</Label>
              <Input
                placeholder="Ex: 123456789012345"
                value={newPixel.pixel_id}
                onChange={(e) => setNewPixel({ ...newPixel, pixel_id: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Rota (opcional)</Label>
              <Input
                placeholder="Ex: /ninja-crispi (vazio = global)"
                value={newPixel.page_route}
                onChange={(e) => setNewPixel({ ...newPixel, page_route: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addPixel} disabled={adding} className="w-full">
                {adding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Pixel
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Existing Pixels List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Pixels Configurados</h3>
          {pixels.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum pixel configurado ainda. Adicione seu primeiro pixel acima.
            </p>
          ) : (
            pixels.map((pixel) => (
              <div
                key={pixel.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-card"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold capitalize">{pixel.platform} Pixel</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${pixel.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'}`}>
                      {pixel.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ID: {pixel.pixel_id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePixel(pixel.id, pixel.is_active)}
                  >
                    {pixel.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remover Pixel</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja remover este pixel? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletePixel(pixel.id)}>
                          Remover
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
