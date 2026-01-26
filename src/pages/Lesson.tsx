import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import TheoryLesson from '@/components/learning/TheoryLesson';
import SocraticExercise from '@/components/exercise/SocraticExercise';
import ExerciseTracker from '@/components/learning/ExerciseTracker';
import MasteryGate from '@/components/learning/MasteryGate';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  curriculum, 
  sampleExercises, 
  sampleTheoryContent 
} from '@/data/curriculum';
import { useProgressStore } from '@/stores/useProgressStore';
import { Exercise, TheoryContent } from '@/types/learning';
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Target,
  CheckCircle2,
  Lock,
  ChevronRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

type LessonPhase = 'loading' | 'blocked' | 'theory' | 'exercises' | 'complete';

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    progress, 
    updateLessonStats, 
    scheduleReview, 
    completeLesson,
    addXP,
    addWeakPoint,
    getLessonStats,
    checkModuleAccess
  } = useProgressStore();
  
  const [phase, setPhase] = useState<LessonPhase>('loading');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  // Find lesson and module
  const lesson = curriculum
    .flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, module: m })))
    .find(l => l.id === id);
  
  const module = lesson?.module;
  const lessonStats = lesson ? getLessonStats(lesson.id) : undefined;
  
  // Get theory content for this lesson
  const theoryContent = sampleTheoryContent.find(t => t.lessonId === id);
  
  // Get exercises for this lesson
  const lessonExercises = sampleExercises.filter(e => e.lessonId === id);
  
  // Check if module is unlocked before allowing access
  useEffect(() => {
    if (!lesson || !module) {
      setPhase('loading');
      return;
    }
    
    // Check if module is unlocked in curriculum
    if (!module.unlocked) {
      // Find previous module for mastery gate info
      const moduleIndex = curriculum.findIndex(m => m.id === module.id);
      if (moduleIndex > 0) {
        const prevModule = curriculum[moduleIndex - 1];
        const blocked = checkModuleAccess(module.id, prevModule.id, prevModule.requiredMastery);
        if (blocked) {
          setPhase('blocked');
          return;
        }
      }
    }
    
    // Determine starting phase based on lesson type and completion
    if (lesson.type === 'theory' && theoryContent) {
      setPhase('theory');
    } else if (lessonExercises.length > 0) {
      setPhase('exercises');
    } else {
      setPhase('theory');
    }
  }, [lesson, module, id]);
  
  if (!lesson || !module) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lição não encontrada</h1>
            <Button onClick={() => navigate('/learn')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const handleTheoryComplete = (passed: boolean) => {
    if (passed) {
      // Schedule review for this concept
      scheduleReview(lesson.id, `theory-${lesson.id}`, lesson.title);
      addXP(lesson.xpReward);
      
      if (lessonExercises.length > 0) {
        setPhase('exercises');
      } else {
        completeLesson(lesson.id);
        setPhase('complete');
      }
    }
    // If not passed, TheoryLesson will show retry option
  };
  
  const handleExerciseComplete = (correct: boolean) => {
    updateLessonStats(lesson.id, correct);
    setExercisesCompleted(prev => prev + 1);
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      // Track weak point
      const exercise = lessonExercises[currentExerciseIndex];
      if (exercise) {
        addWeakPoint({
          topic: exercise.tags[0] || lesson.title,
          moduleId: module.id,
          lessonId: lesson.id,
          errorCount: 1,
          lastError: new Date(),
          recommendedReview: new Date(),
          specificErrors: [exercise.question.substring(0, 100)],
          improvementSuggestions: [`Revise o conceito: ${lesson.title}`],
        });
      }
    }
    
    // Move to next exercise or complete
    if (currentExerciseIndex < lessonExercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Check if mastery achieved
      const totalExercises = exercisesCompleted + 1;
      const totalCorrect = correctAnswers + (correct ? 1 : 0);
      const rate = totalCorrect / totalExercises;
      
      if (rate >= 0.8 && totalExercises >= 5) {
        completeLesson(lesson.id);
        scheduleReview(lesson.id, `exercises-${lesson.id}`, lesson.title);
        setPhase('complete');
      } else if (totalExercises >= lessonExercises.length) {
        // All exercises done but not mastered - would need more exercises
        setPhase('complete');
      }
    }
  };
  
  const handleReviewClick = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };
  
  const currentExercise = lessonExercises[currentExerciseIndex];
  const exerciseProgress = lessonExercises.length > 0 
    ? ((currentExerciseIndex + 1) / lessonExercises.length) * 100 
    : 0;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/learn')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{module.icon}</span>
            <span>{module.title}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{lesson.title}</span>
          </div>
        </div>
        
        {/* Phase: Blocked */}
        {phase === 'blocked' && (
          <MasteryGate
            blockedModule={{
              moduleId: module.id,
              requiredModuleId: curriculum[curriculum.findIndex(m => m.id === module.id) - 1]?.id || '',
              requiredMastery: 80,
              currentMastery: 0,
              missingConcepts: ['Módulo anterior não completado'],
              recommendedReview: [],
            }}
            weakPoints={progress.weakPoints}
            onReviewClick={handleReviewClick}
          />
        )}
        
        {/* Phase: Theory */}
        {phase === 'theory' && theoryContent && (
          <TheoryLesson
            theory={theoryContent}
            onComplete={handleTheoryComplete}
          />
        )}
        
        {/* Phase: Exercises */}
        {phase === 'exercises' && currentExercise && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Exercise Progress Header */}
            <div className="p-4 rounded-xl border border-border/50 bg-card/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{lesson.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      Exercício {currentExerciseIndex + 1} de {lessonExercises.length}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">{correctAnswers}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">acertos</p>
                </div>
              </div>
              <Progress value={exerciseProgress} className="h-2" />
            </div>
            
            {/* Exercise Tracker */}
            <ExerciseTracker
              lessonId={lesson.id}
              lessonStats={lessonStats}
              exercisesRequired={lesson.exercisesRequired}
            />
            
            {/* Current Exercise */}
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
                  <div className="text-2xl font-bold text-success">
                    {exercisesCompleted > 0 ? Math.round((correctAnswers / exercisesCompleted) * 100) : 0}%
                  </div>
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
              <Button variant="hero" onClick={() => {
                // Find next lesson
                const currentIndex = module.lessons.findIndex(l => l.id === lesson.id);
                const nextLesson = module.lessons[currentIndex + 1];
                if (nextLesson) {
                  navigate(`/lesson/${nextLesson.id}`);
                } else {
                  navigate('/learn');
                }
              }}>
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
        )}
        
        {/* Phase: Loading */}
        {phase === 'loading' && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-pulse text-muted-foreground">Carregando...</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Lesson;
