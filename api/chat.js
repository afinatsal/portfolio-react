// POST /api/chat
// Vercel serverless function. Keeps the Gemini API key server-side (env
// GEMINI_API_KEY) and answers using the portfolio knowledge base in
// src/chatbot (persona + knowledge). Request body:
//   { question: string, history?: [{role: 'user'|'assistant', content: string}], lang?: 'id'|'en'|'zh'|'ja' }
import { readFileSync } from 'node:fs'

const PERSONA = readFileSync(new URL('../src/chatbot/persona.md', import.meta.url), 'utf8')
const KNOWLEDGE = readFileSync(new URL('../src/chatbot/knowledge.md', import.meta.url), 'utf8')

const SYSTEM = `${PERSONA}\n\n<knowledge_base>\n${KNOWLEDGE}\n</knowledge_base>`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' })
    return
  }

  let question, history, lang
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    question = String(data.question || '').trim()
    history = Array.isArray(data.history) ? data.history : []
    lang = ['id', 'en', 'zh', 'ja'].includes(data.lang) ? data.lang : 'id'
  } catch (e) {
    res.status(400).json({ error: 'Invalid request body' })
    return
  }

  if (!question) {
    res.status(400).json({ error: 'question is required' })
    return
  }

  const contents = history
    .map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: String(m.content || '') }] }))
    .concat([{ role: 'user', parts: [{ text: `[lang: ${lang}]\n${question}` }] }])
    .filter(m => m.parts[0].text)

  const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`

  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 900 },
      }),
    })

    if (!r.ok) {
      const err = await r.text().catch(() => '')
      res.status(502).json({ error: `Gemini API error ${r.status}: ${err}` })
      return
    }

    const data = await r.json()
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim() || ''
    if (!text) {
      res.status(502).json({ error: 'Empty response from Gemini' })
      return
    }
    res.status(200).json({ text })
  } catch (e) {
    res.status(502).json({ error: 'Failed to reach Gemini: ' + (e && e.message) })
  }
}
