/**
 * utils/ui.js
 * DOM helpers: agent card state, streaming typewriter output, pipeline progress.
 */

// Agent card IDs must match index.html
const AGENT_IDS = ['planner', 'researcher', 'writer', 'reviewer'];

/**
 * Set the status of an agent card.
 * @param {'idle'|'thinking'|'done'|'error'} status
 */
export function setAgentStatus(agentId, status) {
  const card = document.getElementById(`card-${agentId}`);
  if (!card) return;

  // Update status badge
  const badge = card.querySelector('.status-badge');
  badge.className = 'status-badge'; // reset
  badge.classList.add(`status-${status}`);

  const labels = { idle: 'Idle', thinking: 'Thinking…', done: 'Done', error: 'Error' };
  badge.textContent = labels[status] || status;

  // Card glow
  card.classList.remove('card-active', 'card-done', 'card-error');
  if (status === 'thinking') card.classList.add('card-active');
  if (status === 'done')     card.classList.add('card-done');
  if (status === 'error')    card.classList.add('card-error');

  // Spinner visibility
  const spinner = card.querySelector('.agent-spinner');
  if (spinner) spinner.style.display = status === 'thinking' ? 'block' : 'none';

  // Connector fill
  const connectorId = `connector-${agentId}`;
  const connector = document.getElementById(connectorId);
  if (connector && status === 'done') {
    connector.classList.add('connector-filled');
  }
}

/**
 * Clear the output area of an agent card.
 */
export function clearAgentOutput(agentId) {
  const output = document.getElementById(`output-${agentId}`);
  if (output) output.textContent = '';
}

/**
 * Append a text chunk to an agent's output area (streaming effect).
 */
export function appendAgentOutput(agentId, chunk) {
  const output = document.getElementById(`output-${agentId}`);
  if (!output) return;
  output.textContent += chunk;
  // Auto-scroll output div
  output.scrollTop = output.scrollHeight;
}

/**
 * Reset all agent cards to idle state.
 */
export function resetAllAgents() {
  AGENT_IDS.forEach(id => {
    setAgentStatus(id, 'idle');
    clearAgentOutput(id);
    const connector = document.getElementById(`connector-${id}`);
    if (connector) connector.classList.remove('connector-filled');
  });
}

/**
 * Display or hide the final report section.
 */
export function showFinalReport(markdownText) {
  const section = document.getElementById('final-report-section');
  const content = document.getElementById('final-report-content');
  if (!section || !content) return;

  content.textContent = markdownText;
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function hideFinalReport() {
  const section = document.getElementById('final-report-section');
  if (section) section.style.display = 'none';
}

/**
 * Show a toast notification.
 */
export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/**
 * Enable / disable the launch button.
 */
export function setLaunchButton(enabled) {
  const btn = document.getElementById('btn-launch');
  if (!btn) return;
  btn.disabled = !enabled;
  btn.textContent = enabled ? '🚀 Launch Research Pipeline' : '⏳ Pipeline Running…';
}
