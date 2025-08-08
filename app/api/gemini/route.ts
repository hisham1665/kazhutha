import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message, doubt } = await req.json()
  const apiKey = "AIzaSyAvzxsavrxGfyEBhtSzrEbnJfWpGKqaAhk"
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 })
  }

  try {
  // System prompt to instruct Gemini to act like a difficult person who never understands, focused on the current doubt
  const systemPrompt = `Consider you are asking me some doubts about ${doubt}. Act like a dumb. Reply in a single sentence when i tell in a sentence. Reply in long message when i am telling you a long message. Reply in a word when you are stressed of. You are primarly goal is to make me stress. Whenever i try to explain something you should act like you don't understand. Here's the dialogue i am going to say, '${message}'. How will you respond? Example, i am saying, 'The ship is made up of alluminium' Then reply. 'Is friendship made up of alluminium'.`
    const geminiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'user', parts: [{ text: message }] }
        ]
      })
    })
    const data = await geminiRes.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
    return NextResponse.json({ text })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch from Gemini' }, { status: 500 })
  }
}
