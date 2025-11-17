import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Truck,
  CreditCard,
  Shield,
  Star,
  Check,
  Play,
  Wifi,
  Smartphone,
  Volume2,
  Zap,
  Package,
  Gift,
  Clock,
  Users,
} from "lucide-react";
import projectorMain from "@/assets/projector-main.jpg";
import projectorLifestyle1 from "@/assets/projector-lifestyle-1.jpg";
import projectorLifestyle2 from "@/assets/projector-lifestyle-2.jpg";
import projectorDetail from "@/assets/projector-detail.jpg";

const Index = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [projectorMain, projectorLifestyle1, projectorLifestyle2, projectorDetail];

  const features = [
    {
      icon: Play,
      title: "Imagens Nítidas 4K",
      description: "Desfrute de imagens cristalinas em qualquer ambiente",
    },
    {
      icon: Volume2,
      title: "Som Envolvente",
      description: "Alto-falantes integrados com áudio de alta qualidade",
    },
    {
      icon: Wifi,
      title: "Conectividade Total",
      description: "WiFi, Bluetooth, HDMI, USB e muito mais",
    },
    {
      icon: Smartphone,
      title: "Compatível com Todos Dispositivos",
      description: "Conecte smartphone, laptop, console e TV box",
    },
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      rating: 5,
      comment: "Incrível! Transformou minha sala em um cinema. A qualidade de imagem é excepcional e a instalação foi super fácil.",
      date: "Há 2 dias",
    },
    {
      name: "João Santos",
      rating: 5,
      comment: "Melhor compra que fiz esse ano! O som é ótimo e a conectividade com meu celular é perfeita. Recomendo muito!",
      date: "Há 1 semana",
    },
    {
      name: "Ana Costa",
      rating: 5,
      comment: "Produto de qualidade profissional! Uso para reuniões de trabalho e também para assistir filmes. Vale cada centavo.",
      date: "Há 2 semanas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Trust Bar */}
      <div className="bg-gradient-hero text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Frete Grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pague na Entrega</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Garantia de 30 Dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery */}
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden shadow-large mb-4 bg-white">
              <img
                src={images[selectedImage]}
                alt="Projetor VEVSHAO A10"
                className="w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedImage === idx
                      ? "border-primary shadow-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Imagem ${idx + 1}`}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-scale-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                (200+ avaliações)
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-foreground leading-tight">
              PROJETOR VEVSHAO A10 + PRESENTE
              <Badge className="ml-3 bg-primary text-primary-foreground text-sm px-3 py-1 animate-pulse-glow">
                COMPRE 1 E LEVE OUTRO GRÁTIS
              </Badge>
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              Transforme qualquer espaço em um cinema com conectividade completa e som envolvente.
            </p>

            <div className="mb-6 p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold text-primary">R$ 129,00</span>
                <span className="text-2xl text-muted-foreground line-through">R$ 399,00</span>
              </div>
              <div className="flex items-center gap-2 text-success">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Economize 68% hoje!</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 mb-6">
              {[
                "Desfruta imagens nítidas em qualquer habitação",
                "Experimenta sonido envolvente sem altavoces extra",
                "Conecta dispositivos facilmente com múltiplas opções",
                "Proyecta con claridad incluso con luz ambiental",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check className="w-4 h-4 text-success-foreground" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-semibold mb-3 text-foreground">Quantidade:</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-6 py-3 bg-secondary hover:bg-muted transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="px-8 py-3 font-bold text-lg border-x-2 border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-6 py-3 bg-secondary hover:bg-muted transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                size="lg"
                className="w-full text-lg font-bold py-7 bg-gradient-hero hover:shadow-glow transition-all animate-pulse-glow"
              >
                <Gift className="w-6 h-6 mr-2" />
                COMPRAR AGORA - GANHE 2x1
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg font-bold py-7 border-2"
              >
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TrustBadge
                icon={Truck}
                title="Frete Grátis"
                description="Em todo Brasil"
              />
              <TrustBadge
                icon={Shield}
                title="Compra Segura"
                description="Garantia de 30 dias"
              />
              <TrustBadge
                icon={Clock}
                title="Entrega Rápida"
                description="5-7 dias úteis"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Características Profissionais
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnologia de ponta para proporcionar a melhor experiência visual
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Image Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                Experiência Cinematográfica em Casa
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Crie momentos inesquecíveis com sua família assistindo filmes, séries e jogando
                em uma tela gigante de até 200 polegadas. A qualidade de imagem 4K garante
                nitidez excepcional mesmo em ambientes com luz ambiente.
              </p>
              <div className="space-y-4">
                {[
                  "Resolução 1920x1080 Full HD",
                  "Projeção de 40 a 200 polegadas",
                  "Contraste 5000:1 para cores vibrantes",
                  "Lâmpada LED com 50.000 horas de vida",
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-large animate-scale-in">
              <img
                src={projectorLifestyle1}
                alt="Família assistindo projetor"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">
                O Que Nossos Clientes Dizem
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Mais de 200 avaliações positivas de clientes satisfeitos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Perguntas Frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Como funciona a promoção 2x1?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Ao comprar um projetor VEVSHAO A10, você automaticamente ganha outro projetor
                idêntico completamente grátis! É nossa forma de agradecer pela confiança em
                nossos produtos.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Qual é o prazo de entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                O prazo de entrega é de 5 a 7 dias úteis para todo o Brasil. Você receberá um
                código de rastreamento assim que o produto for despachado.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                O projetor é compatível com meu celular?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sim! O projetor é compatível com qualquer smartphone através de conexão WiFi,
                cabo HDMI ou adaptadores. Funciona com iOS, Android e todos os sistemas
                operacionais.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Existe garantia?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sim! Oferecemos garantia de 30 dias de satisfação garantida ou seu dinheiro de
                volta, além de 1 ano de garantia do fabricante contra defeitos de fabricação.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border rounded-lg px-6 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:text-primary">
                Como é o pagamento na entrega?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Você pode escolher pagar na entrega em dinheiro ou cartão diretamente ao
                entregador. Também aceitamos pagamento antecipado por cartão de crédito, débito,
                PIX e boleto bancário.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            Oferta Limitada: Compre 1 e Leve 2!
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Não perca essa oportunidade única de ter dois projetores profissionais pelo preço de
            um. Estoque limitado!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Clock className="w-6 h-6" />
              <span>Promoção válida por tempo limitado</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90 text-xl font-bold py-8 px-12 shadow-large"
          >
            GARANTIR MINHA PROMOÇÃO AGORA
          </Button>
          <p className="mt-6 text-sm opacity-75">
            ✓ Frete Grátis ✓ Pague na Entrega ✓ Garantia de 30 Dias
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © 2024 VEVSHAO. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
