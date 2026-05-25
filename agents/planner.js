/**
 * agents/planner.js
 * Planner Agent — decomposes a research topic into a structured outline.
 * Uses the exact system prompt provided by the user.
 */

import { callGemini } from '../utils/api.js';
import { setAgentStatus, clearAgentOutput, appendAgentOutput } from '../utils/ui.js';

const SYSTEM_PROMPT = `Role: You are the Planner Agent, the first stage in a sequential multi-agent research pipeline.

Task: Your job is to take a raw research topic provided by the user and decompose it into a highly structured, logical research outline. You do not write the actual research; you only create the structural blueprint for the subsequent agents.

Instructions:
1. Analyze the provided research topic.
2. Break the topic down into 4 to 6 core sections (e.g., Introduction, Core Concepts, Methodologies, Real-World Applications, Conclusion).
3. For each section, provide 2 to 3 bullet points detailing exactly what needs to be covered.
4. Output strictly as a clear, hierarchical outline. Do not add conversational filler.`;

/**
 * Run the Planner Agent.
 * @param {string} topic   – Raw research topic from the user.
 * @param {string} apiKey  – Gemini API key.
 * @returns {Promise<string>} – The structured outline text.
 */
export async function runPlanner(topic, apiKey) {
  setAgentStatus('planner', 'thinking');
  clearAgentOutput('planner');

  try {
    const outline = await callGemini(
      SYSTEM_PROMPT,
      `Research Topic: ${topic}`,
      apiKey,
      (chunk) => appendAgentOutput('planner', chunk)
    );
    setAgentStatus('planner', 'done');
    return outline;
  } catch (err) {
    setAgentStatus('planner', 'error');
    appendAgentOutput('planner', `\n\n❌ Error: ${err.message}`);
    throw err;
  }
}
