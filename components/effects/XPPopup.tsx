'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface XPPopupProps {
  amount: number
  visible: boolean
}

export function XPPopup({ amount, visible }: XPPopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -60, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed bottom-8 right-8 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-yellow-500/30">
            <span>⚡</span>
            <span>+{amount} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
