'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ArrowLeft, Send, MessageCircle } from 'lucide-react'

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
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (inputValue.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
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
        id: messages.length + 2,
        text: data.text || 'Sorry, I could not generate a response.',
        sender: 'other',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, responseMessage])
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
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
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-semibold text-gray-900">Chat Room</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
       
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback className="bg-red-500 text-white">K</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Kazhutha</p>
                <p className="text-sm text-gray-500">can i ask you a doubt...?</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words whitespace-pre-wrap overflow-hidden ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                      style={{ wordBreak: 'break-word' }}
                    >
                      <p className="text-sm break-words whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={sendMessage} disabled={isTyping || inputValue.trim() === ''}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
      </div>
    </div>
  )
}
