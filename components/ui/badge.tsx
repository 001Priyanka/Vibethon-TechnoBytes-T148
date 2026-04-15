'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', pulse = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-purple-600/20 text-purple-400 border-purple-500/50',
      secondary: 'bg-blue-600/20 text-blue-400 border-blue-500/50',
      success: 'bg-green-600/20 text-green-400 border-green-500/50',
      warning: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/50',
      danger: 'bg-red-600/20 text-red-400 border-red-500/50',
      outline: 'bg-transparent text-gray-400 border-gray-500/50',
    }

    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-1',
      lg: 'text-base px-3 py-1.5',
    }

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {pulse && (
          <motion.span
            className="relative flex h-2 w-2"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span
              className={cn(
                'absolute inline-flex h-full w-full rounded-full opacity-75',
                variant === 'success' && 'bg-green-400',
                variant === 'warning' && 'bg-yellow-400',
                variant === 'danger' && 'bg-red-400',
                variant === 'default' && 'bg-purple-400',
                variant === 'secondary' && 'bg-blue-400'
              )}
            />
            <span
              className={cn(
                'relative inline-flex rounded-full h-2 w-2',
                variant === 'success' && 'bg-green-500',
                variant === 'warning' && 'bg-yellow-500',
                variant === 'danger' && 'bg-red-500',
                variant === 'default' && 'bg-purple-500',
                variant === 'secondary' && 'bg-blue-500'
              )}
            />
          </motion.span>
        )}
        {children}
      </motion.div>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
