import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, WeakPoint, Badge, ExamResult } from '@/types/learning';
import { getLevelFromXP } from '@/data/curriculum';

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
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
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
                    ? { ...wp, errorCount: wp.errorCount + 1, lastError: new Date() }
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
    }),
    {
      name: 'python-pandas-progress',
    }
  )
);
