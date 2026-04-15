'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { flashcards as initialFlashcards } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { XPPopup } from '@/components/effects/XPPopup'
import { useUpdateXP } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { CheckCircle, RotateCcw, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react'

export function FlashcardDeck({ topicId }: { topicId?: string }) {
  const cards = topicId 
    ? initialFlashcards.filter(f => f.topicId === topicId)
    : initialFlashcards

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set())
  const [reviewCards, setReviewCards] = useState<Set<string>>(new Set())
  const [showXP, setShowXP] = useState(false)
  const updateXP = useUpdateXP()

  const currentCard = cards[currentIndex]

  const handleFlip = () => setIsFlipped(!isFlipped)

  const handleNext = () => {
    setDirection(1)
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length)
    }, 200)
  }

  const handlePrev = () => {
    setDirection(-1)
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }, 200)
  }

  const handleKnown = () => {
    setKnownCards(prev => {
      const newSet = new Set<string>();
      prev.forEach(v => newSet.add(v));
      newSet.add(currentCard.id);
      return newSet;
    });
    updateXP.mutate(5)
    setShowXP(true)
    setTimeout(() => setShowXP(false), 1200)
    handleNext();
  }

  const handleReview = () => {
    setReviewCards(prev => {
      const newSet = new Set<string>();
      prev.forEach(v => newSet.add(v));
      newSet.add(currentCard.id);
      return newSet;
    });
    handleNext();
  }

  const handleShuffle = () => {
    setCurrentIndex(Math.floor(Math.random() * cards.length))
    setIsFlipped(false)
    setKnownCards(new Set())
    setReviewCards(new Set())
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold gradient-text">Flashcards</h2>
          <Badge variant="secondary">
            {currentIndex + 1} / {cards.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-400 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> {knownCards.size}
          </span>
          <span className="text-sm text-yellow-400 flex items-center gap-1">
            🔄 {reviewCards.size}
          </span>
        </div>
      </div>

      <div className="relative h-[300px] mb-8">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
            onClick={handleFlip}
          >
            <FlipCard card={currentCard} isFlipped={isFlipped} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={handleFlip}
          className="px-8 gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={handleReview}
          variant="secondary"
          className="gap-2"
        >
          🔄 Review Again
        </Button>
        <Button
          onClick={handleKnown}
          className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
        >
          <CheckCircle className="w-4 h-4" />
          Got It!
        </Button>
        <Button
          variant="ghost"
          onClick={handleShuffle}
          className="gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
      </div>
      <XPPopup amount={5} visible={showXP} />
    </div>
  )
}

function FlipCard({ card, isFlipped }: { card: typeof initialFlashcards[0]; isFlipped: boolean }) {
  return (
    <div className="w-full h-full perspective-1000">
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center cursor-pointer"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Badge variant="outline" className="mb-4">Question</Badge>
          <p className="text-xl text-center text-white font-medium">
            {card.front}
          </p>
          <p className="text-sm text-gray-500 mt-4">Click to reveal answer</p>
        </div>

        <div
          className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/30"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <Badge variant="success" className="mb-4">Answer</Badge>
          <p className="text-lg text-center text-white">
            {card.back}
          </p>
        </div>
      </motion.div>
    </div>
  )
}
