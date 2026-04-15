'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AvatarMentor } from '@/components/avatar/AvatarMentor'
import { Button } from '@/components/ui/button'
import { chatResponses } from '@/data/mockData'
import { cn } from '@/lib/utils'
import { Send, Sparkles, Bot, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
}

export function DoubtChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: chatResponses.greeting,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mood, setMood] = useState<'neutral' | 'thinking' | 'happy'>('neutral')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setMood('thinking')

    await new Promise(resolve => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: generateResponse(input),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, aiResponse])
    setIsTyping(false)
    setMood('happy')

    setTimeout(() => setMood('neutral'), 2000)
  }

  const generateResponse = (question: string): string => {
    const lower = question.toLowerCase()
    
    if (lower.includes('neural network') || lower.includes('neuron')) {
      return "Neural networks are inspired by the human brain! They consist of layers of interconnected nodes (neurons) that process information. Each connection has a weight that gets adjusted during learning. Think of it like a complex web where data flows through multiple transformations until we get a prediction!"
    }
    
    if (lower.includes('gradient') || lower.includes('descent')) {
      return "Great question! Gradient descent is like a ball rolling down a hill to find the lowest point. The gradient tells us which direction is downhill, and we take steps in that direction. The learning rate determines how big our steps are. Too big and we might overshoot, too small and it takes forever!"
    }
    
    if (lower.includes('overfitting')) {
      return "Overfitting happens when our model learns the training data too well, including the noise! It's like memorizing answers instead of understanding the concepts. We can prevent this with techniques like regularization, cross-validation, or getting more data. Think of it as studying for understanding, not just passing tests!"
    }
    
    return chatResponses.default
  }

  const suggestedQuestions = [
    'What is a neural network?',
    'How does gradient descent work?',
    'What is overfitting?',
    'Explain backpropagation',
  ]

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <AvatarMentor mood={mood} size="sm" isTyping={isTyping} />
        <div>
          <h3 className="text-lg font-bold text-white">Ask Nova</h3>
          <p className="text-sm text-gray-400">Your AI learning assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto mb-4 space-y-4 px-1">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3',
                message.role === 'user' && 'flex-row-reverse'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  message.role === 'ai' ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gray-700'
                )}
              >
                {message.role === 'ai' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-gray-300" />
                )}
              </div>

              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'ai'
                    ? 'glass-card rounded-bl-md'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs mt-1 opacity-60">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass-card rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-purple-400"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 rounded-full text-xs bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-purple-500/50 hover:text-white transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {q}
            </button>
          ))}
        </motion.div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about ML..."
          className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
        />
        <Button onClick={handleSend} disabled={!input.trim()} className="px-4">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
