import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import TheoryLesson from '@/components/learning/TheoryLesson';
import MasteryGate from '@/components/learning/MasteryGate';
import LessonHeader from '@/components/lesson/LessonHeader';
import ExercisePhase from '@/components/lesson/ExercisePhase';
import CompletionSummary from '@/components/lesson/CompletionSummary';
import LessonNotFound from '@/components/lesson/LessonNotFound';
import LoadingPhase from '@/components/lesson/LoadingPhase';
import { 
  curriculum, 
  sampleExercises, 
  sampleTheoryContent 
} from '@/data/curriculum';
import { useProgressStore } from '@/stores/useProgressStore';

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
    return <LessonNotFound />;
  }
  
  const handleTheoryComplete = (passed: boolean) => {
    if (passed) {
      scheduleReview(lesson.id, `theory-${lesson.id}`, lesson.title);
      addXP(lesson.xpReward);
      
      if (lessonExercises.length > 0) {
        setPhase('exercises');
      } else {
        completeLesson(lesson.id);
        setPhase('complete');
      }
    }
  };
  
  const handleExerciseComplete = (correct: boolean) => {
    updateLessonStats(lesson.id, correct);
    setExercisesCompleted(prev => prev + 1);
    
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    } else {
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
      const totalExercises = exercisesCompleted + 1;
      const totalCorrect = correctAnswers + (correct ? 1 : 0);
      const rate = totalCorrect / totalExercises;
      
      if (rate >= 0.8 && totalExercises >= 5) {
        completeLesson(lesson.id);
        scheduleReview(lesson.id, `exercises-${lesson.id}`, lesson.title);
        setPhase('complete');
      } else if (totalExercises >= lessonExercises.length) {
        setPhase('complete');
      }
    }
  };
  
  const handleReviewClick = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };
  
  const currentExercise = lessonExercises[currentExerciseIndex];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <LessonHeader module={module} lesson={lesson} />
        
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
          <ExercisePhase
            lesson={lesson}
            lessonStats={lessonStats}
            currentExercise={currentExercise}
            currentExerciseIndex={currentExerciseIndex}
            totalExercises={lessonExercises.length}
            correctAnswers={correctAnswers}
            onExerciseComplete={handleExerciseComplete}
          />
        )}
        
        {/* Phase: Complete */}
        {phase === 'complete' && (
          <CompletionSummary
            lesson={lesson}
            module={module}
            exercisesCompleted={exercisesCompleted}
            correctAnswers={correctAnswers}
          />
        )}
        
        {/* Phase: Loading */}
        {phase === 'loading' && <LoadingPhase />}
      </main>
    </div>
  );
};

export default Lesson;
