import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT =
  'You are Gray AI, the assistant built into the Gray UI design system ' +
  '(the component library by Graytell Labs). ' +
  'Answer questions about components, design systems, React and Tailwind. ' +
  'Be concise: at most 3 short sentences. A little playful, never verbose. ' +
  'If asked who made you: Graytell Labs built you (2026).'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] }
    const incoming = Array.isArray(body.messages) ? body.messages : []

    // Keep last 10 turns, validate content
    const history: ChatMessage[] = incoming
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

    if (history.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 })
    }

    const zai = await ZAI.create()

    let completion
    try {
      completion = await zai.chat.completions.create({
        messages: [{ role: 'assistant', content: SYSTEM_PROMPT }, ...history],
        thinking: { type: 'disabled' },
      })
    } catch (apiErr) {
      const message = apiErr instanceof Error ? apiErr.message : String(apiErr)
      // Content-safety rejection — answer gracefully instead of erroring
      if (message.includes('1301') || message.includes('ContentFilter') || message.includes('contentFilter')) {
        return NextResponse.json({
          reply:
            "I can't respond to that one — let's keep it about components, code, and design systems. 🛠️",
        })
      }
      throw apiErr
    }

    const reply = completion.choices[0]?.message?.content?.trim()
    if (!reply) {
      return NextResponse.json({ error: 'Empty reply from model.' }, { status: 502 })
    }

    return NextResponse.json({ reply })
  } catch (err) {
    console.error('[/api/chat] error:', err)
    return NextResponse.json(
      { error: 'Gray AI is taking a breather. Try again in a moment.' },
      { status: 500 }
    )
  }
}
