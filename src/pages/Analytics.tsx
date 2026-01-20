import Header from '@/components/layout/Header';
import { useProgressStore } from '@/stores/useProgressStore';
import { curriculum } from '@/data/curriculum';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Analytics = () => {
  const { progress } = useProgressStore();
  
  // Calculate analytics
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const completionRate = Math.round((completedLessons / totalLessons) * 100);
  
  const examAverage = progress.examHistory.length > 0
    ? Math.round(progress.examHistory.reduce((acc, e) => acc + e.score, 0) / progress.examHistory.length)
    : 0;
  
  const avgTimePerExam = progress.examHistory.length > 0
    ? Math.round(progress.examHistory.reduce((acc, e) => acc + e.timeSpent, 0) / progress.examHistory.length / 60)
    : 0;
  
  // Category progress
  const categoryProgress = curriculum.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = { total: 0, completed: 0 };
    }
    acc[module.category].total += module.lessons.length;
    acc[module.category].completed += module.lessons.filter(l => 
      progress.completedLessons.includes(l.id)
    ).length;
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);
  
  const categoryLabels: Record<string, { label: string; icon: string }> = {
    'python-basics': { label: 'Python Básico', icon: '🐍' },
    'python-intermediate': { label: 'Python Intermediário', icon: '⚡' },
    'pandas-basics': { label: 'Pandas Básico', icon: '🐼' },
    'pandas-intermediate': { label: 'Pandas Intermediário', icon: '📊' },
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Análise de Desempenho
          </h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe seu progresso e identifique pontos de melhoria
          </p>
        </div>
        
        {/* Overview Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-6 h-6 text-primary" />
              <span className={cn(
                "text-xs font-medium px-2 py-1 rounded-full",
                completionRate >= 70 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
              )}>
                {completionRate >= 70 ? 'No caminho!' : 'Continue!'}
              </span>
            </div>
            <p className="text-3xl font-bold">{completionRate}%</p>
            <p className="text-sm text-muted-foreground">Progresso geral</p>
          </div>
          
          <div className="p-5 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-6 h-6 text-xp" />
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <p className="text-3xl font-bold">{progress.totalXp.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">XP total</p>
          </div>
          
          <div className="p-5 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <p className="text-3xl font-bold">{examAverage}%</p>
            <p className="text-sm text-muted-foreground">Média em simulados</p>
          </div>
          
          <div className="p-5 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <p className="text-3xl font-bold">{avgTimePerExam}min</p>
            <p className="text-sm text-muted-foreground">Tempo médio/prova</p>
          </div>
        </div>
        
        {/* Category Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Progresso por Categoria</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(categoryProgress).map(([key, data]) => {
              const info = categoryLabels[key];
              const percentage = Math.round((data.completed / data.total) * 100);
              
              return (
                <div key={key} className="p-5 rounded-xl border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{info.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {data.completed}/{data.total} lições
                      </p>
                    </div>
                    <span className="text-lg font-bold text-primary">{percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Weak Points */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Pontos Fracos
          </h2>
          
          {progress.weakPoints.length > 0 ? (
            <div className="space-y-3">
              {progress.weakPoints.map((wp, index) => (
                <div 
                  key={wp.topic}
                  className="p-4 rounded-xl border border-warning/30 bg-warning/5 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium">{wp.topic}</h4>
                    <p className="text-sm text-muted-foreground">
                      {wp.errorCount} erros • Última vez: {new Date(wp.lastError).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-warning font-medium">Revisar</p>
                    <p className="text-xs text-muted-foreground">
                      Recomendado: {new Date(wp.recommendedReview).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-success/30 bg-success/5 text-center">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Nenhum ponto fraco identificado!</h3>
              <p className="text-muted-foreground">
                Continue praticando para manter esse nível excelente.
              </p>
            </div>
          )}
        </div>
        
        {/* Recent Exams */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Histórico de Simulados</h2>
          
          {progress.examHistory.length > 0 ? (
            <div className="space-y-3">
              {progress.examHistory.slice(-5).reverse().map((exam, index) => (
                <div 
                  key={exam.id}
                  className="p-4 rounded-xl border border-border/50 bg-card/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold",
                      exam.score >= 70 ? "bg-success/10 text-success" : 
                      exam.score >= 50 ? "bg-warning/10 text-warning" : 
                      "bg-destructive/10 text-destructive"
                    )}>
                      {exam.score}%
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Simulado {exam.mode === 'hard' ? '(Hard Mode)' : ''}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString('pt-BR')} • {exam.totalQuestions} questões • {Math.round(exam.timeSpent / 60)}min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {exam.score >= 70 ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-border/50 bg-card/50 text-center">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Nenhum simulado realizado</h3>
              <p className="text-muted-foreground">
                Faça um simulado para ver suas estatísticas aqui.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;