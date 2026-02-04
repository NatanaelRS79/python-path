import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Brain, ChevronRight, Zap } from 'lucide-react';
import { Lesson, Module } from '@/types/learning';

interface CompletionSummaryProps {
  lesson: Lesson;
  module: Module;
  exercisesCompleted: number;
  correctAnswers: number;
}

const CompletionSummary = ({
  lesson,
  module,
  exercisesCompleted,
  correctAnswers,
}: CompletionSummaryProps) => {
  const navigate = useNavigate();
  
  const handleNextLesson = () => {
    const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
    const nextLesson = module.lessons[currentIndex + 1];
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      navigate('/learn');
    }
  };

  const accuracyRate = exercisesCompleted > 0 
    ? Math.round((correctAnswers / exercisesCompleted) * 100) 
    : 0;

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <div className="p-8 rounded-2xl border border-success/30 bg-success/5">
        <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Lição Concluída! 🎉</h2>
        <p className="text-muted-foreground mb-4">
          Você completou "{lesson.title}"
        </p>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-background/50">
            <div className="text-2xl font-bold text-primary">{exercisesCompleted}</div>
            <div className="text-xs text-muted-foreground">Exercícios</div>
          </div>
          <div className="p-4 rounded-lg bg-background/50">
            <div className="text-2xl font-bold text-success">{accuracyRate}%</div>
            <div className="text-xs text-muted-foreground">Acertos</div>
          </div>
          <div className="p-4 rounded-lg bg-background/50">
            <div className="text-2xl font-bold text-xp flex items-center justify-center gap-1">
              <Zap className="w-5 h-5" />
              {lesson.xpReward}
            </div>
            <div className="text-xs text-muted-foreground">XP Ganho</div>
          </div>
        </div>
      </div>
      
      {/* Next Steps */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={() => navigate('/learn')}>
          Voltar ao Dashboard
        </Button>
        <Button variant="hero" onClick={handleNextLesson}>
          Próxima Lição
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
      
      {/* Review Reminder */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Brain className="w-5 h-5" />
          <span className="font-medium">Revisão Agendada</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Este conceito será revisado em 1 dia para garantir retenção a longo prazo 
          (Curva de Ebbinghaus).
        </p>
      </div>
    </div>
  );
};

export default CompletionSummary;
