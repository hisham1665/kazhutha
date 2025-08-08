import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, Users, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">ChatConnect</span>
            </div>
            <Link href="/chat">
              <Button>Start Chatting</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Connect & Chat
            <span className="block text-indigo-600">Ask Your Doubts</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant responses to your questions. Connect with someone who will help clarify your doubts in real-time.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto">
                Start Chatting Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-indigo-600" />
                <CardTitle>Real-time Chat</CardTitle>
                <CardDescription>
                  Instant messaging with quick responses to your questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get immediate feedback and clarification on any topic you need help with.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-indigo-600" />
                <CardTitle>Personal Connection</CardTitle>
                <CardDescription>
                  One-on-one conversations for better understanding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Direct communication channel for personalized assistance and support.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-indigo-600" />
                <CardTitle>Quick Responses</CardTitle>
                <CardDescription>
                  Fast replies to keep the conversation flowing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  No waiting around - get the answers you need when you need them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-indigo-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white">
                Ready to get your doubts cleared?
              </h2>
              <p className="mt-4 text-lg text-indigo-200">
                Join the conversation and get the help you need right away.
              </p>
              <div className="mt-8">
                <Link href="/chat">
                  <Button size="lg" variant="secondary">
                    Enter Chat Room
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 ChatConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
