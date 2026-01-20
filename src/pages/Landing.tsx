import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Brain, 
  Target, 
  Trophy,
  Terminal,
  Clock,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Flame,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: 'Método Socrático',
      description: 'Aprenda através de perguntas que fazem você pensar. Por quê? Para quê? Como?',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Target,
      title: 'Princípio de Pareto',
      description: 'Foque nos 20% que geram 80% dos resultados. Conteúdo otimizado para processos seletivos.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Clock,
      title: 'Curva de Ebbinghaus',
      description: 'Revisões programadas no momento certo para maximizar retenção a longo prazo.',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: Terminal,
      title: 'Terminal Interativo',
      description: 'Pratique Python real diretamente no navegador. Sem instalar nada.',
      color: 'text-terminal-text',
      bgColor: 'bg-terminal-bg',
    },
    {
      icon: GraduationCap,
      title: 'Simulador de Provas',
      description: 'Prepare-se para processos seletivos com simulados cronometrados e modo hard.',
      color: 'text-xp',
      bgColor: 'bg-xp/10',
    },
    {
      icon: BarChart3,
      title: 'Análise de Desempenho',
      description: 'Identifique seus pontos fracos e receba recomendações personalizadas.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];
  
  const stats = [
    { value: '300+', label: 'Exercícios' },
    { value: '9', label: 'Módulos' },
    { value: '100%', label: 'Prático' },
    { value: '0', label: 'Decoreba' },
  ];
  
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <Flame className="w-4 h-4 text-streak" />
              <span className="text-sm font-medium">Preparação para MBA</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Domine{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Python
              </span>
              {' '}e{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning to-streak">
                Pandas
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Do zero ao nível necessário para ser aprovado em processos seletivos de bolsas de MBA. 
              <span className="text-foreground font-medium"> Sem decoreba. Com raciocínio lógico.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/learn">
                <Button variant="hero" size="xl" className="gap-2 animate-pulse-glow">
                  Começar Agora
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/practice">
                <Button variant="outline" size="xl" className="gap-2">
                  <Terminal className="w-5 h-5" />
                  Ver Demo
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Metodologia Cientificamente Comprovada
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combinamos técnicas pedagógicas avançadas para garantir que você 
              <span className="text-foreground font-medium"> realmente aprenda</span>, não apenas memorize.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={cn(
                    "p-6 rounded-2xl border border-border/50 bg-card/50",
                    "hover:bg-card hover:border-border transition-all duration-300",
                    "hover:scale-[1.02] hover:shadow-xl",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.bgColor)}>
                    <Icon className={cn("w-6 h-6", feature.color)} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Learning Path Preview */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trilha de Aprendizado Completa
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Do básico ao intermediário, você não avança sem dominar cada etapa.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Python Path */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🐍</span>
                  <h3 className="text-2xl font-bold">Python</h3>
                </div>
                
                {['Fundamentos', 'Lógica e Decisões', 'Loops', 'Estruturas de Dados', 'Funções'].map((topic, i) => (
                  <div key={topic} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {i + 1}
                    </div>
                    <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>{topic}</span>
                    {i === 0 && <CheckCircle2 className="w-5 h-5 text-success ml-auto" />}
                  </div>
                ))}
              </div>
              
              {/* Pandas Path */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🐼</span>
                  <h3 className="text-2xl font-bold">Pandas</h3>
                </div>
                
                {['Introdução', 'Manipulação de Dados', 'Análise e Agregação', 'Técnicas Avançadas'].map((topic, i) => (
                  <div key={topic} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-muted text-muted-foreground">
                      {i + 6}
                    </div>
                    <span className="text-muted-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para conquistar sua bolsa de MBA?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Comece agora mesmo. É grátis, sem cadastro, e você pode praticar direto no navegador.
            </p>
            
            <Link to="/learn">
              <Button variant="hero" size="xl" className="gap-2 animate-pulse-glow">
                <BookOpen className="w-5 h-5" />
                Começar a Aprender
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐼</span>
              <span className="font-bold">PyPandas</span>
              <span className="text-muted-foreground">• Aprenda de verdade</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Feito para quem quer passar em processos seletivos de MBA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;