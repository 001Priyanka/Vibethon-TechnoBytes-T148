import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  level: number
  xp: number
  streak: number
  joinDate: string
}

export interface Topic {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress: number
  completed: boolean
  locked: boolean
  icon: string
  xpReward: number
  estimatedTime: string
}

export interface Flashcard {
  id: string
  topicId: string
  front: string
  back: string
  difficulty: number
  nextReview?: Date
}

export interface MCQ {
  id: string
  topicId: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface NeuroLearnStore {
  user: User
  currentTopic: Topic | null
  weakAreas: string[]
  completedTopics: string[]
  flashcards: Flashcard[]
  xpToNextLevel: number
  
  setUser: (user: Partial<User>) => void
  addXP: (amount: number) => void
  incrementStreak: () => void
  resetStreak: () => void
  setCurrentTopic: (topic: Topic | null) => void
  completeTopic: (topicId: string) => void
  unlockNextTopic: (topicId: string) => void
  addWeakArea: (topicId: string) => void
  removeWeakArea: (topicId: string) => void
  updateFlashcardProgress: (cardId: string, correct: boolean) => void
}

const calculateXPForLevel = (level: number) => {
  return Math.floor(1000 * Math.pow(1.5, level - 1))
}

export const useStore = create<NeuroLearnStore>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        name: 'Alex Chen',
        email: 'alex@neurolearn.ai',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        level: 12,
        xp: 4750,
        streak: 7,
        joinDate: '2024-01-15',
      },
      currentTopic: null,
      weakAreas: ['neural-networks', 'backpropagation', 'activation-functions'],
      completedTopics: ['intro-ml', 'python-basics', 'numpy-intro', 'pandas-basics'],
      flashcards: [],
      xpToNextLevel: calculateXPForLevel(13),

      setUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      addXP: (amount) => set((state) => {
        const newXP = state.user.xp + amount
        const xpNeeded = state.xpToNextLevel
        if (newXP >= xpNeeded) {
          return {
            user: { ...state.user, xp: newXP - xpNeeded, level: state.user.level + 1 },
            xpToNextLevel: calculateXPForLevel(state.user.level + 2)
          }
        }
        return { user: { ...state.user, xp: newXP } }
      }),

      incrementStreak: () => set((state) => ({
        user: { ...state.user, streak: state.user.streak + 1 }
      })),

      resetStreak: () => set((state) => ({
        user: { ...state.user, streak: 0 }
      })),

      setCurrentTopic: (topic) => set({ currentTopic: topic }),

      completeTopic: (topicId) => set((state) => ({
        completedTopics: [...state.completedTopics, topicId]
      })),

      unlockNextTopic: (topicId) => set((state) => ({
        weakAreas: state.weakAreas.filter(id => id !== topicId)
      })),

      addWeakArea: (topicId) => set((state) => ({
        weakAreas: [...state.weakAreas, topicId]
      })),

      removeWeakArea: (topicId) => set((state) => ({
        weakAreas: state.weakAreas.filter(id => id !== topicId)
      })),

      updateFlashcardProgress: (cardId, correct) => set((state) => ({
        flashcards: state.flashcards.map(card => 
          card.id === cardId 
            ? { ...card, difficulty: correct ? Math.max(0, card.difficulty - 1) : card.difficulty + 1 }
            : card
        )
      })),
    }),
    {
      name: 'neurolearn-storage',
    }
  )
)
