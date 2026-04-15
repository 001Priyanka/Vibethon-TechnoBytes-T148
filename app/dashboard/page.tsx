'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  XPProgressBar, 
  StreakCounter, 
  QuickStats, 
  ContinueLearningCard, 
  WeakAreasCard,
  DailyChallenge 
} from '@/components/dashboard/DashboardStats'
import { LearningPath } from '@/components/learning/LearningPath'
import { AvatarMentor } from '@/components/avatar/AvatarMentor'
import { Button } from '@/components/ui/button'
import { Tabs, TabPanel } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { 
  Home, 
  BookOpen, 
  Code, 
  FlaskConical, 
  MessageCircle, 
  Trophy,
  Bell,
  Search,
  Menu,
  Zap
} from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: BookOpen, label: 'Learning', href: '/dashboard' },
  { icon: Code, label: 'Labs', href: '/dashboard' },
  { icon: MessageCircle, label: 'Chat', href: '/dashboard' },
  { icon: Trophy, label: 'Achievements', href: '/dashboard' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showWelcome, setShowWelcome] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="text-2xl">🧠</div>
                <span className="text-xl font-bold gradient-text">NeuroLearn AI</span>
              </motion.div>

              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        item.active
                          ? 'bg-purple-600/20 text-purple-400'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Level 12</span>
              </motion.div>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 glass-card px-6 py-3 flex items-center gap-4"
          >
            <AvatarMentor message="Welcome back, Alex! Ready to learn something new?" mood="happy" size="sm" />
            <Button variant="ghost" size="sm" onClick={() => setShowWelcome(false)}>
              Dismiss
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <XPProgressBar />
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StreakCounter />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sm:col-span-2"
              >
                <ContinueLearningCard />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Overview' },
                  { id: 'learning', label: 'Learning Path' },
                  { id: 'stats', label: 'Statistics' },
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              <div className="mt-6">
                <TabPanel isActive={activeTab === 'overview'}>
                  <div className="space-y-6">
                    <Card className="glass-card p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Your Learning Path</h3>
                      <div className="h-64 overflow-hidden rounded-xl">
                        <LearningPath />
                      </div>
                    </Card>
                  </div>
                </TabPanel>

                <TabPanel isActive={activeTab === 'learning'}>
                  <Card className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Complete Roadmap</h3>
                    <div className="h-96">
                      <LearningPath />
                    </div>
                  </Card>
                </TabPanel>

                <TabPanel isActive={activeTab === 'stats'}>
                  <QuickStats />
                </TabPanel>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DailyChallenge />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <WeakAreasCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {[
                  { emoji: '🏆', title: 'First Steps', desc: 'Complete first topic' },
                  { emoji: '🔥', title: '7 Day Streak', desc: '7 days in a row' },
                  { emoji: '⚡', title: 'Speed Learner', desc: 'Complete 5 topics' },
                ].map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50"
                  >
                    <span className="text-2xl">{ach.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{ach.title}</p>
                      <p className="text-xs text-gray-400">{ach.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/dashboard?tab=flashcards">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <span className="text-xl">🃏</span>
                    Practice Flashcards
                  </Button>
                </Link>
                <Link href="/dashboard?tab=quiz">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <span className="text-xl">📝</span>
                    Take a Quiz
                  </Button>
                </Link>
                <Link href="/dashboard?tab=lab">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <span className="text-xl">🔬</span>
                    Open Virtual Lab
                  </Button>
                </Link>
                <Link href="/dashboard?tab=chat">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <span className="text-xl">💬</span>
                    Ask Nova
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
