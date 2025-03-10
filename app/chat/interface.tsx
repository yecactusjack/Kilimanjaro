
"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronRight, User, Bot, Paperclip, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type Message = {
  id: string
  type: 'user' | 'bot'
  text: string
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I\'m your bioinformatics assistant. How can I help you today?',
      timestamp: new Date()
    }
  ])
  
  const [inputQuery, setInputQuery] = useState('')
  const [isQuerying, setIsQuerying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputQuery.trim() || isQuerying) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputQuery,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputQuery('')
    setIsQuerying(true)
    
    // Simulate response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: getBotResponse(inputQuery),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsQuerying(false)
    }, 1000)
  }
  
  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('fastqc') || lowerQuery.includes('quality')) {
      return 'I can help you run FastQC on your sequence files. This tool will generate quality control reports showing the distribution of quality scores, GC content, adapter content, and other metrics. Would you like me to run this on your uploaded file?'
    }
    
    if (lowerQuery.includes('align') || lowerQuery.includes('mapping')) {
      return 'For sequence alignment, I recommend using BWA for DNA or STAR for RNA-seq data. These tools will map your reads to a reference genome. Which reference genome would you like to use for alignment?'
    }
    
    if (lowerQuery.includes('variant') || lowerQuery.includes('mutation')) {
      return 'To identify variants in your sequence data, we can use tools like GATK or FreeBayes. These tools compare your aligned sequences to a reference genome to find SNPs, indels, and other variations. Would you like me to set up a variant calling pipeline?'
    }
    
    if (lowerQuery.includes('help') || lowerQuery.includes('commands')) {
      return 'I can help you with various bioinformatics tasks including:\n- Quality control (FastQC, MultiQC)\n- Read trimming (Trimmomatic, Cutadapt)\n- Alignment (BWA, Bowtie2, STAR)\n- Variant calling (GATK, FreeBayes)\n- Differential expression analysis (DESeq2, EdgeR)\n\nJust tell me what task you want to perform!'
    }
    
    return 'I understand you\'re interested in analyzing your biological data. Could you provide more details about what specific analysis you\'d like to perform? For example, do you need quality control, alignment, variant calling, or something else?'
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3xl p-4 rounded-none ${
                message.type === 'user' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-black border border-black'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.type === 'bot' ? (
                  <Bot size={16} className="text-blue-600" />
                ) : (
                  <User size={16} />
                )}
                <span className="font-medium">
                  {message.type === 'user' ? 'You' : 'HiveMind Assistant'}
                </span>
                <span className="text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
          </motion.div>
        ))}
        {isQuerying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 text-black p-4 rounded-none border border-black">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-blue-600" />
                <span className="font-medium">HiveMind Assistant</span>
              </div>
              <div className="mt-2">
                <div className="flex space-x-2">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse animation-delay-200">●</span>
                  <span className="animate-pulse animation-delay-400">●</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmitQuery} className="p-4 border-t border-black">
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="outline"
            className="rounded-none border-black"
            size="icon"
          >
            <Paperclip size={18} />
          </Button>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Enter a command or query about your file..."
            className="flex-1 p-2 border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black"
            disabled={isQuerying}
          />
          <Button 
            type="submit"
            className="rounded-none bg-black text-white hover:bg-gray-800"
            size="icon"
            disabled={!inputQuery.trim() || isQuerying}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  )
}
