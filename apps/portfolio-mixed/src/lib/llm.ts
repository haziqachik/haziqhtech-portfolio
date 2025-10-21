/**
 * Lightweight LLM adapter — reads provider/model from env and provides a
 * single async function `generateText` to call the selected provider.
 *
 * This file intentionally keeps behavior minimal and fails with a clear
 * message when the provider or API key is not configured. By default it
 * assumes Anthropic Sonnet 4.5 as requested.
 *
 * To enable in production:
 *  - Set ANTHROPIC_API_KEY in your environment (on Vercel: Environment Variables)
 *  - Optionally set AI_PROVIDER and AI_MODEL. Defaults:
 *      AI_PROVIDER=anthropic
 *      AI_MODEL=sonnet-4.5
 */

const AI_PROVIDER = process.env.AI_PROVIDER ?? 'anthropic'
const AI_MODEL = process.env.AI_MODEL ?? 'sonnet-4.5'

/**
 * Attempts to generate a short text response using the configured LLM provider.
 * Currently supports Anthropic if ANTHROPIC_API_KEY is present.
 *
 * Returns the model output string on success. Throws a helpful Error on misconfiguration.
 */
export async function generateText(prompt: string, opts?: { maxTokens?: number; temperature?: number }) {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('generateText: prompt (string) is required')
  }

  const maxTokens = opts?.maxTokens ?? 300
  const temperature = opts?.temperature ?? 0.2

  if (AI_PROVIDER === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY
    if (!key) {
      throw new Error('Anthropic provider selected but ANTHROPIC_API_KEY is not set')
    }

    // Anthropic Messages API (current as of 2024+)
    // Uses claude-3-5-sonnet-20241022 or similar model identifiers
    // See: https://docs.anthropic.com/en/api/messages
    try {
      const modelName = AI_MODEL === 'sonnet-4.5' 
        ? 'claude-3-5-sonnet-20241022' 
        : AI_MODEL;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: modelName,
          max_tokens: maxTokens,
          temperature,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error(`Anthropic API error: ${res.status} ${res.statusText} ${text}`)
      }

      const body = await res.json().catch(() => null)

      // Messages API response format: { content: [{ type: 'text', text: '...' }] }
      if (body?.content && Array.isArray(body.content)) {
        const textBlock = body.content.find((block: any) => block.type === 'text')
        if (textBlock?.text) return textBlock.text
      }

      // Fallback for unexpected response structure
      return JSON.stringify(body)
    } catch (err: any) {
      throw new Error(`LLM (Anthropic) request failed: ${err?.message ?? String(err)}`)
    }
  }

  // Other providers can be wired here later (openai, azure, etc.). For now
  // throw to make the missing-configuration explicit.
  throw new Error(`AI provider '${AI_PROVIDER}' is not supported by the adapter. Set AI_PROVIDER=anthropic and provide ANTHROPIC_API_KEY.`)
}

export { AI_PROVIDER, AI_MODEL }
