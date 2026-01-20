import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { sampleExercises } from '@/data/curriculum';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/useProgressStore';
import { 
  Clock, 
  Flame,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Trophy,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';


const Exam = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [examMode, setExamMode] = useState<'normal' | 'hard'>('normal');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const { recordExamResult, addXP } = useProgressStore();
  
  const questions = sampleExercises.filter(e => e.type === 'multiple-choice' || e.type === 'output-prediction');
  
  const examDuration = examMode === 'hard' ? 10 * 60 : 20 * 60; // 10 or 20 minutes in seconds
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (examStarted && !isPaused && !showResults && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [examStarted, isPaused, showResults, timeRemaining]);
  
  const startExam = () => {
    setExamStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setTimeRemaining(examDuration);
    setShowResults(false);
  };
  
  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const finishExam = () => {
    setShowResults(true);
    
    // Calculate results
    const correctAnswers = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correctAnswer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    const timeSpent = examDuration - timeRemaining;
    
    // Record exam result
    recordExamResult({
      id: Date.now().toString(),
      date: new Date(),
      score,
      totalQuestions: questions.length,
      timeSpent,
      mode: examMode,
      topicsCovered: [...new Set(questions.map(q => q.tags[0]))],
      incorrectQuestions: questions
        .filter((q, i) => answers[i] !== q.correctAnswer)
        .map(q => q.id),
    });
    
    // Add XP
    const baseXP = score >= 70 ? 200 : score >= 50 ? 100 : 50;
    const modeBonus = examMode === 'hard' ? 1.5 : 1;
    addXP(Math.round(baseXP * modeBonus));
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (showResults) {
    const correctAnswers = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                score >= 70 ? "bg-success/10" : score >= 50 ? "bg-warning/10" : "bg-destructive/10"
              )}>
                <Trophy className={cn(
                  "w-12 h-12",
                  score >= 70 ? "text-success" : score >= 50 ? "text-warning" : "text-destructive"
                )} />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                {score >= 70 ? 'Excelente!' : score >= 50 ? 'Bom trabalho!' : 'Continue praticando!'}
              </h1>
              <p className="text-muted-foreground">
                Você completou o simulado {examMode === 'hard' ? 'no modo Hard' : ''}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-5 rounded-xl bg-card border border-border text-center">
                <p className="text-4xl font-bold text-primary">{score}%</p>
                <p className="text-sm text-muted-foreground">Pontuação</p>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border text-center">
                <p className="text-4xl font-bold text-success">{correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Corretas</p>
              </div>
              <div className="p-5 rounded-xl bg-card border border-border text-center">
                <p className="text-4xl font-bold text-destructive">{questions.length - correctAnswers}</p>
                <p className="text-sm text-muted-foreground">Incorretas</p>
              </div>
            </div>
            
            {/* Question Review */}
            <div className="space-y-4 mb-8">
              <h3 className="font-semibold">Revisão das Questões</h3>
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correctAnswer;
                return (
                  <div 
                    key={q.id}
                    className={cn(
                      "p-4 rounded-xl border",
                      isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Questão {i + 1}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{q.question}</p>
                        {!isCorrect && q.options && (
                          <p className="text-sm text-success mt-2">
                            Resposta correta: {q.options[q.correctAnswer as number]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="lg" onClick={() => {
                setExamStarted(false);
                setShowResults(false);
              }}>
                <RotateCcw className="w-5 h-5 mr-2" />
                Novo Simulado
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Simulador de Prova</h1>
            <p className="text-muted-foreground mb-8">
              Teste seus conhecimentos em condições reais de prova. Escolha o modo e boa sorte!
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setExamMode('normal')}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all text-left",
                  examMode === 'normal' 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <Clock className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-xl font-semibold mb-1">Modo Normal</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  20 minutos para {questions.length} questões
                </p>
                <p className="text-xs text-muted-foreground">
                  Ideal para treinar sem pressão excessiva
                </p>
              </button>
              
              <button
                onClick={() => setExamMode('hard')}
                className={cn(
                  "p-6 rounded-xl border-2 transition-all text-left",
                  examMode === 'hard' 
                    ? "border-streak bg-streak/10" 
                    : "border-border hover:border-streak/50"
                )}
              >
                <Flame className="w-8 h-8 text-streak mb-3" />
                <h3 className="text-xl font-semibold mb-1">Modo Hard</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  10 minutos para {questions.length} questões
                </p>
                <p className="text-xs text-muted-foreground">
                  Simula pressão real de processo seletivo
                </p>
              </button>
            </div>
            
            <Button variant="hero" size="xl" onClick={startExam} className="gap-2">
              <Play className="w-5 h-5" />
              Iniciar Simulado
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
  const currentQ = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Exam Header - Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              timeRemaining < 60 ? "bg-destructive/10 text-destructive animate-pulse" :
              timeRemaining < 300 ? "bg-warning/10 text-warning" :
              "bg-secondary"
            )}>
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg font-bold">{formatTime(timeRemaining)}</span>
            </div>
            
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={cn(
                    "w-8 h-8 rounded-full text-xs font-medium transition-all",
                    currentQuestion === i && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    answers[i] !== null ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={finishExam}
              >
                Finalizar
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {isPaused ? (
          <div className="max-w-xl mx-auto text-center py-20 animate-fade-in">
            <Pause className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Prova Pausada</h2>
            <p className="text-muted-foreground mb-6">
              O tempo está parado. Clique em continuar quando estiver pronto.
            </p>
            <Button variant="hero" size="lg" onClick={() => setIsPaused(false)} className="gap-2">
              <Play className="w-5 h-5" />
              Continuar
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Question */}
            <div className="p-6 rounded-xl border border-border/50 bg-card/50 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Questão {currentQuestion + 1} de {questions.length}
                </span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  currentQ.difficulty === 'beginner' && "bg-success/10 text-success",
                  currentQ.difficulty === 'intermediate' && "bg-warning/10 text-warning",
                  currentQ.difficulty === 'advanced' && "bg-destructive/10 text-destructive"
                )}>
                  {currentQ.difficulty === 'beginner' && 'Iniciante'}
                  {currentQ.difficulty === 'intermediate' && 'Intermediário'}
                  {currentQ.difficulty === 'advanced' && 'Avançado'}
                </span>
              </div>
              
              <div className="whitespace-pre-wrap text-lg">
                {currentQ.question}
              </div>
            </div>
            
            {/* Options */}
            {currentQ.options && (
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={cn(
                      "w-full p-4 rounded-xl border text-left transition-all duration-200",
                      "hover:border-primary/50 hover:bg-secondary/50",
                      answers[currentQuestion] === index && "border-primary bg-primary/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold",
                        "bg-secondary text-muted-foreground",
                        answers[currentQuestion] === index && "bg-primary text-primary-foreground"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-mono">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                Anterior
              </Button>
              
              <span className="text-sm text-muted-foreground">
                {answers.filter(a => a !== null).length} de {questions.length} respondidas
              </span>
              
              {currentQuestion === questions.length - 1 ? (
                <Button variant="hero" onClick={finishExam}>
                  Finalizar Prova
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="gap-1">
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Exam;