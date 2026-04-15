'use client'

import * as React from 'react'
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
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
        )}
        {children}
      </div>
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }