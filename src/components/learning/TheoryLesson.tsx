import { useState } from 'react';
import { TheoryContent, ComprehensionQuestion } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Target, 
  Wrench, 
  CheckCircle2, 
  XCircle,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Shield,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TheoryLessonProps {
  theory: TheoryContent;
  onComplete: (passed: boolean) => void;
}

type TheoryPhase = 'context' | 'why' | 'what-for' | 'how' | 'takeaways' | 'quiz';

const TheoryLesson = ({ theory, onComplete }: TheoryLessonProps) => {
  const [phase, setPhase] = useState<TheoryPhase>('context');
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  
  const phases: TheoryPhase[] = ['context', 'why', 'what-for', 'how', 'takeaways', 'quiz'];
  const currentPhaseIndex = phases.indexOf(phase);
  
  const handleNext = () => {
    const nextIndex = currentPhaseIndex + 1;
    if (nextIndex < phases.length) {
      setPhase(phases[nextIndex]);
    }
  };
  
  const handleQuizAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === theory.comprehensionQuiz[quizIndex].correctIndex;
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    setQuizAnswered(true);
  };
  
  const handleNextQuestion = () => {
    if (quizIndex < theory.comprehensionQuiz.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else {
      // Quiz finished
      setShowQuizResult(true);
    }
  };
  
  const handleFinish = () => {
    const passRate = correctCount / theory.comprehensionQuiz.length;
    onComplete(passRate >= 0.7); // Need 70% to pass theory
  };
  
  const renderProgressBar = () => (
    <div className="flex items-center gap-2 mb-6">
      {phases.map((p, i) => (
        <div 
          key={p}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors",
            i <= currentPhaseIndex ? "bg-primary" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
  
  const renderContext = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{theory.title}</h2>
          <p className="text-muted-foreground">Contextualização</p>
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-border/50 bg-card/50">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          Por que isso importa no mundo real?
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {theory.realWorldContext}
        </p>
      </div>
      
      {theory.militaryContext && (
        <div className="p-6 rounded-xl border border-success/30 bg-success/5">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-success" />
            Aplicação em Contexto Militar/Missão
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {theory.militaryContext}
          </p>
        </div>
      )}
      
      <Button variant="hero" size="lg" onClick={handleNext} className="w-full gap-2">
        Entendi o Contexto
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
  
  const renderWhy = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Por Quê?</h2>
          <p className="text-muted-foreground">A razão de existir</p>
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
        <h3 className="font-semibold text-lg mb-3 text-primary">
          🤔 {theory.why.question}
        </h3>
        <p className="text-foreground leading-relaxed mb-4">
          {theory.why.explanation}
        </p>
        <div className="p-4 rounded-lg bg-background/50 border border-border/30">
          <p className="text-sm font-medium text-muted-foreground mb-1">💡 Analogia:</p>
          <p className="text-foreground">{theory.why.analogy}</p>
        </div>
      </div>
      
      <Button variant="hero" size="lg" onClick={handleNext} className="w-full gap-2">
        Faz sentido! Próximo
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
  
  const renderWhatFor = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Target className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Para Quê?</h2>
          <p className="text-muted-foreground">Aplicações práticas</p>
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-accent/30 bg-accent/5">
        <h3 className="font-semibold text-lg mb-3 text-accent">
          🎯 {theory.whatFor.question}
        </h3>
        <p className="text-foreground leading-relaxed mb-4">
          {theory.whatFor.explanation}
        </p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Casos de Uso no Mundo Real:
        </h4>
        {theory.whatFor.useCases.map((useCase, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {i + 1}
            </span>
            <p className="text-muted-foreground">{useCase}</p>
          </div>
        ))}
      </div>
      
      <Button variant="hero" size="lg" onClick={handleNext} className="w-full gap-2">
        Entendi a utilidade
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
  
  const renderHow = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
          <Wrench className="w-6 h-6 text-success" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Como?</h2>
          <p className="text-muted-foreground">O mecanismo</p>
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-success/30 bg-success/5">
        <h3 className="font-semibold text-lg mb-3 text-success">
          ⚙️ {theory.how.question}
        </h3>
        <p className="text-foreground leading-relaxed">
          {theory.how.explanation}
        </p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold">Passo a Passo:</h4>
        {theory.how.steps.map((step, i) => (
          <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center text-xs font-bold text-success shrink-0">
              {i + 1}
            </span>
            <p className="text-muted-foreground">{step}</p>
          </div>
        ))}
      </div>
      
      {theory.how.codeExample && (
        <div className="p-4 rounded-xl bg-[#0d1117] border border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Exemplo de código:</p>
          <pre className="text-sm font-mono text-green-400 overflow-x-auto">
            {theory.how.codeExample}
          </pre>
        </div>
      )}
      
      <Button variant="hero" size="lg" onClick={handleNext} className="w-full gap-2">
        Entendi o mecanismo
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
  
  const renderTakeaways = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Resumo Essencial</h2>
          <p className="text-muted-foreground">O 20% que importa (Pareto)</p>
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-warning/30 bg-warning/5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-warning" />
          Pontos-Chave para Lembrar:
        </h3>
        <div className="space-y-3">
          {theory.keyTakeaways.map((takeaway, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <p className="text-foreground">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Armadilhas Comuns (Evite!):
        </h3>
        <div className="space-y-3">
          {theory.commonPitfalls.map((pitfall, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-muted-foreground">{pitfall}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Button variant="hero" size="lg" onClick={handleNext} className="w-full gap-2">
        Pronto para o Quiz
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
  
  const renderQuiz = () => {
    if (showQuizResult) {
      const passRate = correctCount / theory.comprehensionQuiz.length;
      const passed = passRate >= 0.7;
      
      return (
        <div className="space-y-6 animate-fade-in">
          <div className={cn(
            "p-8 rounded-xl border text-center",
            passed ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"
          )}>
            {passed ? (
              <>
                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Teoria Dominada! 🎉</h2>
                <p className="text-muted-foreground mb-4">
                  Você acertou {correctCount} de {theory.comprehensionQuiz.length} questões ({Math.round(passRate * 100)}%)
                </p>
                <p className="text-success font-medium">
                  Você pode avançar para os exercícios práticos!
                </p>
              </>
            ) : (
              <>
                <AlertTriangle className="w-16 h-16 text-warning mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Revise o Conteúdo</h2>
                <p className="text-muted-foreground mb-4">
                  Você acertou {correctCount} de {theory.comprehensionQuiz.length} questões ({Math.round(passRate * 100)}%)
                </p>
                <p className="text-warning font-medium">
                  É necessário 70% para prosseguir. Revise a teoria e tente novamente.
                </p>
              </>
            )}
          </div>
          
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleFinish} 
            className="w-full gap-2"
          >
            {passed ? 'Iniciar Exercícios' : 'Revisar Teoria'}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      );
    }
    
    const currentQuestion = theory.comprehensionQuiz[quizIndex];
    
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Quiz de Compreensão</h2>
              <p className="text-muted-foreground">Questão {quizIndex + 1} de {theory.comprehensionQuiz.length}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Acertos</p>
            <p className="text-lg font-bold text-success">{correctCount}/{quizIndex}</p>
          </div>
        </div>
        
        <div className="p-6 rounded-xl border border-border/50 bg-card/50">
          <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, i) => (
              <button
                key={i}
                onClick={() => !quizAnswered && setSelectedAnswer(i)}
                disabled={quizAnswered}
                className={cn(
                  "w-full p-4 rounded-xl border text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-secondary/50",
                  selectedAnswer === i && !quizAnswered && "border-primary bg-primary/10",
                  quizAnswered && i === currentQuestion.correctIndex && "border-success bg-success/10",
                  quizAnswered && selectedAnswer === i && i !== currentQuestion.correctIndex && "border-destructive bg-destructive/10",
                  quizAnswered && "cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold",
                    "bg-secondary text-muted-foreground",
                    selectedAnswer === i && !quizAnswered && "bg-primary text-primary-foreground",
                    quizAnswered && i === currentQuestion.correctIndex && "bg-success text-success-foreground",
                    quizAnswered && selectedAnswer === i && i !== currentQuestion.correctIndex && "bg-destructive text-destructive-foreground"
                  )}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span>{option}</span>
                  {quizAnswered && i === currentQuestion.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-success ml-auto" />
                  )}
                  {quizAnswered && selectedAnswer === i && i !== currentQuestion.correctIndex && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {quizAnswered && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 animate-fade-in">
            <p className="font-medium text-primary mb-2">💡 Explicação:</p>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
        
        {!quizAnswered ? (
          <Button
            variant="hero"
            size="lg"
            onClick={handleQuizAnswer}
            disabled={selectedAnswer === null}
            className="w-full"
          >
            Confirmar Resposta
          </Button>
        ) : (
          <Button
            variant="hero"
            size="lg"
            onClick={handleNextQuestion}
            className="w-full gap-2"
          >
            {quizIndex < theory.comprehensionQuiz.length - 1 ? 'Próxima Questão' : 'Ver Resultado'}
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>
    );
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      {renderProgressBar()}
      
      {phase === 'context' && renderContext()}
      {phase === 'why' && renderWhy()}
      {phase === 'what-for' && renderWhatFor()}
      {phase === 'how' && renderHow()}
      {phase === 'takeaways' && renderTakeaways()}
      {phase === 'quiz' && renderQuiz()}
    </div>
  );
};

export default TheoryLesson;
