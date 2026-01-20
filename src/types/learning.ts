export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  unlocked: boolean;
  completed: boolean;
  masteryPercentage: number;
  category: 'python-basics' | 'python-intermediate' | 'pandas-basics' | 'pandas-intermediate' | 'technical-english';
  requiredMastery: number; // Minimum mastery % to unlock next module
  minExercisesToMaster: number; // Minimum exercises to complete (20-50)
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'concept' | 'exercise' | 'challenge' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  completed: boolean;
  masteryLevel: number; // 0-100
  lastPracticed?: Date;
  nextReview?: Date; // Ebbinghaus curve
  exercisesCompleted: number;
  exercisesRequired: number; // Min exercises for mastery
  correctAnswers: number;
  totalAttempts: number;
}

// Theory content with Socratic structure
export interface TheoryContent {
  id: string;
  lessonId: string;
  title: string;
  
  // Contextualization for adults (Andragogy)
  realWorldContext: string; // Why this matters in professional context
  militaryContext?: string; // Specific military/mission examples
  
  // Socratic Structure
  why: {
    question: string; // "Por que isso existe?"
    explanation: string;
    analogy: string; // Real-world analogy
  };
  whatFor: {
    question: string; // "Para que serve?"
    explanation: string;
    useCases: string[]; // Practical applications
  };
  how: {
    question: string; // "Como funciona?"
    explanation: string;
    steps: string[]; // Step-by-step breakdown
    codeExample?: string;
  };
  
  // Pareto: Focus on the essential 20%
  keyTakeaways: string[]; // The 20% that matters
  commonPitfalls: string[];
  
  // Comprehension check before exercises
  comprehensionQuiz: ComprehensionQuestion[];
}

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
  
  // Andragogy: Professional context
  professionalContext?: string;
  militaryApplication?: string;
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
  
  // Ebbinghaus Review System
  reviewSchedule: ReviewItem[];
  lessonStats: Record<string, LessonStats>;
  
  // Mastery gate tracking
  blockedModules: BlockedModule[];
}

export interface LessonStats {
  lessonId: string;
  exercisesCompleted: number;
  correctAnswers: number;
  totalAttempts: number;
  lastPracticed: Date;
  masteryLevel: number;
  reviewCount: number;
}

export interface ReviewItem {
  lessonId: string;
  conceptId: string;
  topic: string;
  scheduledFor: Date;
  interval: number; // Days until next review (Ebbinghaus: 1, 3, 7, 14, 30, 60)
  easeFactor: number; // Difficulty multiplier
  repetitions: number;
  lastReviewed?: Date;
}

export interface BlockedModule {
  moduleId: string;
  requiredModuleId: string;
  requiredMastery: number;
  currentMastery: number;
  missingConcepts: string[];
  recommendedReview: string[];
}

export interface WeakPoint {
  topic: string;
  moduleId: string;
  lessonId: string;
  errorCount: number;
  lastError: Date;
  recommendedReview: Date;
  specificErrors: string[]; // Track what exactly they got wrong
  improvementSuggestions: string[];
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

// Ebbinghaus intervals in days
export const EBBINGHAUS_INTERVALS = [1, 3, 7, 14, 30, 60, 120];

// Mastery requirements
export const MASTERY_CONFIG = {
  minExercisesPerConcept: 25,
  minCorrectRate: 0.8, // 80%
  masteryThreshold: 80,
  reviewDecayPerDay: 2, // Mastery decays 2% per day without practice
};
