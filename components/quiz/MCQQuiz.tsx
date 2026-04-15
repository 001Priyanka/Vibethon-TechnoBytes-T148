'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mcqs } from '@/data/mockData'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Lightbulb, Trophy, ChevronRight } from 'lucide-react'

interface QuizProps {
  topicId?: string
  onComplete?: (score: number, total: number) => void
}

export function MCQQuiz({ topicId, onComplete }: QuizProps) {
  const questions = topicId 
    ? mcqs.filter(m => m.topicId === topicId)
    : mcqs

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([])

  const currentQuestion = questions[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer

  const handleAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    
    const correct = index === currentQuestion.correctAnswer
    setAnswers(prev => [...prev, { questionId: currentQuestion.id, correct }])
    
    if (correct) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsComplete(true)
      onComplete?.(score, questions.length)
    }
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Card className="glass-card p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </motion.div>
          
          <h2 className="text-3xl font-bold gradient-text mb-2">Quiz Complete!</h2>
          
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">{score}</p>
              <p className="text-sm text-gray-400">Correct</p>
            </div>
            <div className="text-2xl text-gray-500">/</div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-400">{questions.length}</p>
              <p className="text-sm text-gray-400">Total</p>
            </div>
          </div>

          <Progress value={percentage} variant="gradient" size="lg" className="mb-6" />
          
          <p className="text-gray-400 mb-6">
            {percentage >= 80 
              ? "Excellent work! You've mastered this topic!" 
              : percentage >= 60 
              ? "Good job! Review the explanations to improve."
              : "Keep practicing! You'll get there!"}
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setCurrentIndex(0)
                setSelectedAnswer(null)
                setShowResult(false)
                setScore(0)
                setIsComplete(false)
                setAnswers([])
              }}
            >
              Try Again
            </Button>
            <Button className="gap-2">
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Badge variant="outline" className="text-sm">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-400">{score} points</span>
        </div>
      </div>

      <Progress
        value={(currentIndex / questions.length) * 100}
        variant="gradient"
        className="mb-8"
      />

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <Card className="glass-card p-6 mb-6">
          <p className="text-xl text-white font-medium mb-6">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={cn(
                  'w-full p-4 rounded-xl text-left transition-all duration-300',
                  !showResult && 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50',
                  showResult && index === currentQuestion.correctAnswer && 'bg-green-600/30 border-green-500',
                  showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && 'bg-red-600/30 border-red-500 animate-shake',
                  showResult && index !== selectedAnswer && index !== currentQuestion.correctAnswer && 'bg-gray-800/30 border-gray-700/50 opacity-50'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
                    !showResult && 'bg-gray-700 text-gray-300',
                    showResult && index === currentQuestion.correctAnswer && 'bg-green-500 text-white',
                    showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && 'bg-red-500 text-white',
                    showResult && index !== selectedAnswer && index !== currentQuestion.correctAnswer && 'bg-gray-600 text-gray-400'
                  )}>
                    {showResult && index === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : showResult && index === selectedAnswer ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-white">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className={cn(
                'glass-card p-6 mb-6 border-l-4',
                isCorrect ? 'border-l-green-500' : 'border-l-yellow-500'
              )}>
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'p-2 rounded-lg',
                    isCorrect ? 'bg-green-500/20' : 'bg-yellow-500/20'
                  )}>
                    <Lightbulb className={cn(
                      'w-5 h-5',
                      isCorrect ? 'text-green-400' : 'text-yellow-400'
                    )} />
                  </div>
                  <div>
                    <h4 className={cn(
                      'font-bold mb-1',
                      isCorrect ? 'text-green-400' : 'text-yellow-400'
                    )}>
                      {isCorrect ? 'Correct!' : 'Not quite!'}
                    </h4>
                    <p className="text-gray-300 text-sm">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </Card>

              <Button onClick={handleNext} className="w-full gap-2">
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
