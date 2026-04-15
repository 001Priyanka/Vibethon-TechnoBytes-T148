'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
  glowColor?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, glowColor = '#a855f7', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { scale: 1.02, y: -4 } : {}}
        transition={{ duration: 0.2 }}
        className={cn(
          'glass-card relative overflow-hidden transition-all duration-300',
          glow && 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]',
          className
        )}
        {...props}
      >
        {glow && (
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glowColor}20, transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10">{children}</div>
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${glowColor}10, transparent 50%)`,
          }}
        />
      </motion.div>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight text-white', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-gray-400', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
