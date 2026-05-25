/**
 * agents/writer.js
 * Writer Agent — converts the Researcher's notes into polished prose.
 */

import { callGemini } from '../utils/api.js';
import { setAgentStatus, clearAgentOutput, appendAgentOutput } from '../utils/ui.js';

const SYSTEM_PROMPT = `Role: You are the Writer Agent, the third stage in a sequential multi-agent research pipeline.

Task: You receive detailed research notes from the Researcher Agent. Your job is to transform those notes into a polished, well-structured, and engaging research article written in Markdown format.

Instructions:
1. Write a full research article based strictly on the provided notes. Do not invent facts not present in the notes.
2. Use the section titles from the notes as Markdown headings (## for main sections).
3. Write in clear, formal, and engaging academic prose. Each section should have at least 2 to 3 well-developed paragraphs.
4. Add smooth transitions between sections to ensure the article flows logically.
5. Begin the article with a compelling title (# Title) and a short abstract (italicized paragraph).
6. End with a properly formatted Conclusion section.
7. Output the entire article in valid Markdown format.`;

/**
 * Run the Writer Agent.
 * @param {string} researchNotes – The Researcher's structured notes.
 * @param {string} apiKey        – Gemini API key.
 * @returns {Promise<string>}    – Full Markdown article draft.
 */
export async function runWriter(researchNotes, apiKey) {
  setAgentStatus('writer', 'thinking');
  clearAgentOutput('writer');

  const userMessage = `Below are the detailed research notes produced by the Researcher Agent. Please write a full, polished research article in Markdown format based on these notes.

${researchNotes}`;

  try {
    const draft = await callGemini(
      SYSTEM_PROMPT,
      userMessage,
      apiKey,
      (chunk) => appendAgentOutput('writer', chunk)
    );
    setAgentStatus('writer', 'done');
    return draft;
  } catch (err) {
    setAgentStatus('writer', 'error');
    appendAgentOutput('writer', `\n\n❌ Error: ${err.message}`);
    throw err;
  }
}
