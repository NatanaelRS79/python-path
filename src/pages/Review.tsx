import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import EbbinghausReview from '@/components/learning/EbbinghausReview';
import SocraticExercise from '@/components/exercise/SocraticExercise';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/useProgressStore';
import { sampleExercises, curriculum } from '@/data/curriculum';
import { ReviewItem } from '@/types/learning';
import { 
  ArrowLeft, 
  Brain, 
  Calendar,
  CheckCircle2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

type ReviewPhase = 'dashboard' | 'reviewing' | 'complete';

const Review = () => {
  const navigate = useNavigate();
  const { 
    progress, 
    completeReview, 
    getOverdueReviews,
    getTodayReviews,
    updateLessonStats
  } = useProgressStore();
  
  const [phase, setPhase] = useState<ReviewPhase>('dashboard');
  const [currentReviewItems, setCurrentReviewItems] = useState<ReviewItem[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);
  
  const overdueReviews = getOverdueReviews();
  const todayReviews = getTodayReviews();
  
  const handleStartReview = (items: ReviewItem[]) => {
    setCurrentReviewItems(items);
    setCurrentReviewIndex(0);
    setCorrectCount(0);
    setTotalReviewed(0);
    setPhase('reviewing');
  };
  
  const handleExerciseComplete = (correct: boolean) => {
    const currentItem = currentReviewItems[currentReviewIndex];
    
    // Update stats
    updateLessonStats(currentItem.lessonId, correct);
    setTotalReviewed(prev => prev + 1);
    if (correct) {
      setCorrectCount(prev => prev + 1);
    }
    
    // Calculate performance for this review
    const performance = correct ? 1 : 0.4;
    completeReview(currentItem.lessonId, currentItem.conceptId, performance);
    
    // Move to next or complete
    if (currentReviewIndex < currentReviewItems.length - 1) {
      setCurrentReviewIndex(prev => prev + 1);
    } else {
      setPhase('complete');
    }
  };
  
  // Get exercise for current review item
  const getCurrentExercise = () => {
    if (currentReviewItems.length === 0) return null;
    const currentItem = currentReviewItems[currentReviewIndex];
    
    // Find an exercise related to this lesson
    const exercises = sampleExercises.filter(e => e.lessonId === currentItem.lessonId);
    if (exercises.length > 0) {
      // Return a random exercise from this lesson
      return exercises[Math.floor(Math.random() * exercises.length)];
    }
    
    // If no specific exercise, return any available
    return sampleExercises[Math.floor(Math.random() * sampleExercises.length)];
  };
  
  const currentExercise = getCurrentExercise();
  const currentItem = currentReviewItems[currentReviewIndex];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => phase === 'dashboard' ? navigate('/learn') : setPhase('dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {phase === 'dashboard' ? 'Voltar' : 'Parar Revisão'}
          </Button>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold">Sistema de Revisão</h1>
          </div>
        </div>
        
        {/* Phase: Dashboard */}
        {phase === 'dashboard' && (
          <div className="max-w-4xl mx-auto">
            <EbbinghausReview
              reviewSchedule={progress.reviewSchedule}
              onStartReview={handleStartReview}
            />
            
            {/* Stats Summary */}
            {progress.reviewSchedule.length > 0 && (
              <div className="mt-8 p-6 rounded-xl border border-border/50 bg-card/50">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Estatísticas de Revisão
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/30 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {progress.reviewSchedule.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Agendadas</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30 text-center">
                    <div className="text-2xl font-bold text-destructive">
                      {overdueReviews.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Atrasadas</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30 text-center">
                    <div className="text-2xl font-bold text-success">
                      {progress.reviewSchedule.filter(r => r.repetitions > 0).length}
                    </div>
                    <div className="text-xs text-muted-foreground">Já Revisadas</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Phase: Reviewing */}
        {phase === 'reviewing' && currentExercise && currentItem && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Review Progress */}
            <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Revisão: {currentItem.topic}</h2>
                    <p className="text-sm text-muted-foreground">
                      {currentReviewIndex + 1} de {currentReviewItems.length} conceitos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Intervalo atual</div>
                  <div className="font-medium text-primary">
                    {currentItem.interval} {currentItem.interval === 1 ? 'dia' : 'dias'}
                  </div>
                </div>
              </div>
              
              {/* Progress dots */}
              <div className="flex gap-1.5">
                {currentReviewItems.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      i < currentReviewIndex 
                        ? 'bg-success' 
                        : i === currentReviewIndex 
                          ? 'bg-primary' 
                          : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Exercise */}
            <SocraticExercise
              exercise={currentExercise}
              onComplete={handleExerciseComplete}
            />
          </div>
        )}
        
        {/* Phase: Complete */}
        {phase === 'complete' && (
          <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="p-8 rounded-2xl border border-success/30 bg-success/5">
              <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Revisão Concluída! 🧠</h2>
              <p className="text-muted-foreground mb-4">
                Você revisou {totalReviewed} conceito{totalReviewed !== 1 ? 's' : ''}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-success">
                    {totalReviewed > 0 ? Math.round((correctCount / totalReviewed) * 100) : 0}%
                  </div>
                  <div className="text-xs text-muted-foreground">Taxa de Acerto</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50">
                  <div className="text-2xl font-bold text-primary">{correctCount}</div>
                  <div className="text-xs text-muted-foreground">Respostas Corretas</div>
                </div>
              </div>
            </div>
            
            {/* Ebbinghaus Explanation */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-left">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Próximas Revisões Agendadas</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Baseado no seu desempenho, os intervalos foram ajustados automaticamente. 
                Conceitos bem respondidos terão intervalos maiores; conceitos errados 
                serão revisados mais cedo.
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" onClick={() => setPhase('dashboard')}>
                Ver Mais Revisões
              </Button>
              <Button variant="hero" onClick={() => navigate('/learn')}>
                Continuar Aprendendo
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Review;
