import { Link } from 'react-router-dom';
import { Module } from '@/types/learning';
import { Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  index: number;
}

const ModuleCard = ({ module, index }: ModuleCardProps) => {
  const isLocked = !module.unlocked;
  const isCompleted = module.completed;
  
  const categoryColors: Record<string, string> = {
    'python-basics': 'from-primary/20 to-primary/5 border-primary/30',
    'python-intermediate': 'from-accent/20 to-accent/5 border-accent/30',
    'pandas-basics': 'from-warning/20 to-warning/5 border-warning/30',
    'pandas-intermediate': 'from-xp/20 to-xp/5 border-xp/30',
    'technical-english': 'from-success/20 to-success/5 border-success/30',
  };
  
  const progressColor: Record<string, string> = {
    'python-basics': 'bg-primary',
    'python-intermediate': 'bg-accent',
    'pandas-basics': 'bg-warning',
    'pandas-intermediate': 'bg-xp',
    'technical-english': 'bg-success',
  };
  
  // Get first incomplete lesson for direct navigation
  const firstIncompleteLesson = module.lessons.find(l => !l.completed);
  const targetUrl = isLocked 
    ? '#' 
    : firstIncompleteLesson 
      ? `/lesson/${firstIncompleteLesson.id}` 
      : `/lesson/${module.lessons[0]?.id}`;
  
  return (
    <Link 
      to={targetUrl}
      className={cn(
        "group relative block",
        isLocked && "cursor-not-allowed"
      )}
      onClick={(e) => isLocked && e.preventDefault()}
    >
      <div 
        className={cn(
          "relative p-6 rounded-2xl border transition-all duration-300",
          "bg-gradient-to-br",
          categoryColors[module.category],
          !isLocked && "hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10",
          isLocked && "opacity-60 grayscale",
          isCompleted && "ring-2 ring-success/50"
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Module Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-2xl",
            "bg-background/50 backdrop-blur-sm border border-border/50",
            "transition-transform duration-300",
            !isLocked && "group-hover:scale-110 group-hover:rotate-3"
          )}>
            {module.icon}
          </div>
          
          {isLocked && (
            <div className="w-8 h-8 rounded-full bg-locked flex items-center justify-center">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          
          {isCompleted && (
            <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-success-foreground" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {module.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {module.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Maestria</span>
            <span className="font-semibold text-foreground">{module.masteryPercentage}%</span>
          </div>
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                progressColor[module.category]
              )}
              style={{ width: `${module.masteryPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Lessons count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {module.lessons.filter(l => l.completed).length}/{module.lessons.length} lições
          </span>
          {!isLocked && (
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;