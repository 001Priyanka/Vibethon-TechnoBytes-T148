'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AvatarMentor } from '@/components/avatar/AvatarMentor'
import { ArrowRight, Play, Zap, Brain, Code, Users } from 'lucide-react'

export default function LandingPage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI-Powered Learning',
      description: 'Personalized curriculum adapted to your learning pace and style',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Interactive Labs',
      description: 'Write real code and see instant results in our virtual environment',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Gamified Progress',
      description: 'Earn XP, unlock achievements, and maintain learning streaks',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Support',
      description: 'Connect with fellow learners and get help from AI mentors',
    },
  ]

  const floatingElements = [
    { emoji: '🧠', delay: 0 },
    { emoji: '⚡', delay: 0.5 },
    { emoji: '🎯', delay: 1 },
    { emoji: '🚀', delay: 1.5 },
    { emoji: '💡', delay: 2 },
    { emoji: '🔮', delay: 2.5 },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-30"
            style={{ y: y1, left: `${15 + i * 15}%` }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: el.delay,
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="text-2xl">🧠</div>
            <span className="text-xl font-bold gradient-text">NeuroLearn AI</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </motion.div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div style={{ y: y2 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm">
                  <Zap className="w-4 h-4" />
                  The Future of AI Education
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Learn AI & ML
                <br />
                <span className="gradient-text">Like Never Before</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 mb-8 max-w-lg"
              >
                An immersive, gamified learning experience with AI mentors, 
                interactive labs, and personalized learning paths.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/dashboard">
                  <Button size="xl" className="gap-2">
                    Start Learning Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="xl" className="gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-8"
              >
                <div>
                  <p className="text-3xl font-bold text-white">10K+</p>
                  <p className="text-sm text-gray-400">Active Learners</p>
                </div>
                <div className="w-px h-12 bg-gray-700" />
                <div>
                  <p className="text-3xl font-bold text-white">50+</p>
                  <p className="text-sm text-gray-400">Topics</p>
                </div>
                <div className="w-px h-12 bg-gray-700" />
                <div>
                  <p className="text-3xl font-bold text-white">95%</p>
                  <p className="text-sm text-gray-400">Success Rate</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: y1, opacity }}
              className="relative"
            >
              <div className="relative z-10">
                <AvatarMentor
                  message="Welcome to NeuroLearn AI! I'm Nova, your AI mentor. Ready to master machine learning?"
                  mood="excited"
                  size="lg"
                />
              </div>

              <motion.div
                className="absolute -top-10 -right-10 glass-card p-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-2xl mb-1">🎯</p>
                <p className="text-sm font-medium text-white">Daily Goal</p>
                <p className="text-xs text-gray-400">Complete to earn XP!</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-5 -left-5 glass-card p-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-sm font-medium text-green-400">+500 XP</p>
                <p className="text-xs text-gray-400">Topic Completed!</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">NeuroLearn AI</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of learning with our cutting-edge AI-powered platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center text-purple-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10" />
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🚀
              </motion.div>
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Your AI Journey?
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                Join thousands of learners who are already mastering AI and ML with NeuroLearn AI
              </p>
              <Link href="/dashboard">
                <Button size="xl" className="gap-2">
                  Launch Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>Built with Next.js, Tailwind CSS, and Framer Motion</p>
          <p className="mt-2 text-sm">NeuroLearn AI © 2024</p>
        </div>
      </footer>
    </div>
  )
}
