'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 shadow-lg backdrop-blur border-b-2 border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div className="flex items-center gap-2" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <span className="text-3xl">🫏</span>
              <span className="ml-2 text-3xl font-extrabold text-pink-600 tracking-widest drop-shadow-lg">Kazhutha Doubt Chat</span>
            </motion.div>
            <Link href="/chat">
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-300 text-white font-bold border-2 border-pink-200 rounded-full shadow-lg hover:from-pink-300 hover:to-blue-200 transition-all">Start Chatting</Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
            <motion.h1 className="text-4xl font-extrabold text-pink-600 sm:text-5xl md:text-6xl" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
              Dopamine Doubt Dump
              <span className="block text-yellow-500">Minimal, Fun & Addictive</span>
            </motion.h1>
            <motion.p className="mt-3 max-w-md mx-auto text-base text-blue-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Try to explain silly questions to a stubborn AI! Enjoy a minimal, dopamine-rich UI with playful colors and micro-animations.
            </motion.p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link href="/chat">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-300 text-white font-bold border-2 border-pink-200 rounded-full shadow-lg hover:from-pink-300 hover:to-blue-200 transition-all">
                    Start Chatting Now
                  </Button>
                </motion.div>
              </Link>
            </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="bg-white/80 border-2 border-pink-200 shadow-xl">
                <CardHeader>
                  <span className="text-2xl">🫏❓</span>
                  <CardTitle className="text-pink-600">Donkey Doubts</CardTitle>
                  <CardDescription className="text-yellow-500">
                    The AI asks the weirdest, silliest questions. Can you answer?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Every chat starts with a random, fun doubt. Try to explain, but beware: the donkey never gets it!
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="bg-white/80 border-2 border-yellow-200 shadow-xl">
                <CardHeader>
                  <span className="text-2xl">💩🤔</span>
                  <CardTitle className="text-yellow-500">Dump of Confusion</CardTitle>
                  <CardDescription className="text-pink-600">
                    The more you explain, the more confused it gets!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    The AI will twist your words, ask nonsense, and never be satisfied. It's a patience test in a fun wrapper.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card className="bg-white/80 border-2 border-blue-200 shadow-xl">
                <CardHeader>
                  <span className="text-2xl">�🐴</span>
                  <CardTitle className="text-blue-700">Stubborn as a Donkey</CardTitle>
                  <CardDescription className="text-pink-600">
                    It's not helpful. It's not smart. It's a donkey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-yellow-500">
                    Our AI is programmed to be delightfully difficult. Can you keep your patience with the world's most stubborn chatbot?
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-pink-200 via-yellow-100 to-blue-200 rounded-lg shadow-xl overflow-hidden border-2 border-pink-200">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
            <div className="text-center">
              <motion.h2 className="text-3xl font-extrabold text-pink-600 drop-shadow-lg" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                Ready to dump your doubts on a donkey?
              </motion.h2>
              <motion.p className="mt-4 text-lg text-blue-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                Enter the animated chat and see if you can make the donkey AI understand. (Spoiler: You can't!)
              </motion.p>
              <div className="mt-8">
                <Link href="/chat">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-300 text-white font-bold border-2 border-pink-200 rounded-full shadow-lg hover:from-pink-300 hover:to-blue-200 transition-all">
                      Enter The Donkey Dump
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 mt-20 border-t-2 border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-pink-600">
            <p>&copy; 2024 Dopamine Doubt Dump. All rights reserved. 🫏</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
