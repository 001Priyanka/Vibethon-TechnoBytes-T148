'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AvatarMentor } from '@/components/avatar/AvatarMentor'
import { FlashcardDeck } from '@/components/flashcards/Flashcard'
import { MCQQuiz } from '@/components/quiz/Quiz'
import { CodePlayground } from '@/components/editor/CodePlayground'
import { VirtualLab } from '@/components/lab/VirtualLab'
import { DoubtChat } from '@/components/chat/DoubtChat'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabPanel } from '@/components/ui/tabs'
import { topics } from '@/data/mockData'
import { useStore } from '@/store/useStore'
import { 
  ArrowLeft, 
  BookOpen, 
  Brain, 
  Code, 
  FlaskConical, 
  MessageCircle,
  ChevronRight,
  Lightbulb,
  Play,
  CheckCircle
} from 'lucide-react'

const tabs = [
  { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'flashcards', label: 'Flashcards', icon: <Brain className="w-4 h-4" /> },
  { id: 'quiz', label: 'Quiz', icon: <CheckCircle className="w-4 h-4" /> },
  { id: 'lab', label: 'Lab', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'chat', label: 'Ask Nova', icon: <MessageCircle className="w-4 h-4" /> },
]

export default function TopicPage() {
  const searchParams = useSearchParams()
  const topicId = searchParams.get('id') || 'linear-algebra'
  const [activeTab, setActiveTab] = useState('learn')
  const { completedTopics } = useStore()
  
  const topic = topics.find(t => t.id === topicId) || topics[0]
  const isCompleted = completedTopics.includes(topicId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <nav className="sticky top-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic.icon}</span>
                <div>
                  <h1 className="text-lg font-bold text-white">{topic.title}</h1>
                  <p className="text-sm text-gray-400">{topic.estimatedTime}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={topic.difficulty === 'beginner' ? 'success' : topic.difficulty === 'intermediate' ? 'warning' : 'danger'}>
                {topic.difficulty}
              </Badge>
              <Badge variant="outline">{topic.xpReward} XP</Badge>
            </div>
          </div>

          <div className="mt-4">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <TabPanel isActive={activeTab === 'learn'}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <AvatarMentor
                      message={`Let's dive into ${topic.title}! ${topic.description}`}
                      mood="neutral"
                      size="md"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                  <ul className="space-y-3 mb-6">
                    {['Fundamental concepts and terminology', 'Practical applications', 'Hands-on coding examples', 'Real-world use cases'].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400 text-sm">
                          {i + 1}
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Lightbulb className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-bold text-white">Key Concept</h3>
                    </div>
                    <p className="text-gray-300">
                      {topic.description}. Understanding these fundamentals is crucial for advanced machine learning topics.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 gap-2" onClick={() => setActiveTab('flashcards')}>
                      <Brain className="w-4 h-4" />
                      Start Flashcards
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2" onClick={() => setActiveTab('quiz')}>
                      <Play className="w-4 h-4" />
                      Take Quiz
                    </Button>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Code className="w-5 h-5 text-purple-400" />
                      Code Examples
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('lab')}>
                      Open Playground
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-gray-300">
{`# Example: ${topic.title.replace(/\s+/g, '_').toLowerCase()}
import numpy as np

# Initialize the concept
data = np.array([1, 2, 3, 4, 5])

# Apply transformation
result = data * 2

print(f"Result: {result}")
# Output: [2, 4, 6, 8, 10]`}
                    </pre>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 sticky top-32"
              >
                <h3 className="text-lg font-bold text-white mb-4">Topics in This Module</h3>
                <div className="space-y-2">
                  {topics.slice(0, 5).map((t, i) => (
                    <button
                      key={t.id}
                      className={`w-full p-3 rounded-lg text-left transition-all ${
                        t.id === topicId
                          ? 'bg-purple-600/30 border border-purple-500/50'
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{t.icon}</span>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${t.id === topicId ? 'text-white' : 'text-gray-400'}`}>
                            {t.title}
                          </p>
                        </div>
                        {completedTopics.includes(t.id) && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'flashcards'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card p-8">
              <FlashcardDeck topicId={topicId} />
            </Card>
          </motion.div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'quiz'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <MCQQuiz topicId={topicId} />
          </motion.div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'lab'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card overflow-hidden">
              <CodePlayground />
            </Card>
          </motion.div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'chat'}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-card p-8">
              <DoubtChat />
            </Card>
          </motion.div>
        </TabPanel>
      </main>
    </div>
  )
}
