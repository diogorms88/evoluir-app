import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Target, Award } from "lucide-react";

const ProgramInfoSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Aulas Teóricas e Práticas",
      description: "Combinação perfeita entre conhecimento teórico sólido e aplicação prática no ambiente real de trabalho."
    },
    {
      icon: Users,
      title: "Especialistas Internos",
      description: "Aprendizado com profissionais experientes da própria Plascar, que conhecem profundamente nossa cultura e processos."
    },
    {
      icon: Target,
      title: "Foco no Setor Automotivo",
      description: "Conteúdo especializado e atualizado sobre as tendências e desafios do mercado automotivo atual."
    },
    {
      icon: Award,
      title: "Desenvolvimento Profissional",
      description: "Capacitação contínua que prepara nossos colaboradores para os desafios e oportunidades do futuro."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sobre o <span className="bg-gradient-primary bg-clip-text text-transparent">Programa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            O Programa Evoluir é mais do que uma simples iniciativa de treinamento. 
            É um compromisso com o sucesso e a excelência de nossos colaboradores e da Plascar como um todo. 
            Na Plascar, acreditamos no poder do aprendizado contínuo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elegant transition-smooth border-0 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-primary/5 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Objetivos do Programa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">01</div>
              <h4 className="font-semibold text-lg">Imersão Completa</h4>
              <p className="text-muted-foreground">
                Proporcionar uma imersão completa no universo Plascar e do setor automotivo
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">02</div>
              <h4 className="font-semibold text-lg">Capacitação Especializada</h4>
              <p className="text-muted-foreground">
                Capacitar colaboradores com habilidades e conhecimentos necessários para o mercado atual
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">03</div>
              <h4 className="font-semibold text-lg">Compartilhamento</h4>
              <p className="text-muted-foreground">
                Criar oportunidades para compartilhar conhecimentos valiosos entre colegas de equipe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramInfoSection;