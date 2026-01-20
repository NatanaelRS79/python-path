import { BlockedModule, WeakPoint } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { 
  Lock, 
  AlertTriangle, 
  Target, 
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface MasteryGateProps {
  blockedModule: BlockedModule;
  weakPoints: WeakPoint[];
  onReviewClick: (lessonId: string) => void;
}

const MasteryGate = ({ blockedModule, weakPoints, onReviewClick }: MasteryGateProps) => {
  const progressPercentage = (blockedModule.currentMastery / blockedModule.requiredMastery) * 100;
  const missingPercentage = blockedModule.requiredMastery - blockedModule.currentMastery;
  
  // Get relevant weak points for this blocked module
  const relevantWeakPoints = weakPoints.filter(wp => 
    blockedModule.missingConcepts.includes(wp.topic) ||
    wp.moduleId === blockedModule.requiredModuleId
  );
  
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
      {/* Lock Header */}
      <div className="text-center p-8 rounded-2xl border border-warning/30 bg-warning/5">
        <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-10 h-10 text-warning" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Módulo Bloqueado</h2>
        <p className="text-muted-foreground">
          Você precisa dominar o módulo anterior antes de avançar
        </p>
      </div>
      
      {/* Progress to Unlock */}
      <div className="p-6 rounded-xl border border-border/50 bg-card/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Progresso para Desbloquear
          </h3>
          <span className="text-sm text-muted-foreground">
            {blockedModule.currentMastery}% / {blockedModule.requiredMastery}%
          </span>
        </div>
        
        <Progress value={progressPercentage} className="h-3 mb-4" />
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Faltam <span className="font-bold text-warning">{missingPercentage}%</span> de maestria
          </span>
          <span className="text-muted-foreground">
            Meta: {blockedModule.requiredMastery}%
          </span>
        </div>
      </div>
      
      {/* Missing Concepts */}
      {blockedModule.missingConcepts.length > 0 && (
        <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Conceitos que Precisam de Reforço
          </h3>
          <div className="space-y-2">
            {blockedModule.missingConcepts.map((concept, i) => (
              <div 
                key={i}
                className="p-3 rounded-lg bg-background/50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">
                    {i + 1}
                  </span>
                  <span className="text-foreground">{concept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Weak Points Analysis */}
      {relevantWeakPoints.length > 0 && (
        <div className="p-6 rounded-xl border border-warning/30 bg-warning/5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5 text-warning" />
            Seus Pontos Fracos Identificados
          </h3>
          <div className="space-y-3">
            {relevantWeakPoints.map((wp, i) => (
              <div 
                key={i}
                className="p-4 rounded-lg bg-background/50 border border-border/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{wp.topic}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                    {wp.errorCount} erros
                  </span>
                </div>
                {wp.improvementSuggestions.length > 0 && (
                  <p className="text-sm text-muted-foreground mb-3">
                    💡 {wp.improvementSuggestions[0]}
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReviewClick(wp.lessonId)}
                  className="w-full gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Revisar Este Conceito
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommended Review Path */}
      {blockedModule.recommendedReview.length > 0 && (
        <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Caminho Recomendado de Revisão
          </h3>
          <div className="space-y-2">
            {blockedModule.recommendedReview.map((lessonId, i) => (
              <div 
                key={lessonId}
                className={cn(
                  "p-3 rounded-lg flex items-center gap-3",
                  i === 0 ? "bg-primary/10 border border-primary/30" : "bg-background/50"
                )}
              >
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {i + 1}
                </span>
                <span className={cn(
                  i === 0 ? "text-primary font-medium" : "text-muted-foreground"
                )}>
                  {lessonId}
                </span>
                {i === 0 && (
                  <ArrowRight className="w-4 h-4 text-primary ml-auto" />
                )}
              </div>
            ))}
          </div>
          
          <Link to={`/review/${blockedModule.recommendedReview[0]}`}>
            <Button variant="hero" size="lg" className="w-full mt-4 gap-2">
              Começar Revisão
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      )}
      
      {/* Motivation */}
      <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 text-center">
        <p className="text-sm text-muted-foreground">
          💪 <span className="font-medium">Lembre-se:</span> Dominar os fundamentos é essencial 
          para sucesso no processo seletivo. Cada revisão te deixa mais preparado!
        </p>
      </div>
    </div>
  );
};

export default MasteryGate;
