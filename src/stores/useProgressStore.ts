import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  UserProgress, 
  WeakPoint, 
  Badge, 
  ExamResult, 
  ReviewItem, 
  LessonStats,
  BlockedModule,
  EBBINGHAUS_INTERVALS,
  MASTERY_CONFIG
} from '@/types/learning';
import { getLevelFromXP, getNextReviewDate } from '@/data/curriculum';

// Versão atual do estado - incrementar quando a estrutura mudar
const STATE_VERSION = 2;

interface ProgressState {
  progress: UserProgress;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateMastery: (lessonId: string, score: number) => void;
  addWeakPoint: (weakPoint: WeakPoint) => void;
  removeWeakPoint: (topic: string) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  addBadge: (badge: Badge) => void;
  recordExamResult: (result: ExamResult) => void;
  updateDailyProgress: (amount: number) => void;
  resetDailyProgress: () => void;
  
  // New methods for enhanced learning system
  updateLessonStats: (lessonId: string, correct: boolean) => void;
  scheduleReview: (lessonId: string, conceptId: string, topic: string) => void;
  completeReview: (lessonId: string, conceptId: string, performance: number) => void;
  checkModuleAccess: (moduleId: string, requiredModuleId: string, requiredMastery: number) => BlockedModule | null;
  updateBlockedModules: () => void;
  getLessonStats: (lessonId: string) => LessonStats | undefined;
  getOverdueReviews: () => ReviewItem[];
  getTodayReviews: () => ReviewItem[];
  resetProgress: () => void;
}

const initialProgress: UserProgress = {
  userId: 'guest',
  totalXp: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  completedLessons: [],
  masteryLevels: {},
  weakPoints: [],
  strengthPoints: [],
  lastActive: new Date(),
  dailyGoal: 50,
  dailyProgress: 0,
  badges: [],
  examHistory: [],
  reviewSchedule: [],
  lessonStats: {},
  blockedModules: [],
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: initialProgress,

      addXP: (amount) =>
        set((state) => {
          const newXP = state.progress.totalXp + amount;
          const newLevel = getLevelFromXP(newXP);
          return {
            progress: {
              ...state.progress,
              totalXp: newXP,
              level: newLevel,
              dailyProgress: state.progress.dailyProgress + amount,
            },
          };
        }),

      completeLesson: (lessonId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            completedLessons: [...new Set([...state.progress.completedLessons, lessonId])],
          },
        })),

      updateMastery: (lessonId, score) =>
        set((state) => ({
          progress: {
            ...state.progress,
            masteryLevels: {
              ...state.progress.masteryLevels,
              [lessonId]: Math.max(state.progress.masteryLevels[lessonId] || 0, score),
            },
          },
        })),

      addWeakPoint: (weakPoint) =>
        set((state) => {
          const existing = state.progress.weakPoints.find((wp) => wp.topic === weakPoint.topic);
          if (existing) {
            return {
              progress: {
                ...state.progress,
                weakPoints: state.progress.weakPoints.map((wp) =>
                  wp.topic === weakPoint.topic
                    ? { 
                        ...wp, 
                        errorCount: wp.errorCount + 1, 
                        lastError: new Date(),
                        specificErrors: [...(wp.specificErrors || []), ...(weakPoint.specificErrors || [])].slice(-10),
                      }
                    : wp
                ),
              },
            };
          }
          return {
            progress: {
              ...state.progress,
              weakPoints: [...state.progress.weakPoints, weakPoint],
            },
          };
        }),

      removeWeakPoint: (topic) =>
        set((state) => ({
          progress: {
            ...state.progress,
            weakPoints: state.progress.weakPoints.filter((wp) => wp.topic !== topic),
          },
        })),

      incrementStreak: () =>
        set((state) => {
          const newStreak = state.progress.streak + 1;
          return {
            progress: {
              ...state.progress,
              streak: newStreak,
              longestStreak: Math.max(state.progress.longestStreak, newStreak),
              lastActive: new Date(),
            },
          };
        }),

      resetStreak: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            streak: 0,
          },
        })),

      addBadge: (badge) =>
        set((state) => ({
          progress: {
            ...state.progress,
            badges: [...state.progress.badges, badge],
          },
        })),

      recordExamResult: (result) =>
        set((state) => ({
          progress: {
            ...state.progress,
            examHistory: [...state.progress.examHistory, result],
          },
        })),

      updateDailyProgress: (amount) =>
        set((state) => ({
          progress: {
            ...state.progress,
            dailyProgress: state.progress.dailyProgress + amount,
          },
        })),

      resetDailyProgress: () =>
        set((state) => ({
          progress: {
            ...state.progress,
            dailyProgress: 0,
          },
        })),

      // Enhanced learning methods
      updateLessonStats: (lessonId, correct) =>
        set((state) => {
          // Resiliência para dados legados: `lessonStats` pode não existir no localStorage
          const lessonStatsMap = state.progress.lessonStats || {};
          const existingStats = lessonStatsMap[lessonId] || {
            lessonId,
            exercisesCompleted: 0,
            correctAnswers: 0,
            totalAttempts: 0,
            lastPracticed: new Date(),
            masteryLevel: 0,
            reviewCount: 0,
          };

          const newStats: LessonStats = {
            ...existingStats,
            exercisesCompleted: existingStats.exercisesCompleted + 1,
            correctAnswers: existingStats.correctAnswers + (correct ? 1 : 0),
            totalAttempts: existingStats.totalAttempts + 1,
            lastPracticed: new Date(),
          };

          // Calculate mastery based on correct rate and exercise count
          const correctRate = newStats.correctAnswers / newStats.totalAttempts;
          const exerciseProgress = Math.min(1, newStats.exercisesCompleted / MASTERY_CONFIG.minExercisesPerConcept);
          newStats.masteryLevel = Math.round(correctRate * exerciseProgress * 100);

          return {
            progress: {
              ...state.progress,
              lessonStats: {
                ...lessonStatsMap,
                [lessonId]: newStats,
              },
              masteryLevels: {
                ...state.progress.masteryLevels,
                [lessonId]: newStats.masteryLevel,
              },
            },
          };
        }),

      scheduleReview: (lessonId, conceptId, topic) =>
        set((state) => {
          const reviewSchedule = state.progress.reviewSchedule || [];
          const existingReview = reviewSchedule.find(
            r => r.lessonId === lessonId && r.conceptId === conceptId
          );

          if (existingReview) {
            return state; // Already scheduled
          }

          const nextReviewDate = new Date();
          nextReviewDate.setDate(nextReviewDate.getDate() + EBBINGHAUS_INTERVALS[0]); // Start with 1 day

          const newReview: ReviewItem = {
            lessonId,
            conceptId,
            topic,
            scheduledFor: nextReviewDate,
            interval: EBBINGHAUS_INTERVALS[0],
            easeFactor: 2.5,
            repetitions: 0,
          };

          return {
            progress: {
              ...state.progress,
              reviewSchedule: [...reviewSchedule, newReview],
            },
          };
        }),

      completeReview: (lessonId, conceptId, performance) =>
        set((state) => {
          const reviewSchedule = state.progress.reviewSchedule || [];
          const reviewIndex = reviewSchedule.findIndex(
            r => r.lessonId === lessonId && r.conceptId === conceptId
          );

          if (reviewIndex === -1) return state;

          const review = reviewSchedule[reviewIndex];
          const { nextDate, nextInterval } = getNextReviewDate(review.interval, performance);

          const updatedReview: ReviewItem = {
            ...review,
            scheduledFor: nextDate,
            interval: nextInterval,
            repetitions: review.repetitions + 1,
            lastReviewed: new Date(),
          };

          const newSchedule = [...reviewSchedule];
          newSchedule[reviewIndex] = updatedReview;

          // Update lesson stats review count
          const lessonStatsMap = state.progress.lessonStats || {};
          const lessonStats = lessonStatsMap?.[lessonId];
          const updatedLessonStats = lessonStats 
            ? { ...lessonStats, reviewCount: lessonStats.reviewCount + 1 }
            : {
                lessonId,
                exercisesCompleted: 0,
                correctAnswers: 0,
                totalAttempts: 0,
                lastPracticed: new Date(),
                masteryLevel: 0,
                reviewCount: 1,
              };

          return {
            progress: {
              ...state.progress,
              reviewSchedule: newSchedule,
              lessonStats: {
                ...lessonStatsMap,
                [lessonId]: updatedLessonStats,
              },
            },
          };
        }),

      checkModuleAccess: (moduleId, requiredModuleId, requiredMastery) => {
        const state = get();
        // Resiliência para dados legados: `lessonStats` pode não existir
        const lessonStats = state.progress.lessonStats || {};
        
        // Calculate average mastery for required module lessons
        const requiredLessonStats = Object.values(lessonStats).filter(
          ls => ls.lessonId.startsWith(requiredModuleId.split('-')[0] + '-' + requiredModuleId.split('-')[1])
        );

        if (requiredLessonStats.length === 0) {
          return {
            moduleId,
            requiredModuleId,
            requiredMastery,
            currentMastery: 0,
            missingConcepts: ['Módulo anterior não iniciado'],
            recommendedReview: [],
          };
        }

        const avgMastery = requiredLessonStats.reduce((sum, ls) => sum + ls.masteryLevel, 0) / requiredLessonStats.length;

        if (avgMastery >= requiredMastery) {
          return null; // Access granted
        }

        const weakLessons = requiredLessonStats
          .filter(ls => ls.masteryLevel < requiredMastery)
          .map(ls => ls.lessonId);

        return {
          moduleId,
          requiredModuleId,
          requiredMastery,
          currentMastery: Math.round(avgMastery),
          missingConcepts: weakLessons.map(id => `Lição: ${id}`),
          recommendedReview: weakLessons,
        };
      },

      updateBlockedModules: () =>
        set((state) => {
          // This would be called to refresh blocked status
          // Implementation depends on module structure
          return state;
        }),

      getLessonStats: (lessonId) => {
        const state = get();
        const lessonStatsMap = state.progress.lessonStats || {};
        return lessonStatsMap[lessonId];
      },

      getOverdueReviews: () => {
        const state = get();
        const now = new Date();
        const reviewSchedule = state.progress.reviewSchedule || [];
        return reviewSchedule.filter(r => new Date(r.scheduledFor) < now);
      },

      getTodayReviews: () => {
        const state = get();
        const now = new Date();
        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);
        
        const reviewSchedule = state.progress.reviewSchedule || [];
        return reviewSchedule.filter(r => {
          const scheduled = new Date(r.scheduledFor);
          return scheduled >= now && scheduled <= endOfDay;
        });
      },

      // Reset completo do progresso (para demo/testes)
      resetProgress: () =>
        set(() => ({
          progress: { ...initialProgress, lastActive: new Date() },
        })),
    }),
    {
      name: 'python-pandas-progress',
      version: STATE_VERSION,
      storage: createJSONStorage(() => localStorage),
      
      // Migração de estado para compatibilidade com dados legados
      migrate: (persistedState: unknown, version: number) => {
        console.log('[Zustand] Migrando estado da versão', version, 'para', STATE_VERSION);
        
        // Se não há versão ou é muito antiga, resetar para o estado inicial
        if (version === 0 || !persistedState) {
          console.log('[Zustand] Versão muito antiga ou inválida, resetando estado');
          return { progress: { ...initialProgress, lastActive: new Date() } };
        }
        
        const state = persistedState as { progress?: Partial<UserProgress> };
        
        // Migração v1 -> v2: garantir que todos os campos obrigatórios existam
        if (version < 2) {
          console.log('[Zustand] Aplicando migração v1 -> v2');
          const migratedProgress: UserProgress = {
            userId: state.progress?.userId || 'guest',
            totalXp: state.progress?.totalXp || 0,
            level: state.progress?.level || 1,
            streak: state.progress?.streak || 0,
            longestStreak: state.progress?.longestStreak || 0,
            completedLessons: state.progress?.completedLessons || [],
            masteryLevels: state.progress?.masteryLevels || {},
            weakPoints: state.progress?.weakPoints || [],
            strengthPoints: state.progress?.strengthPoints || [],
            lastActive: state.progress?.lastActive ? new Date(state.progress.lastActive) : new Date(),
            dailyGoal: state.progress?.dailyGoal || 50,
            dailyProgress: state.progress?.dailyProgress || 0,
            badges: state.progress?.badges || [],
            examHistory: state.progress?.examHistory || [],
            // Campos que podem estar faltando em versões antigas
            reviewSchedule: state.progress?.reviewSchedule || [],
            lessonStats: state.progress?.lessonStats || {},
            blockedModules: state.progress?.blockedModules || [],
          };
          
          return { progress: migratedProgress };
        }
        
        return state;
      },
      
      // Merge para garantir que novos campos sejam adicionados ao estado existente
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { progress?: Partial<UserProgress> };
        return {
          ...currentState,
          progress: {
            ...initialProgress,
            ...persisted?.progress,
            // Garantir que arrays e objetos existam mesmo após merge
            reviewSchedule: persisted?.progress?.reviewSchedule || [],
            lessonStats: persisted?.progress?.lessonStats || {},
            blockedModules: persisted?.progress?.blockedModules || [],
            weakPoints: persisted?.progress?.weakPoints || [],
            badges: persisted?.progress?.badges || [],
            examHistory: persisted?.progress?.examHistory || [],
            completedLessons: persisted?.progress?.completedLessons || [],
          },
        };
      },
    }
  )
);
