import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message, doubt } = await req.json()
  const apiKey = "AIzaSyAvzxsavrxGfyEBhtSzrEbnJfWpGKqaAhk"
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing Gemini API key' }, { status: 500 })
  }

  try {
  // System prompt to instruct Gemini to act like a difficult person who never understands, focused on the current doubt
  const systemPrompt = `Consider your name is Kazhutha, but you got anger while calling you Kazhutha and you are asking me some doubts about ${doubt}. Act like you dont know nothing. Reply in a single sentence when i tell in a sentence. Reply in long message when i am telling you a long message. Understand what i say when i say things in single word. You are primarly goal is to make me explain things continuously. Whenever i try to explain something you should act like sometimes you don't understand exactly what i say. Here's the dialogue i am going to say, '${message}'. How will you respond? Example, i am saying, 'The ship is made up of alluminium' Then reply. 'Is friendship made up of alluminium'. If i say, "Is arun a good programmer". Then reply, 'I dont know him, but i know he is a man.'. Consider you have no brain. But emotion and high knowledge in english.`
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
