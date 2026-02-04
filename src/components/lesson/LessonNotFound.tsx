import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';

const LessonNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lição não encontrada</h1>
          <Button onClick={() => navigate('/learn')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default LessonNotFound;
