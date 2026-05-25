import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Reusable SVG Icons ---
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

// --- Content Data ---
const COMPARISON_TABLE = [
  { feature: 'Research Approach', existing: 'Manual Search', proposed: 'AI Multi-Agent Pipeline', isBetter: true },
  { feature: 'Speed / Time', existing: 'Days or Weeks', proposed: 'Typically < 3 Minutes', isBetter: true },
  { feature: 'Accuracy', existing: 'Variable / Biased', proposed: 'Cross-Fact-Checked', isBetter: true },
  { feature: 'Automation Level', existing: 'User-Driven', proposed: 'Fully Autonomous', isBetter: true },
  { feature: 'Output Quality', existing: 'Raw / Inconsistent', proposed: 'Publication-Ready Draft', isBetter: true },
  { feature: 'Human Effort', existing: 'High (Laborious)', proposed: 'Minimal (Just prompt)', isBetter: true }
];

export const ComparisonPanel = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 pointer-events-auto"
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[600px] bg-[#0c0c16] border-l border-white/10 z-50 flex flex-col shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden font-sans text-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0 bg-[#121220]/80 backdrop-blur-md">
              <div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                  System Comparison
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Existing System vs Proposed Architecture
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition text-slate-400 hover:text-white bg-white/5"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Existing System Card */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-4 text-red-400">
                    <CrossIcon />
                    <h3 className="font-semibold tracking-wide uppercase text-sm">Existing System</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li><strong className="text-slate-300">Approach:</strong> Manual & Sequential</li>
                    <li><strong className="text-slate-300">Limitation:</strong> High error rate</li>
                    <li><strong className="text-slate-300">Speed:</strong> Hours to Days</li>
                    <li><strong className="text-slate-300">Accuracy:</strong> Human-dependent</li>
                  </ul>
                </div>

                {/* Proposed System Card */}
                <div className="bg-gradient-to-br from-[#1c1240] to-[#0d1c33] border border-cyan-500/30 rounded-2xl p-5 relative overflow-hidden group shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-[60px] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4 text-cyan-400">
                      <CheckIcon />
                      <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide uppercase text-sm">
                        Proposed System
                      </h3>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-300">
                      <li><strong className="text-white">Approach:</strong> AI Multi-Agent</li>
                      <li><strong className="text-white">Advantage:</strong> Self-correcting</li>
                      <li><strong className="text-white">Speed:</strong> Under 3 Minutes</li>
                      <li><strong className="text-white">Accuracy:</strong> Cross-verified</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="py-4 px-5 font-semibold text-slate-300 w-[30%]">Metric</th>
                      <th className="py-4 px-5 font-semibold text-red-300/80 w-[35%] border-l border-white/5">Existing Workflow</th>
                      <th className="py-4 px-5 font-semibold text-cyan-400 w-[35%] border-l border-white/5">Proposed System</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {COMPARISON_TABLE.map((row, idx) => (
                      <tr key={idx} className="transition-colors hover:bg-white/[0.04] group">
                        <td className="py-4 px-5 text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                          {row.feature}
                        </td>
                        <td className="py-4 px-5 text-red-400/60 line-through decoration-red-500/40 border-l border-white/5">
                          {row.existing}
                        </td>
                        <td className="py-4 px-5 border-l border-white/5 bg-gradient-to-r from-transparent to-cyan-900/5">
                          <div className="flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
                            {row.isBetter && <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"><CheckIcon /></span>}
                            {row.proposed}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Insights */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
                  <span className="text-purple-400">💡</span> Key Insights
                </h4>
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-5 text-sm text-purple-200/80 leading-relaxed">
                  <strong className="text-purple-300 block mb-1">Why this idea is better:</strong>
                  The transition to an AI-driven pipeline completely eliminates the research bottleneck. While the existing system requires constant human oversight and scales poorly, the proposed multi-agent system operates autonomously, ensuring consistent, publication-ready output in a fraction of the time.
                </div>
              </div>

            </div>

            {/* Footer / Actions */}
            <div className="p-6 border-t border-white/10 shrink-0 flex gap-4 bg-[#0c0c16]">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition text-slate-300 hover:text-white">
                <DownloadIcon />
                Export as PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 border border-transparent rounded-xl text-sm font-semibold transition text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <DownloadIcon />
                Download as PPT
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Example Wrapper Component ---
export default function ComparisonFeatureWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      {/* Simulation of UI after submitting an idea */}
      <h3 className="text-white mb-4 text-xl">Pipeline Initiated...</h3>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition backdrop-blur-md"
      >
        📊 Compare with Existing System
      </button>

      {/* The Slide-In Panel */}
      <ComparisonPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
