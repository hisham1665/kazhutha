'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Send } from 'lucide-react'
import { motion } from 'framer-motion'

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: Date
}

const randomDoubts = [
    "If the color blue didn't exist, would we still have a word for the sky?",
    "Does a tree falling in a forest really make a sound if no one is there to hear it?",
    "Could an AI ever truly experience consciousness or is it just simulating it?",
    "If you could travel back in time and meet your past self, what would that even mean for causality?",
    "Are dreams just random electrical signals or do they have a deeper purpose?",
    "Is 'nothing' a real thing, or is it just the absence of something?",
    "Does the universe have a center?",
    "If a person with a split personality commits a crime, which personality should be punished?",
    "Can you have a truly original thought, or is every idea a combination of others?",
    "Is the idea of free will compatible with the laws of physics?"
]

export default function ChatPage() {
  const randomIndex = useRef(Math.floor(Math.random() * randomDoubts.length));
  const [currentDoubt, setCurrentDoubt] = useState(randomDoubts[randomIndex.current]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: randomDoubts[randomIndex.current],
      sender: 'other',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        setTimeout(() => {
          viewport.scrollTop = viewport.scrollHeight;
        }, 0);
      }
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendMessage = async () => {
    if (inputValue.trim() === '' || isTyping) return

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue, doubt: currentDoubt })
      })
      const data = await res.json()
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: data.text || 'Sorry, I could not generate a response.',
        sender: 'other',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, responseMessage])
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Error: Failed to get response from Gemini API.',
          sender: 'other',
          timestamp: new Date()
        }
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 shadow-lg backdrop-blur border-b-2 border-pink-200 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="text-pink-600 hover:bg-pink-100 rounded-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </motion.div>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🫏</span>
              <h1 className="text-xl font-extrabold text-pink-600 tracking-widest drop-shadow-lg">Kazhutha Chat</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-green-200"></div>
              <span className="text-sm text-blue-700 font-semibold">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col min-h-0">
        <Card className="flex-grow flex flex-col bg-white/80 border-2 border-pink-200 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="border-b-2 border-pink-100">
            <CardTitle className="flex items-center space-x-3">
              <Avatar>
                <AvatarFallback className="bg-pink-500 text-white text-2xl">🫏</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-pink-600">Kazhutha</p>
                <p className="text-sm text-yellow-500">The Confused Donkey</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'other' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-pink-500 text-white">🫏</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl break-words ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white">You</AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-end gap-2 justify-start"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-pink-500 text-white">🫏</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t-2 border-pink-100">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Try to explain..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow rounded-full focus:border-pink-400"
                disabled={isTyping}
              />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={sendMessage}
                  className="rounded-full bg-gradient-to-r from-pink-400 to-yellow-400 text-white"
                  disabled={isTyping || inputValue.trim() === ''}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}