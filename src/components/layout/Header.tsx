import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/useProgressStore';
import { getLevelFromXP, getXPForNextLevel } from '@/data/curriculum';
import { 
  Flame, 
  Zap, 
  Trophy, 
  BarChart3, 
  BookOpen, 
  Terminal,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  const { progress } = useProgressStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const currentLevel = getLevelFromXP(progress.totalXp);
  const xpForNext = getXPForNextLevel(currentLevel);
  const xpProgress = (progress.totalXp % xpForNext) / xpForNext * 100;
  
  const navLinks = [
    { path: '/learn', label: 'Aprender', icon: BookOpen },
    { path: '/practice', label: 'Praticar', icon: Terminal },
    { path: '/exam', label: 'Simulado', icon: GraduationCap },
    { path: '/analytics', label: 'Desempenho', icon: BarChart3 },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl transition-transform group-hover:scale-110">
              🐼
            </div>
            <span className="font-bold text-xl hidden sm:block">
              <span className="text-primary">Py</span>
              <span className="text-foreground">Pandas</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button 
                    variant={isActive ? "secondary" : "ghost"} 
                    size="sm"
                    className={cn(
                      "gap-2",
                      isActive && "bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
          
          {/* Stats Bar */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-streak/10 border border-streak/20">
              <Flame className={cn(
                "h-4 w-4 text-streak",
                progress.streak > 0 && "animate-streak-fire"
              )} />
              <span className="text-sm font-semibold text-streak">{progress.streak}</span>
            </div>
            
            {/* XP */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-xp/10 border border-xp/20">
                <Zap className="h-4 w-4 text-xp" />
                <span className="text-sm font-semibold text-xp">{progress.totalXp}</span>
              </div>
              
              {/* Level */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{currentLevel}</span>
                </div>
                <svg className="absolute inset-0 -rotate-90 w-10 h-10">
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/20"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${xpProgress * 1.13} 113`}
                    className="text-primary transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      variant={isActive ? "secondary" : "ghost"} 
                      className="w-full justify-start gap-3"
                    >
                      <Icon className="h-5 w-5" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile Stats */}
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-streak/10">
                <Flame className="h-4 w-4 text-streak" />
                <span className="text-sm font-semibold text-streak">{progress.streak} dias</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-xp/10">
                <Zap className="h-4 w-4 text-xp" />
                <span className="text-sm font-semibold text-xp">{progress.totalXp} XP</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;