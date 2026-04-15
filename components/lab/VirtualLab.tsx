'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { labExperiments } from '@/data/mockData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Play, RotateCcw, FlaskConical } from 'lucide-react'

export function VirtualLab() {
  const [selectedLab, setSelectedLab] = useState(labExperiments[0])
  const [params, setParams] = useState<Record<string, number>>({})
  const [chartData, setChartData] = useState<{ x: number; y: number }[]>([])
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const initial: Record<string, number> = {}
    selectedLab.parameters.forEach(p => {
      initial[p.name] = p.default
    })
    setParams(initial)
  }, [selectedLab])

  const runExperiment = () => {
    setIsRunning(true)
    
    setTimeout(() => {
      const data: { x: number; y: number }[] = []
      
      if (selectedLab.id === 'lab-1') {
        let velocity = 0
        let position = 5
        for (let i = 0; i < 100; i++) {
          const gradient = 2 * position
          velocity = params.Momentum * velocity - params['Learning Rate'] * gradient
          position += velocity
          data.push({ x: i, y: position })
        }
      } else if (selectedLab.id === 'lab-2') {
        const x = params['Input Value']
        data.push({ x: x, y: 1 / (1 + Math.exp(-x)) })
        data.push({ x: x, y: Math.max(0, x) })
        data.push({ x: x, y: Math.tanh(x) })
        data.push({ x: x, y: x > 0 ? x : 0.01 * x })
      }

      setChartData(data)
      setIsRunning(false)
    }, 800)
  }

  const handleReset = () => {
    const initial: Record<string, number> = {}
    selectedLab.parameters.forEach(p => {
      initial[p.name] = p.default
    })
    setParams(initial)
    setChartData([])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="glass-card p-6 h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/30 to-blue-600/30">
                <FlaskConical className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedLab.title}</h3>
                <p className="text-sm text-gray-400">{selectedLab.description}</p>
              </div>
            </div>
          </div>

          <div className="h-64 bg-gray-900/50 rounded-xl p-4 mb-6">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="x" 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(18, 18, 26, 0.9)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="y"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FlaskConical className="w-12 h-12 mx-auto mb-2 text-gray-600" />
                  </motion.div>
                  <p>Click "Run Experiment" to visualize</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={runExperiment}
              disabled={isRunning}
              className="flex-1 gap-2"
            >
              {isRunning ? (
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Run Experiment
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="glass-card p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Select Experiment</h4>
          <div className="space-y-2">
            {labExperiments.map((lab) => (
              <button
                key={lab.id}
                onClick={() => setSelectedLab(lab)}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedLab.id === lab.id
                    ? 'bg-purple-600/30 border border-purple-500/50'
                    : 'bg-gray-800/50 border border-transparent hover:border-gray-700'
                }`}
              >
                <p className="text-sm font-medium text-white">{lab.title}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="glass-card p-4">
          <h4 className="text-sm font-medium text-gray-400 mb-4">Parameters</h4>
          <div className="space-y-6">
            {selectedLab.parameters.map((param) => (
              <div key={param.name}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-gray-300">{param.name}</label>
                  <Badge variant="outline" size="sm">
                    {params[param.name]?.toFixed(2) || param.default}
                  </Badge>
                </div>
                <Slider
                  value={[params[param.name] || param.default]}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  onValueChange={([value]) => setParams(prev => ({ ...prev, [param.name]: value }))}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{param.min}</span>
                  <span>{param.max}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
