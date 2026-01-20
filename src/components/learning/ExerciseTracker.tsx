import { LessonStats, MASTERY_CONFIG } from '@/types/learning';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  CheckCircle2, 
  TrendingUp,
  AlertTriangle,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseTrackerProps {
  lessonId: string;
  lessonStats: LessonStats | undefined;
  exercisesRequired: number;
}

const ExerciseTracker = ({ lessonId, lessonStats, exercisesRequired }: ExerciseTrackerProps) => {
  const stats = lessonStats || {
    lessonId,
    exercisesCompleted: 0,
    correctAnswers: 0,
    totalAttempts: 0,
    lastPracticed: new Date(),
    masteryLevel: 0,
    reviewCount: 0
  };
  
  const minRequired = Math.max(exercisesRequired, MASTERY_CONFIG.minExercisesPerConcept);
  const correctRate = stats.totalAttempts > 0 
    ? stats.correctAnswers / stats.totalAttempts 
    : 0;
  const progressToMastery = (stats.exercisesCompleted / minRequired) * 100;
  const hasMastery = stats.exercisesCompleted >= minRequired && 
                    correctRate >= MASTERY_CONFIG.minCorrectRate;
  
  const getRateColor = (rate: number) => {
    if (rate >= 0.8) return 'text-success';
    if (rate >= 0.6) return 'text-warning';
    return 'text-destructive';
  };
  
  return (
    <div className="p-4 rounded-xl border border-border/50 bg-card/50">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Progresso para Maestria
        </h4>
        {hasMastery && (
          <div className="flex items-center gap-1 text-success text-sm font-medium">
            <Trophy className="w-4 h-4" />
            Dominado!
          </div>
        )}
      </div>
      
      {/* Main Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Exercícios: {stats.exercisesCompleted} / {minRequired}
          </span>
          <span className={cn(
            "font-medium",
            progressToMastery >= 100 ? "text-success" : "text-primary"
          )}>
            {Math.min(100, Math.round(progressToMastery))}%
          </span>
        </div>
        <Progress 
          value={Math.min(100, progressToMastery)} 
          className="h-3"
        />
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <div className="text-2xl font-bold text-primary">
            {stats.exercisesCompleted}
          </div>
          <div className="text-xs text-muted-foreground">Exercícios</div>
        </div>
        
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <div className={cn(
            "text-2xl font-bold",
            getRateColor(correctRate)
          )}>
            {Math.round(correctRate * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Acertos</div>
        </div>
        
        <div className="p-3 rounded-lg bg-secondary/30 text-center">
          <div className="text-2xl font-bold text-accent">
            {stats.reviewCount}
          </div>
          <div className="text-xs text-muted-foreground">Revisões</div>
        </div>
      </div>
      
      {/* Mastery Requirements */}
      <div className="mt-4 p-3 rounded-lg bg-muted/30">
        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          Requisitos para Maestria:
        </h5>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Mínimo {minRequired} exercícios
            </span>
            {stats.exercisesCompleted >= minRequired ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <span className="text-xs text-warning">
                Faltam {minRequired - stats.exercisesCompleted}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Taxa de acerto ≥ 80%
            </span>
            {correctRate >= MASTERY_CONFIG.minCorrectRate ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <span className={cn(
                "text-xs",
                correctRate >= 0.6 ? "text-warning" : "text-destructive"
              )}>
                Atual: {Math.round(correctRate * 100)}%
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Warning if struggling */}
      {stats.totalAttempts > 5 && correctRate < 0.6 && (
        <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
            <div>
              <p className="text-sm font-medium text-warning">
                Revise a teoria antes de continuar
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Sua taxa de acerto está abaixo do ideal. Recomendamos revisar 
                os conceitos teóricos antes de fazer mais exercícios.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseTracker;
