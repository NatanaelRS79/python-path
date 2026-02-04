import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Module, Lesson } from '@/types/learning';

interface LessonHeaderProps {
  module: Module;
  lesson: Lesson;
}

const LessonHeader = ({ module, lesson }: LessonHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/learn')}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{module.icon}</span>
        <span>{module.title}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">{lesson.title}</span>
      </div>
    </div>
  );
};

export default LessonHeader;
