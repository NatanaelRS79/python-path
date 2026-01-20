export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  unlocked: boolean;
  completed: boolean;
  masteryPercentage: number;
  category: 'python-basics' | 'python-intermediate' | 'pandas-basics' | 'pandas-intermediate';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'exercise' | 'challenge' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  completed: boolean;
  masteryLevel: number; // 0-100
  lastPracticed?: Date;
  nextReview?: Date; // Ebbinghaus curve
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: 'code' | 'multiple-choice' | 'fill-blank' | 'debug' | 'output-prediction';
  question: string;
  socraticHints: SocraticHint[];
  starterCode?: string;
  expectedOutput?: string;
  testCases?: TestCase[];
  options?: string[];
  correctAnswer?: string | number;
  explanation: SocraticExplanation;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  xpReward: number;
}

export interface SocraticHint {
  level: number; // 1-5, progressively more helpful
  type: 'why' | 'what-for' | 'how';
  question: string; // A question to make the student think
  hint: string;
}

export interface SocraticExplanation {
  why: string; // Why does this concept exist?
  whatFor: string; // What problem does it solve?
  how: string; // How does it work?
  commonMistakes: string[];
  realWorldExample: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface UserProgress {
  userId: string;
  totalXp: number;
  level: number;
  streak: number;
  longestStreak: number;
  completedLessons: string[];
  masteryLevels: Record<string, number>;
  weakPoints: WeakPoint[];
  strengthPoints: string[];
  lastActive: Date;
  dailyGoal: number;
  dailyProgress: number;
  badges: Badge[];
  examHistory: ExamResult[];
}

export interface WeakPoint {
  topic: string;
  moduleId: string;
  lessonId: string;
  errorCount: number;
  lastError: Date;
  recommendedReview: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ExamResult {
  id: string;
  date: Date;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  mode: 'normal' | 'hard';
  topicsCovered: string[];
  incorrectQuestions: string[];
}

export interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  isRunning: boolean;
  variables: Record<string, any>;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: Date;
}
