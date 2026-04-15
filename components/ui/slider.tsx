'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showValue?: boolean
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, showValue, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-700">
        <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-purple-500 to-blue-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-purple-500 bg-gray-900 shadow-lg shadow-purple-500/30 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing">
        <motion.div
          className="absolute inset-0 rounded-full bg-purple-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
