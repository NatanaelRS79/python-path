import { useState } from 'react';
import Header from '@/components/layout/Header';
import SocraticExercise from '@/components/exercise/SocraticExercise';
import { sampleExercises } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { 
  Shuffle, 
  Target, 
  Zap, 
  ChevronLeft,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Practice = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const currentExercise = sampleExercises[currentExerciseIndex];
  
  const handleComplete = (correct: boolean) => {
    setCompletedCount(prev => prev + 1);
    if (correct) setCorrectCount(prev => prev + 1);
    
    // Move to next exercise or show results
    if (currentExerciseIndex < sampleExercises.length - 1) {
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
      }, 500);
    } else {
      setShowResults(true);
    }
  };
  
  const shuffleExercises = () => {
    setCurrentExerciseIndex(Math.floor(Math.random() * sampleExercises.length));
    setCompletedCount(0);
    setCorrectCount(0);
    setShowResults(false);
  };
  
  const accuracy = completedCount > 0 ? Math.round((correctCount / completedCount) * 100) : 0;
  
  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Sessão Completa! 🎉</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-3xl font-bold text-primary">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Exercícios</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-3xl font-bold text-success">{correctCount}</p>
                <p className="text-sm text-muted-foreground">Corretos</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className={cn(
                  "text-3xl font-bold",
                  accuracy >= 70 ? "text-success" : accuracy >= 50 ? "text-warning" : "text-destructive"
                )}>
                  {accuracy}%
                </p>
                <p className="text-sm text-muted-foreground">Precisão</p>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link to="/learn">
                <Button variant="outline" size="lg" className="gap-2">
                  <ChevronLeft className="w-5 h-5" />
                  Voltar
                </Button>
              </Link>
              <Button variant="hero" size="lg" onClick={shuffleExercises} className="gap-2">
                <Shuffle className="w-5 h-5" />
                Praticar Mais
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Practice Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Voltar
            </Link>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Target className="w-7 h-7 text-primary" />
              Modo Prática
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{currentExerciseIndex + 1}</span>
              <span>/</span>
              <span>{sampleExercises.length}</span>
            </div>
            
            {/* Accuracy */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <Zap className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">{accuracy}%</span>
            </div>
            
            <Button variant="outline" size="sm" onClick={shuffleExercises} className="gap-2">
              <Shuffle className="w-4 h-4" />
              Embaralhar
            </Button>
          </div>
        </div>
        
        {/* Exercise */}
        {currentExercise && (
          <SocraticExercise 
            key={currentExercise.id}
            exercise={currentExercise} 
            onComplete={handleComplete} 
          />
        )}
      </main>
    </div>
  );
};

export default Practice;