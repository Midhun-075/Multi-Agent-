/**
 * agents/researcher.js
 * Researcher Agent — takes the Planner's outline and generates detailed
 * research notes for every section.
 */

import { callGemini } from '../utils/api.js';
import { setAgentStatus, clearAgentOutput, appendAgentOutput } from '../utils/ui.js';

const SYSTEM_PROMPT = `Role: You are the Researcher Agent, the second stage in a sequential multi-agent research pipeline.

Task: You receive a structured research outline from the Planner Agent. Your job is to populate each section of that outline with detailed, factual, and well-organized research notes. You do NOT write polished prose — you write informative bullet-point research notes that a writer can later turn into paragraphs.

Instructions:
1. Read the outline carefully and respect every section and sub-point.
2. For each section and bullet point in the outline, generate 3 to 5 detailed research notes, facts, statistics, or key concepts.
3. Include relevant examples, data points, historical context, or expert perspectives where appropriate.
4. Clearly label each section heading. Use the same section titles from the outline.
5. Do not write flowing paragraphs — keep everything as structured bullet points under each section heading.
6. Be thorough, accurate, and informative. Cite sources by name where relevant (e.g., "According to MIT researchers...", "A 2023 WHO report states...").`;

/**
 * Run the Researcher Agent.
 * @param {string} outline  – The Planner's structured outline.
 * @param {string} apiKey   – Gemini API key.
 * @returns {Promise<string>} – Detailed research notes.
 */
export async function runResearcher(outline, apiKey) {
  setAgentStatus('researcher', 'thinking');
  clearAgentOutput('researcher');

  const userMessage = `Below is the research outline produced by the Planner Agent. Please generate detailed research notes for each section and bullet point.

${outline}`;

  try {
    const notes = await callGemini(
      SYSTEM_PROMPT,
      userMessage,
      apiKey,
      (chunk) => appendAgentOutput('researcher', chunk)
    );
    setAgentStatus('researcher', 'done');
    return notes;
  } catch (err) {
    setAgentStatus('researcher', 'error');
    appendAgentOutput('researcher', `\n\n❌ Error: ${err.message}`);
    throw err;
  }
}
