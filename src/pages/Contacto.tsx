import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LegalFooter } from "@/components/LegalFooter";

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Build WhatsApp message
    const message = encodeURIComponent(
      `Hola, mi nombre es ${form.nombre}.\n\nEmail: ${form.email}\nTeléfono: ${form.telefono}\n\nMensaje: ${form.mensaje}`
    );
    window.open(`https://wa.me/50200000000?text=${message}`, "_blank");

    toast.success("¡Redirigido a WhatsApp! También puedes escribirnos por correo.");
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-foreground">Contáctanos</h1>
        <p className="text-muted-foreground mb-8">¿Tienes alguna pregunta? Estamos aquí para ayudarte.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl border bg-card space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Información de Contacto</h2>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+502 0000-0000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">soporte@vevshao.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+502 0000-0000</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Horario de Atención</h3>
              <p className="text-sm text-muted-foreground">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted-foreground">Sábado: 9:00 AM - 1:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="p-6 rounded-xl border bg-card space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Envíanos un Mensaje</h2>

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" placeholder="Tu nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input id="telefono" placeholder="+502 0000-0000" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea id="mensaje" placeholder="¿En qué podemos ayudarte?" rows={4} value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} required />
            </div>

            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="w-4 h-4 mr-2" />
              Enviar por WhatsApp
            </Button>
          </form>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
};

export default Contacto;
