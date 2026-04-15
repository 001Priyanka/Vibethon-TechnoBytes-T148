'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

type Mood = 'happy' | 'neutral' | 'thinking' | 'warning' | 'excited'

interface AvatarMentorProps {
  message?: string
  mood?: Mood
  isTyping?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const moodColors = {
  happy: { primary: '#22c55e', secondary: '#86efac' },
  neutral: { primary: '#a855f7', secondary: '#c084fc' },
  thinking: { primary: '#3b82f6', secondary: '#93c5fd' },
  warning: { primary: '#f59e0b', secondary: '#fcd34d' },
  excited: { primary: '#ec4899', secondary: '#f9a8d4' },
}

const moodEmojis = {
  happy: '😊',
  neutral: '🤖',
  thinking: '💭',
  warning: '⚠️',
  excited: '🎉',
}

export function AvatarMentor({ 
  message, 
  mood = 'neutral', 
  isTyping = false,
  size = 'md',
  className 
}: AvatarMentorProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showBubble, setShowBubble] = useState(false)

  const sizes = {
    sm: { avatar: 60, font: 'text-sm' },
    md: { avatar: 80, font: 'text-base' },
    lg: { avatar: 120, font: 'text-lg' },
  }

  const colors = moodColors[mood]

  useEffect(() => {
    if (message) {
      setShowBubble(true)
      setDisplayedText('')
      let index = 0
      const interval = setInterval(() => {
        if (index < message.length) {
          setDisplayedText(message.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    }
  }, [message])

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative">
        <motion.div
          className="relative"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{ backgroundColor: colors.primary, opacity: 0.4 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          <motion.div
            className="relative rounded-full border-2 flex items-center justify-center overflow-hidden"
            style={{
              width: sizes[size].avatar,
              height: sizes[size].avatar,
              borderColor: colors.primary,
              backgroundColor: 'rgba(18, 18, 26, 0.9)',
              boxShadow: `0 0 30px ${colors.primary}40, inset 0 0 20px ${colors.secondary}20`,
            }}
            animate={isTyping ? {
              scale: [1, 1.02, 1],
            } : mood === 'excited' || mood === 'happy' ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${colors.secondary}40, transparent 50%)`,
              }}
            />
            
            <motion.div
              className="relative z-10"
              animate={mood === 'excited' ? {
                rotate: [-5, 5, -5],
              } : mood === 'thinking' ? {
                y: [0, -3, 0],
              } : {}}
              transition={{ duration: 0.5, repeat: mood === 'excited' || mood === 'thinking' ? Infinity : 0 }}
            >
              <motion.div
                className={cn(
                  'transition-all duration-300',
                  mood === 'excited' && 'animate-bounce'
                )}
                style={{ fontSize: sizes[size].avatar * 0.5 }}
              >
                {moodEmojis[mood]}
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/3"
              style={{
                background: `linear-gradient(to top, ${colors.primary}30, transparent)`,
              }}
            />

            <motion.div
              className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/50"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-4 right-3 w-1 h-1 rounded-full bg-white/30"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-2 -right-2"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 0.5, repeat: mood === 'happy' || mood === 'excited' ? Infinity : 0 }}
          >
            <div
              className="px-2 py-1 rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: colors.primary }}
            >
              NOVA
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute -left-8 top-1/2 w-6 h-0.5"
          style={{ backgroundColor: colors.primary, opacity: 0.5 }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      <AnimatePresence>
        {showBubble && (message || isTyping) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="relative max-w-xs"
          >
            <div
              className="glass-card p-4 rounded-2xl rounded-bl-md"
              style={{
                borderColor: `${colors.primary}40`,
              }}
            >
              <p className={sizes[size].font}>
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 ml-1 bg-white/50"
                />
              </p>
              
              {isTyping && (
                <motion.div
                  className="flex gap-1 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            <motion.div
              className="absolute -bottom-2 left-6 w-4 h-4 rotate-45"
              style={{ backgroundColor: 'rgba(18, 18, 26, 0.8)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
