import { Progress } from '@/components/ui/progress';
import SocraticExercise from '@/components/exercise/SocraticExercise';
import ExerciseTracker from '@/components/learning/ExerciseTracker';
import { Target, CheckCircle2 } from 'lucide-react';
import { Exercise, Lesson, LessonStats } from '@/types/learning';

interface ExercisePhaseProps {
  lesson: Lesson;
  lessonStats?: LessonStats;
  currentExercise: Exercise;
  currentExerciseIndex: number;
  totalExercises: number;
  correctAnswers: number;
  onExerciseComplete: (correct: boolean) => void;
}

const ExercisePhase = ({
  lesson,
  lessonStats,
  currentExercise,
  currentExerciseIndex,
  totalExercises,
  correctAnswers,
  onExerciseComplete,
}: ExercisePhaseProps) => {
  const exerciseProgress = totalExercises > 0 
    ? ((currentExerciseIndex + 1) / totalExercises) * 100 
    : 0;

  return (
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
                Exercício {currentExerciseIndex + 1} de {totalExercises}
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
        onComplete={onExerciseComplete}
      />
    </div>
  );
};

export default ExercisePhase;
