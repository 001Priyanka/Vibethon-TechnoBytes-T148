'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  max?: number
  showValue?: boolean
  animated?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient' | 'neon'
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value = 0, max = 100, showValue = false, animated = true, size = 'md', variant = 'gradient', ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const heights = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    }

    const variants = {
      default: 'bg-purple-600',
      gradient: 'bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500',
      neon: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    }

    return (
      <div className="w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-full bg-gray-800/50',
            heights[size],
            className
          )}
          {...props}
        >
          <motion.div
            className={cn('h-full rounded-full', variants[variant])}
            initial={animated ? { width: 0 } : { width: `${percentage}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          {animated && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          )}
        </ProgressPrimitive.Root>
        {showValue && (
          <motion.p
            className="text-xs text-gray-400 mt-1 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(percentage)}%
          </motion.p>
        )}
      </div>
    )
  }
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
