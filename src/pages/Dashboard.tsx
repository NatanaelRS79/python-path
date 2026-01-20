import { useState } from 'react';
import Header from '@/components/layout/Header';
import ModuleCard from '@/components/dashboard/ModuleCard';
import ProgressOverview from '@/components/dashboard/ProgressOverview';
import { curriculum } from '@/data/curriculum';
import { useProgressStore } from '@/stores/useProgressStore';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  BookOpen, 
  Target,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const { progress } = useProgressStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: 'python-basics', label: 'Python Básico', icon: '🐍' },
    { id: 'python-intermediate', label: 'Python Intermediário', icon: '⚡' },
    { id: 'pandas-basics', label: 'Pandas Básico', icon: '🐼' },
    { id: 'pandas-intermediate', label: 'Pandas Intermediário', icon: '📊' },
  ];
  
  const filteredModules = selectedCategory 
    ? curriculum.filter(m => m.category === selectedCategory)
    : curriculum;
  
  // Find next lesson to continue
  const nextModule = curriculum.find(m => m.unlocked && !m.completed);
  const nextLesson = nextModule?.lessons.find(l => !l.completed);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Olá, Estudante! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue sua jornada para dominar Python e Pandas.
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Continue Learning */}
          {nextLesson && nextModule && (
            <Link to={`/lesson/${nextLesson.id}`} className="block">
              <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-semibold mb-1">Continuar Aprendendo</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {nextLesson.title}
                </p>
              </div>
            </Link>
          )}
          
          {/* Practice Mode */}
          <Link to="/practice" className="block">
            <div className="p-5 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-semibold mb-1">Modo Prática</h3>
              <p className="text-sm text-muted-foreground">
                Exercícios aleatórios para fortalecer
              </p>
            </div>
          </Link>
          
          {/* Weak Points */}
          {progress.weakPoints.length > 0 && (
            <Link to="/review" className="block">
              <div className="p-5 rounded-xl border border-warning/30 bg-warning/5 hover:bg-warning/10 transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-warning group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="font-semibold mb-1">Pontos Fracos</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.weakPoints.length} tópicos para revisar
                </p>
              </div>
            </Link>
          )}
          
          {/* Streak reminder if no weak points */}
          {progress.weakPoints.length === 0 && (
            <div className="p-5 rounded-xl border border-streak/30 bg-streak/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-streak/10 flex items-center justify-center">
                  <Flame className={cn(
                    "w-5 h-5 text-streak",
                    progress.streak > 0 && "animate-streak-fire"
                  )} />
                </div>
              </div>
              <h3 className="font-semibold mb-1">
                {progress.streak > 0 ? `${progress.streak} dias seguidos!` : 'Comece sua sequência!'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {progress.streak > 0 
                  ? 'Continue estudando todo dia' 
                  : 'Estude hoje para iniciar'
                }
              </p>
            </div>
          )}
        </div>
        
        {/* Progress Overview */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Seu Progresso</h2>
          <ProgressOverview />
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Trilha de Aprendizado</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="gap-2"
              >
                <span>{cat.icon}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Modules Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              index={index}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;