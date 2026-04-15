'use client'

import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { useStore } from '@/store/useStore'
import { Flame, Zap, Trophy, Target, TrendingUp } from 'lucide-react'

export function XPProgressBar() {
  const { user, xpToNextLevel } = useStore()
  const percentage = (user.xp / xpToNextLevel) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Level {user.level}</p>
            <p className="text-2xl font-bold gradient-text">
              {user.xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
            </p>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          ⚡
        </motion.div>
      </div>
      <Progress
        value={percentage}
        variant="gradient"
        size="lg"
        className="h-3"
      />
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Current: {user.xp.toLocaleString()} XP</span>
        <span>Next Level: {xpToNextLevel.toLocaleString()} XP</span>
      </div>
    </motion.div>
  )
}

export function StreakCounter() {
  const { user } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="glass-card p-6 text-center relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-5xl mb-2 inline-block"
        >
          🔥
        </motion.div>
        <p className="text-4xl font-bold text-white">{user.streak}</p>
        <p className="text-sm text-gray-400">Day Streak</p>
        {user.streak >= 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold text-white">
              🔥 On Fire!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function StatsCard({ icon, label, value, trend }: { icon: string; label: string; value: string | number; trend?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function QuickStats() {
  const { user, completedTopics, weakAreas } = useStore()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatsCard icon="🎯" label="Topics Completed" value={completedTopics.length} trend="+2" />
      <StatsCard icon="⏱️" label="Hours Learned" value={47} trend="+3.5" />
      <StatsCard icon="🏆" label="Achievements" value={12} />
      <StatsCard icon="📚" label="Weak Areas" value={weakAreas.length} />
    </div>
  )
}

export function ContinueLearningCard({ onClick }: { onClick?: () => void }) {
  const { currentTopic } = useStore()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Continue Learning</p>
            <h3 className="text-lg font-bold text-white">
              {currentTopic?.title || 'Linear Algebra for ML'}
            </h3>
          </div>
        </div>
        <Progress
          value={currentTopic?.progress || 65}
          showValue
          variant="neon"
        />
        <motion.button
          className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Resume Learning →
        </motion.button>
      </div>
    </motion.div>
  )
}

export function WeakAreasCard() {
  const { weakAreas } = useStore()
  const weakAreaNames: Record<string, string> = {
    'neural-networks': 'Neural Networks',
    'backpropagation': 'Backpropagation',
    'activation-functions': 'Activation Functions',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-bold text-white">Areas to Improve</h3>
      </div>
      <div className="space-y-3">
        {weakAreas.map((area, i) => (
          <motion.div
            key={area}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50"
          >
            <span className="text-sm text-gray-300">{weakAreaNames[area] || area}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-lg bg-purple-600/30 text-purple-400 text-xs font-medium"
            >
              Review
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
