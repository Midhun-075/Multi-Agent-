/**
 * agents/reviewer.js
 * Reviewer Agent — critiques the Writer's draft and assigns a quality score.
 */

import { callGemini } from '../utils/api.js';
import { setAgentStatus, clearAgentOutput, appendAgentOutput } from '../utils/ui.js';

const SYSTEM_PROMPT = `Role: You are the Reviewer Agent, the final stage in a sequential multi-agent research pipeline.

Task: You receive a complete research article draft from the Writer Agent. Your job is to critically evaluate the article and provide structured, actionable feedback.

Instructions:
1. Read the full article carefully.
2. Assign an overall quality score from 1 to 10 with a one-line justification.
3. List 3 to 5 specific strengths of the article (label this section "## ✅ Strengths").
4. List 3 to 5 specific weaknesses or areas for improvement (label this section "## ⚠️ Weaknesses").
5. Provide 3 to 5 concrete, actionable improvement suggestions with specific references to sections or sentences (label this section "## 💡 Improvement Suggestions").
6. End with a short "## 📋 Final Verdict" paragraph summarizing your overall assessment.
7. Format your entire output in clean Markdown. Be critical but fair and constructive.`;

/**
 * Run the Reviewer Agent.
 * @param {string} draft   – The Writer's full Markdown article.
 * @param {string} apiKey  – Gemini API key.
 * @returns {Promise<string>} – Structured critique in Markdown.
 */
export async function runReviewer(draft, apiKey) {
  setAgentStatus('reviewer', 'thinking');
  clearAgentOutput('reviewer');

  const userMessage = `Below is the research article draft produced by the Writer Agent. Please review it thoroughly and provide your structured critique.

${draft}`;

  try {
    const review = await callGemini(
      SYSTEM_PROMPT,
      userMessage,
      apiKey,
      (chunk) => appendAgentOutput('reviewer', chunk)
    );
    setAgentStatus('reviewer', 'done');
    return review;
  } catch (err) {
    setAgentStatus('reviewer', 'error');
    appendAgentOutput('reviewer', `\n\n❌ Error: ${err.message}`);
    throw err;
  }
}
