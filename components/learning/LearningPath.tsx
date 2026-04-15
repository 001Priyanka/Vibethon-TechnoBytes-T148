'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { topics } from '@/data/mockData'
import { useStore } from '@/store/useStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Lock, CheckCircle, Play, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
} as const

export function LearningPath() {
  const { completedTopics } = useStore()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodePosition = (index: number) => {
    const row = Math.floor(index / 3)
    const col = index % 3
    const xOffset = col * 200 + 100
    const yOffset = row * 150 + 100
    return { x: xOffset, y: yOffset }
  }

  return (
    <div className="relative overflow-auto pb-8">
      <div className="min-w-[800px] min-h-[600px] relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {topics.map((topic, index) => {
            const nextTopic = topics[index + 1]
            if (!nextTopic) return null
            
            const start = getNodePosition(index)
            const end = getNodePosition(index + 1)
            
            const isCompleted = completedTopics.includes(topic.id)
            
            return (
              <motion.line
                key={`line-${topic.id}`}
                x1={start.x + 50}
                y1={start.y + 50}
                x2={end.x - 50}
                y2={end.y + 50}
                stroke={isCompleted ? '#22c55e' : '#374151'}
                strokeWidth={2}
                strokeDasharray={isCompleted ? '0' : '5,5'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            )
          })}
        </svg>

        {topics.map((topic, index) => {
          const pos = getNodePosition(index)
          const isCompleted = completedTopics.includes(topic.id)
          const isLocked = topic.locked
          const isHovered = hoveredNode === topic.id

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              style={{
                position: 'absolute',
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredNode(topic.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  y: isHovered ? -10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <div
                  className={cn(
                    'w-[180px] rounded-2xl p-4 cursor-pointer transition-all duration-300',
                    isLocked
                      ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/50'
                      : 'glass-card',
                    isCompleted && 'border-green-500/50',
                    isHovered && !isLocked && 'shadow-[0_0_30px_rgba(168,85,247,0.4)]'
                  )}
                >
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-2xl backdrop-blur-sm">
                      <Lock className="w-8 h-8 text-gray-500" />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{topic.icon}</span>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-green-400"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>

                  <h4 className={cn(
                    'font-bold mb-1',
                    isLocked ? 'text-gray-500' : 'text-white'
                  )}>
                    {topic.title}
                  </h4>

                  <Badge
                    variant={difficultyColors[topic.difficulty]}
                    size="sm"
                    className="mb-2"
                  >
                    {topic.difficulty}
                  </Badge>

                  {!isLocked && (
                    <Progress
                      value={topic.progress}
                      size="sm"
                      showValue
                      className="mt-2"
                    />
                  )}

                  {isHovered && !isLocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <Button size="sm" className="w-full gap-2">
                        {isCompleted ? 'Review' : 'Start'}
                        <Play className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {isHovered && !isLocked && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 glass-card p-3 z-50"
                    >
                      <p className="text-sm text-gray-300 mb-2">{topic.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{topic.xpReward} XP</span>
                        <span>{topic.estimatedTime}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function DailyChallenge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-3xl"
          >
            ⚡
          </motion.div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Challenge</h3>
            <p className="text-sm text-gray-400">Complete for bonus XP!</p>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <p className="text-white font-medium mb-2">Master Matrix Multiplication</p>
          <p className="text-sm text-gray-400">Complete 5 matrix operations with 90%+ accuracy</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
            />
          </div>
          <span className="text-sm text-gray-400">3/5</span>
        </div>

        <Button className="w-full mt-4 gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400">
          <Sparkles className="w-4 h-4" />
          Claim 200 Bonus XP
        </Button>
      </div>
    </motion.div>
  )
}
