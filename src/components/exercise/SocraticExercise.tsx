import { useState } from 'react';
import { Exercise, SocraticHint } from '@/types/learning';
import { Button } from '@/components/ui/button';
import PythonTerminal from '@/components/terminal/PythonTerminal';
import { 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Zap,
  Brain,
  Target,
  Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProgressStore } from '@/stores/useProgressStore';

interface SocraticExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

const SocraticExercise = ({ exercise, onComplete }: SocraticExerciseProps) => {
  const [showHint, setShowHint] = useState(false);
  const [currentHintLevel, setCurrentHintLevel] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [userCode, setUserCode] = useState('');
  
  const { addXP } = useProgressStore();
  
  const currentHint = exercise.socraticHints[currentHintLevel];
  
  const handleHintRequest = () => {
    if (!showHint) {
      setShowHint(true);
    } else if (currentHintLevel < exercise.socraticHints.length - 1) {
      setCurrentHintLevel(prev => prev + 1);
    }
  };
  
  const handleMultipleChoiceSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
    
    if (correct) {
      // Reduce XP based on hints used
      const hintPenalty = currentHintLevel * 10;
      const xpEarned = Math.max(exercise.xpReward - hintPenalty, 10);
      addXP(xpEarned);
    }
  };
  
  const handleCodeSubmit = (code: string, output: string) => {
    setUserCode(code);
    // In a real implementation, we'd validate the code
    // For now, we'll show a success state
    setShowExplanation(true);
    setIsCorrect(true);
    addXP(exercise.xpReward);
  };
  
  const handleContinue = () => {
    onComplete(isCorrect === true);
  };
  
  const getHintIcon = (type: string) => {
    switch (type) {
      case 'why': return Brain;
      case 'what-for': return Target;
      case 'how': return Wrench;
      default: return Lightbulb;
    }
  };
  
  const getHintLabel = (type: string) => {
    switch (type) {
      case 'why': return 'Por quê?';
      case 'what-for': return 'Para quê?';
      case 'how': return 'Como?';
      default: return 'Dica';
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Question */}
      <div className="p-6 rounded-xl border border-border/50 bg-card/50">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Questão</h3>
            <div className="text-foreground whitespace-pre-wrap">
              {exercise.question}
            </div>
          </div>
        </div>
        
        {/* Difficulty Badge */}
        <div className="mt-4 flex items-center gap-2">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            exercise.difficulty === 'beginner' && "bg-success/10 text-success",
            exercise.difficulty === 'intermediate' && "bg-warning/10 text-warning",
            exercise.difficulty === 'advanced' && "bg-destructive/10 text-destructive"
          )}>
            {exercise.difficulty === 'beginner' && 'Iniciante'}
            {exercise.difficulty === 'intermediate' && 'Intermediário'}
            {exercise.difficulty === 'advanced' && 'Avançado'}
          </span>
          <span className="flex items-center gap-1 text-xs text-xp">
            <Zap className="w-3 h-3" />
            +{exercise.xpReward} XP
          </span>
        </div>
      </div>
      
      {/* Answer Area */}
      {exercise.type === 'code' && (
        <PythonTerminal 
          initialCode={exercise.starterCode || ''} 
          onRun={handleCodeSubmit}
          height="350px"
        />
      )}
      
      {(exercise.type === 'multiple-choice' || exercise.type === 'output-prediction') && exercise.options && (
        <div className="space-y-3">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && setSelectedAnswer(index)}
              disabled={showExplanation}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all duration-200",
                "hover:border-primary/50 hover:bg-secondary/50",
                selectedAnswer === index && !showExplanation && "border-primary bg-primary/10",
                showExplanation && index === exercise.correctAnswer && "border-success bg-success/10",
                showExplanation && selectedAnswer === index && index !== exercise.correctAnswer && "border-destructive bg-destructive/10",
                showExplanation && "cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold",
                  "bg-secondary text-muted-foreground",
                  selectedAnswer === index && !showExplanation && "bg-primary text-primary-foreground",
                  showExplanation && index === exercise.correctAnswer && "bg-success text-success-foreground",
                  showExplanation && selectedAnswer === index && index !== exercise.correctAnswer && "bg-destructive text-destructive-foreground"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="font-mono">{option}</span>
                {showExplanation && index === exercise.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-success ml-auto" />
                )}
                {showExplanation && selectedAnswer === index && index !== exercise.correctAnswer && (
                  <XCircle className="w-5 h-5 text-destructive ml-auto" />
                )}
              </div>
            </button>
          ))}
          
          {!showExplanation && (
            <Button
              variant="hero"
              size="lg"
              onClick={handleMultipleChoiceSubmit}
              disabled={selectedAnswer === null}
              className="w-full mt-4"
            >
              Confirmar Resposta
            </Button>
          )}
        </div>
      )}
      
      {/* Socratic Hints */}
      {!showExplanation && (
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={handleHintRequest}
            disabled={showHint && currentHintLevel >= exercise.socraticHints.length - 1}
            className="gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {!showHint ? 'Preciso de uma dica' : 'Próxima dica'}
            <span className="text-xs text-muted-foreground">
              ({currentHintLevel + 1}/{exercise.socraticHints.length})
            </span>
          </Button>
          
          {showHint && currentHint && (
            <div className="p-4 rounded-xl border border-warning/30 bg-warning/5 animate-fade-in">
              <div className="flex items-start gap-3">
                {(() => {
                  const HintIcon = getHintIcon(currentHint.type);
                  return (
                    <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                      <HintIcon className="w-4 h-4 text-warning" />
                    </div>
                  );
                })()}
                <div>
                  <p className="text-sm font-medium text-warning mb-1">
                    {getHintLabel(currentHint.type)}
                  </p>
                  <p className="text-foreground font-medium mb-2">
                    {currentHint.question}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    💡 {currentHint.hint}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Explanation */}
      {showExplanation && (
        <div className="space-y-4 animate-fade-in">
          {/* Result Banner */}
          <div className={cn(
            "p-4 rounded-xl border",
            isCorrect ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"
          )}>
            <div className="flex items-center gap-3">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-semibold text-success">Correto! 🎉</p>
                    <p className="text-sm text-muted-foreground">
                      Você ganhou +{exercise.xpReward - (currentHintLevel * 10)} XP
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-destructive" />
                  <div>
                    <p className="font-semibold text-destructive">Não foi dessa vez</p>
                    <p className="text-sm text-muted-foreground">
                      Veja a explicação abaixo para entender melhor
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Socratic Explanation */}
          <div className="p-6 rounded-xl border border-border/50 bg-card/50 space-y-6">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Explicação Socrática
            </h4>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="font-medium text-primary">Por quê?</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exercise.explanation.why}
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-accent" />
                  <span className="font-medium text-accent">Para quê?</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exercise.explanation.whatFor}
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Como?</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exercise.explanation.how}
                </p>
              </div>
            </div>
            
            {/* Common Mistakes */}
            <div>
              <h5 className="font-medium mb-2 text-destructive">⚠️ Erros Comuns</h5>
              <ul className="space-y-1">
                {exercise.explanation.commonMistakes.map((mistake, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive">•</span>
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Real World Example */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h5 className="font-medium mb-2 text-primary">🌍 No Mundo Real</h5>
              <p className="text-sm text-muted-foreground">
                {exercise.explanation.realWorldExample}
              </p>
            </div>
          </div>
          
          <Button
            variant="hero"
            size="lg"
            onClick={handleContinue}
            className="w-full gap-2"
          >
            Continuar
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SocraticExercise;