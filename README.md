# 🤖 Multi-Agent Research Assistant

A browser-based **sequential multi-agent AI pipeline** that turns a single research topic into a publication-ready report. Four specialized agents — **Planner → Researcher → Writer → Reviewer** — collaborate in sequence, each feeding its output to the next, with live streaming progress and one-click export to Markdown, Word, and PowerPoint.

> No build step, no backend. Open `index.html` in a browser and go.

---

## ✨ Features

- **Four-stage agent pipeline** — each agent has a focused role and a tuned system prompt.
- **Live token streaming** — watch each agent "think" in real time as output streams in.
- **Animated pipeline UI** — status badges, spinners, and connectors light up as work flows from stage to stage.
- **Multiple export formats** — copy to clipboard, or download as Markdown (full report or article-only), Word (`.doc`), and PowerPoint (`.pptx`).
- **Automatic retry with backoff** — handles rate limits (HTTP 429) gracefully, respecting the API's suggested wait time.
- **Zero dependencies to install** — runs entirely client-side from `file://` or any static host.

---

## 🧠 The Agent Pipeline

| Stage | Agent | Role | Output |
|-------|-------|------|--------|
| 1 | 🧭 **Planner** | Decomposes the topic into a structured 4–6 section outline | Hierarchical outline |
| 2 | 🔬 **Researcher** | Populates each section with factual, detailed research notes | Bullet-point research notes |
| 3 | ✍️ **Writer** | Transforms notes into polished Markdown prose | Full research article |
| 4 | 🔍 **Reviewer** | Critiques the draft and scores its quality (1–10) | Strengths, weaknesses, suggestions, verdict |

The orchestrator then assembles the outline, article, and review into a single final report.

```
Topic ──▶ Planner ──▶ Researcher ──▶ Writer ──▶ Reviewer ──▶ Final Report
```

---

## 🚀 Getting Started

### Option 1 — Quick start (single file)

The simplest path uses the self-contained `index.html`, which has all CSS and JavaScript inlined.

```bash
git clone https://github.com/Midhun-075/Multi-Agent-.git
cd Multi-Agent-
# Open index.html directly in your browser, or serve it:
python3 -m http.server 8000
# then visit http://localhost:8000
```

Enter a research topic and click **🚀 Launch Research Pipeline**.

### Option 2 — Modular version

The repo also contains a modular ES-module build (`app.js` + `agents/` + `utils/`) that you can extend. Because it uses ES modules and `import`, it must be served over HTTP (not opened via `file://`):

```bash
python3 -m http.server 8000
```

---

## 🔑 API Keys & Configuration

This app talks directly to an **OpenAI-compatible chat completions API**. It currently supports:

- **Groq** — `https://api.groq.com/openai/v1/chat/completions`
- **OpenAI** — `https://api.openai.com/v1/chat/completions`

Provider and model are specified together as `provider:model`, for example:

```
groq:llama-3.1-8b-instant
openai:gpt-4o-mini
```

> ⚠️ **Security warning:** Never commit your API key to the repository. Provide it through an input field, environment injection, or your own backend proxy. A hardcoded key in client-side code is publicly visible to anyone who views the page source and should be revoked immediately. See [Security](#-security) below.

---

## 📁 Project Structure

```
Multi-Agent-/
├── index.html            # Self-contained single-file app (HTML + CSS + JS)
├── app.js                # Modular pipeline orchestrator (ES modules)
├── style.css             # Shared styles
├── agents/               # Per-agent logic (planner, researcher, writer, reviewer)
├── utils/                # UI helpers (toasts, status, report rendering)
├── ComparisonPanel.jsx   # React comparison components
└── ComparisonSection.jsx
```

---

## 🛠️ Tech Stack

- **Vanilla JavaScript** (ES modules + a self-contained inline build)
- **HTML5 / CSS3** with a custom dark "glassmorphism" design system
- **[marked](https://marked.js.org/)** for Markdown rendering
- **[PptxGenJS](https://gitbrent.github.io/PptxGenJS/)** for PowerPoint export
- **OpenAI-compatible LLM APIs** (Groq, OpenAI)

---

## 🔐 Security

This is a **client-side-only** application, which has important implications:

- Any API key used in the browser is **exposed to end users**. For production, route requests through a backend proxy that holds the key server-side.
- **Do not commit secrets.** If a key has ever been pushed to the repo, revoke and rotate it — git history keeps it accessible even after deletion.

---

## 🗺️ Roadmap / Ideas

- Unify the single-file (`index.html`) and modular (`app.js`) versions to avoid drift.
- Add an in-UI field for API key + provider/model selection.
- Support additional providers (Anthropic, Gemini, Ollama/local models).
- Allow editing an agent's output before passing it downstream.
- Add automated tests and a CI workflow.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss significant changes, then submit a pull request. For UI work, keep the existing design tokens (defined as CSS variables) consistent.

---

## 📄 License

No license file is currently included. Until one is added, all rights are reserved by the author. Consider adding an open-source license (e.g., MIT) to clarify usage rights.

---

*Built by [Midhun-075](https://github.com/Midhun-075) · Multi-Agent Research Pipeline*
