/**
 * utils/api.js
 * Gemini REST API client with streaming (Server-Sent Events) support.
 */

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODEL = 'gemini-2.0-flash';

/**
 * Call Gemini and stream the response text token-by-token.
 * @param {string} systemPrompt  – The agent's system instruction.
 * @param {string} userMessage   – The user / context input.
 * @param {string} apiKey        – Gemini API key.
 * @param {function} onChunk     – Called with each text chunk as it arrives.
 * @returns {Promise<string>}    – The full assembled response text.
 */
export async function callGemini(systemPrompt, userMessage, apiKey, onChunk = null) {
  const url = `${GEMINI_BASE}/${MODEL}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    let errJson;
    try { errJson = JSON.parse(errText); } catch { errJson = null; }
    const message = errJson?.error?.message || errText || `HTTP ${response.status}`;
    throw new Error(`Gemini API error: ${message}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // SSE lines come as "data: {...}\n\n"
    const lines = buffer.split('\n');
    buffer = lines.pop(); // keep incomplete last line

    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const jsonStr = line.slice(5).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;

      try {
        const parsed = JSON.parse(jsonStr);
        const chunk = parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        if (chunk) {
          fullText += chunk;
          if (onChunk) onChunk(chunk);
        }
      } catch {
        // malformed SSE chunk — skip
      }
    }
  }

  return fullText;
}
