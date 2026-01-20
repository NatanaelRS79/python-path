import { useState, useEffect } from 'react';
import { ReviewItem, EBBINGHAUS_INTERVALS } from '@/types/learning';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Flame,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { differenceInDays, differenceInHours, format, isToday, isTomorrow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface EbbinghausReviewProps {
  reviewSchedule: ReviewItem[];
  onStartReview: (items: ReviewItem[]) => void;
}

const EbbinghausReview = ({ reviewSchedule, onStartReview }: EbbinghausReviewProps) => {
  const [now, setNow] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Categorize reviews
  const overdueReviews = reviewSchedule.filter(r => 
    new Date(r.scheduledFor) < now
  );
  
  const todayReviews = reviewSchedule.filter(r => 
    isToday(new Date(r.scheduledFor)) && new Date(r.scheduledFor) >= now
  );
  
  const tomorrowReviews = reviewSchedule.filter(r => 
    isTomorrow(new Date(r.scheduledFor))
  );
  
  const upcomingReviews = reviewSchedule.filter(r => {
    const date = new Date(r.scheduledFor);
    return differenceInDays(date, now) > 1 && differenceInDays(date, now) <= 7;
  });
  
  const getIntervalLabel = (interval: number) => {
    if (interval === 1) return '1 dia';
    if (interval === 3) return '3 dias';
    if (interval === 7) return '1 semana';
    if (interval === 14) return '2 semanas';
    if (interval === 30) return '1 mês';
    if (interval === 60) return '2 meses';
    if (interval === 120) return '4 meses';
    return `${interval} dias`;
  };
  
  const getUrgencyColor = (item: ReviewItem) => {
    const hoursUntil = differenceInHours(new Date(item.scheduledFor), now);
    if (hoursUntil < 0) return 'text-destructive';
    if (hoursUntil < 6) return 'text-warning';
    if (hoursUntil < 24) return 'text-accent';
    return 'text-muted-foreground';
  };
  
  const getMasteryDecay = (item: ReviewItem) => {
    if (!item.lastReviewed) return 0;
    const daysSince = differenceInDays(now, new Date(item.lastReviewed));
    // Simplified Ebbinghaus decay: lose ~20% per day without review
    return Math.min(100, daysSince * 20);
  };
  
  const renderReviewCard = (item: ReviewItem, isOverdue: boolean = false) => (
    <div 
      key={`${item.lessonId}-${item.conceptId}`}
      className={cn(
        "p-4 rounded-xl border transition-all",
        isOverdue 
          ? "border-destructive/30 bg-destructive/5" 
          : "border-border/50 bg-card/50 hover:border-primary/30"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium">{item.topic}</h4>
          <p className="text-sm text-muted-foreground">
            Intervalo atual: {getIntervalLabel(item.interval)}
          </p>
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm",
          getUrgencyColor(item)
        )}>
          <Clock className="w-4 h-4" />
          {isOverdue ? (
            <span className="font-medium">Atrasado!</span>
          ) : (
            <span>{format(new Date(item.scheduledFor), "HH:mm", { locale: ptBR })}</span>
          )}
        </div>
      </div>
      
      {/* Mastery Decay Indicator */}
      {item.lastReviewed && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Retenção estimada</span>
            <span className={cn(
              "font-medium",
              getMasteryDecay(item) > 50 ? "text-destructive" : "text-success"
            )}>
              {100 - getMasteryDecay(item)}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                getMasteryDecay(item) > 50 ? "bg-destructive" : "bg-success"
              )}
              style={{ width: `${100 - getMasteryDecay(item)}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Review Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Repetição {item.repetitions + 1}
        </span>
        {item.lastReviewed && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Última: {format(new Date(item.lastReviewed), "dd/MM", { locale: ptBR })}
          </span>
        )}
      </div>
      
      <Link to={`/review/${item.lessonId}`}>
        <Button 
          variant={isOverdue ? "destructive" : "outline"} 
          size="sm" 
          className="w-full gap-2"
        >
          {isOverdue ? 'Revisar Agora!' : 'Iniciar Revisão'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
  
  const hasAnyReviews = reviewSchedule.length > 0;
  
  if (!hasAnyReviews) {
    return (
      <div className="p-8 rounded-2xl border border-border/50 bg-card/50 text-center">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Nenhuma Revisão Pendente!</h3>
        <p className="text-muted-foreground">
          Continue aprendendo novos conceitos. As revisões serão agendadas automaticamente 
          baseadas na curva de esquecimento de Ebbinghaus.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with Ebbinghaus explanation */}
      <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Sistema de Revisão Espaçada</h3>
            <p className="text-sm text-muted-foreground">
              Baseado na <span className="text-primary font-medium">Curva de Ebbinghaus</span>, 
              o sistema agenda revisões em intervalos crescentes (1, 3, 7, 14, 30, 60 dias) 
              para maximizar a retenção a longo prazo sem depender de decoreba.
            </p>
          </div>
        </div>
      </div>
      
      {/* Overdue Reviews - Urgent */}
      {overdueReviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Revisões Atrasadas ({overdueReviews.length})
            </h3>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onStartReview(overdueReviews)}
            >
              Revisar Todas
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {overdueReviews.slice(0, 4).map(item => renderReviewCard(item, true))}
          </div>
        </div>
      )}
      
      {/* Today's Reviews */}
      {todayReviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Flame className="w-5 h-5 text-warning" />
              Hoje ({todayReviews.length})
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onStartReview(todayReviews)}
            >
              Revisar Todas
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {todayReviews.map(item => renderReviewCard(item))}
          </div>
        </div>
      )}
      
      {/* Tomorrow's Reviews */}
      {tomorrowReviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            Amanhã ({tomorrowReviews.length})
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {tomorrowReviews.slice(0, 2).map(item => renderReviewCard(item))}
          </div>
        </div>
      )}
      
      {/* Upcoming Week */}
      {upcomingReviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5" />
            Esta Semana ({upcomingReviews.length})
          </h3>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
            <div className="space-y-2">
              {upcomingReviews.slice(0, 5).map(item => (
                <div 
                  key={`${item.lessonId}-${item.conceptId}`}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <span className="text-sm">{item.topic}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(item.scheduledFor), "EEEE, dd/MM", { locale: ptBR })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Ebbinghaus Intervals Explanation */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
        <h4 className="font-medium mb-3 text-sm">📊 Intervalos de Ebbinghaus</h4>
        <div className="flex flex-wrap gap-2">
          {EBBINGHAUS_INTERVALS.map((interval, i) => (
            <span 
              key={interval}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                i === 0 && "bg-destructive/10 text-destructive",
                i === 1 && "bg-warning/10 text-warning",
                i >= 2 && i <= 3 && "bg-accent/10 text-accent",
                i >= 4 && "bg-success/10 text-success"
              )}
            >
              {getIntervalLabel(interval)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EbbinghausReview;
