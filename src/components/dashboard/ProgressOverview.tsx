import { useProgressStore } from '@/stores/useProgressStore';
import { getLevelFromXP, getXPForNextLevel, curriculum } from '@/data/curriculum';
import { Flame, Zap, Target, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProgressOverview = () => {
  const { progress } = useProgressStore();
  
  const currentLevel = getLevelFromXP(progress.totalXp);
  const xpForNext = getXPForNextLevel(currentLevel);
  const xpInCurrentLevel = progress.totalXp - getXPForNextLevel(currentLevel - 1);
  const xpNeededForNext = xpForNext - getXPForNextLevel(currentLevel - 1);
  const xpProgress = (xpInCurrentLevel / xpNeededForNext) * 100;
  
  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = (completedLessons / totalLessons) * 100;
  
  const dailyProgress = Math.min((progress.dailyProgress / progress.dailyGoal) * 100, 100);
  
  const stats = [
    {
      label: 'Nível',
      value: currentLevel,
      icon: Trophy,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'XP Total',
      value: progress.totalXp.toLocaleString(),
      icon: Zap,
      color: 'text-xp',
      bgColor: 'bg-xp/10',
    },
    {
      label: 'Sequência',
      value: `${progress.streak} dias`,
      icon: Flame,
      color: 'text-streak',
      bgColor: 'bg-streak/10',
    },
    {
      label: 'Lições',
      value: `${completedLessons}/${totalLessons}`,
      icon: BookOpen,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={cn(
                "p-4 rounded-xl border border-border/50 bg-card/50",
                "hover:bg-card transition-colors duration-200",
                "animate-fade-in"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                  <Icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
            </div>
          );
        })}
      </div>
      
      {/* Progress Bars */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Level Progress */}
        <div className="p-5 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold">Próximo Nível</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {xpInCurrentLevel}/{xpNeededForNext} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>
        
        {/* Daily Goal */}
        <div className="p-5 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-success" />
              <span className="font-semibold">Meta Diária</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {progress.dailyProgress}/{progress.dailyGoal} XP
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                dailyProgress >= 100 ? "bg-success" : "bg-gradient-to-r from-warning to-streak"
              )}
              style={{ width: `${dailyProgress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Overall Course Progress */}
      <div className="p-5 rounded-xl border border-border/50 bg-card/50">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Progresso Geral do Curso</span>
          <span className="text-sm font-medium text-primary">{overallProgress.toFixed(1)}%</span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full progress-mastery rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {completedLessons} de {totalLessons} lições completadas
        </p>
      </div>
    </div>
  );
};

export default ProgressOverview;