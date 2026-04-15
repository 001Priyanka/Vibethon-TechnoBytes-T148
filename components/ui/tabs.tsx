'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-2 p-1 bg-gray-900/50 rounded-xl', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'relative px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-white'
              : 'text-gray-400 hover:text-white'
          )}
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg -z-10"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

interface TabPanelProps {
  children: React.ReactNode
  isActive: boolean
}

export function TabPanel({ children, isActive }: TabPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.2 }}
      className={cn(!isActive && 'hidden')}
    >
      {children}
    </motion.div>
  )
}
