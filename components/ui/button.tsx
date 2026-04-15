'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95',
        secondary:
          'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40 hover:scale-105 active:scale-95',
        ghost:
          'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95',
        outline:
          'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-105 active:scale-95',
        glow:
          'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.7)] hover:scale-105 active:scale-95',
        neon:
          'relative text-purple-400 hover:text-white transition-colors duration-300 after:absolute after:inset-0 after:rounded-lg after:bg-purple-500/20 after:opacity-0 hover:after:opacity-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <motion.div
        whileHover={{ scale: variant === 'ghost' || variant === 'neon' ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={loading || props.disabled}
          {...props}
        >
          {loading ? (
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          ) : (
            children
          )}
        </Comp>
      </motion.div>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
