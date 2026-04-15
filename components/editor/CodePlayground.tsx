'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabPanel } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Play, RotateCcw, Copy, Check, Terminal, Code2 } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

interface CodePlaygroundProps {
  initialCode?: string
  language?: string
}

export function CodePlayground({ initialCode = '', language = 'javascript' }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode || `// Welcome to the Code Playground!
// Write your ML code here

function gradientDescent(learningRate, iterations) {
  let position = 5;
  const history = [];
  
  for (let i = 0; i < iterations; i++) {
    const gradient = 2 * position; // derivative of x^2
    position = position - learningRate * gradient;
    history.push(position);
  }
  
  return history;
}

// Run the function
const result = gradientDescent(0.1, 50);
console.log("Final position:", result[result.length - 1]);
console.log("Iterations:", result.length);
`)

  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('code')

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setOutput([])
    setActiveTab('output')

    const logs: string[] = []
    
    const originalLog = console.log
    const originalError = console.error
    const originalWarn = console.warn

    console.log = (...args) => {
      logs.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '))
    }
    console.error = (...args) => {
      logs.push('❌ ' + args.map(String).join(' '))
    }
    console.warn = (...args) => {
      logs.push('⚠️ ' + args.map(String).join(' '))
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const fn = new Function(code)
      fn()
      setOutput(logs.length > 0 ? logs : ['✅ Code executed successfully!'])
    } catch (error) {
      setOutput([`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`])
    } finally {
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
      setIsRunning(false)
    }
  }, [code])

  const handleReset = () => {
    setCode(initialCode || '')
    setOutput([])
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = [
    { id: 'code', label: 'Code', icon: <Code2 className="w-4 h-4" /> },
    { id: 'output', label: 'Output', icon: <Terminal className="w-4 h-4" /> },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Badge variant="secondary">JavaScript</Badge>
          <span className="text-sm text-gray-400">Code Playground</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="h-8 w-8"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={runCode}
            disabled={isRunning}
            className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
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
            Run
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="flex-1 overflow-hidden">
        <TabPanel isActive={activeTab === 'code'}>
          <div className="h-full">
            <MonacoEditor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                padding: { top: 16 },
              }}
            />
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'output'}>
          <div className="h-full p-4 bg-gray-900/50 overflow-auto">
            <div className="font-mono text-sm space-y-2">
              {output.length === 0 ? (
                <p className="text-gray-500 italic">Run your code to see output here...</p>
              ) : (
                output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'flex items-start gap-2',
                      line.startsWith('❌') && 'text-red-400',
                      line.startsWith('⚠️') && 'text-yellow-400',
                      line.startsWith('✅') && 'text-green-400',
                      !line.startsWith('❌') && !line.startsWith('⚠️') && !line.startsWith('✅') && 'text-gray-300'
                    )}
                  >
                    <span className="text-gray-500 select-none">&gt;</span>
                    <span>{line}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  )
}
