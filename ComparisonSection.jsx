import React from 'react';

const ComparisonRow = ({ label, existing, proposed, existingIcon, proposedIcon, isLast }) => (
  <div className={`grid grid-cols-3 gap-4 md:gap-6 items-center p-4 md:p-5 transition-all duration-300 hover:bg-white/[0.03] group ${isLast ? '' : 'border-b border-white/5'}`}>
    {/* Label */}
    <div className="font-medium text-slate-300 text-sm md:text-base group-hover:text-white transition-colors">
      {label}
    </div>
    
    {/* Existing System */}
    <div className="flex items-center gap-2.5 text-red-400/80 text-sm md:text-base pr-4">
      <span className="text-[10px] md:text-xs opacity-80">{existingIcon}</span>
      <span>{existing}</span>
    </div>
    
    {/* Proposed System (Highlighted) */}
    <div className="flex items-center gap-2.5 text-white font-semibold text-sm md:text-base relative border-l-2 border-transparent pl-4 transition-all duration-300 group-hover:border-cyan-400">
      <span className="text-cyan-400 text-[12px] md:text-sm drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
        {proposedIcon}
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        {proposed}
      </span>
      {/* Subtle hover glow on the proposed column */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/0 to-transparent opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300" />
    </div>
  </div>
);

const ComparisonSection = () => {
  const data = [
    { label: 'Research Approach', existing: 'Manual Search', proposed: 'Multi-Agent Pipeline', existingIcon: '✖', proposedIcon: '🧠' },
    { label: 'Speed', existing: 'Days or Weeks', proposed: 'Minutes', existingIcon: '✖', proposedIcon: '⚡' },
    { label: 'Accuracy', existing: 'Prone to bias', proposed: 'Fact-checked & Reviewed', existingIcon: '✖', proposedIcon: '✔' },
    { label: 'Automation', existing: 'Low (User driven)', proposed: 'Fully Autonomous', existingIcon: '✖', proposedIcon: '✔' },
    { label: 'Scalability', existing: 'Limited by time', proposed: 'Infinite Parallelism', existingIcon: '✖', proposedIcon: '⚡' },
    { label: 'Output Quality', existing: 'Inconsistent', proposed: 'Publication-Ready', existingIcon: '✖', proposedIcon: '✔' },
    { label: 'Human Effort', existing: 'High', proposed: 'Minimal (Just prompt)', existingIcon: '✖', proposedIcon: '⚡' },
    { label: 'Error Handling', existing: 'Manual debugging', proposed: 'Auto-retries & Correction', existingIcon: '✖', proposedIcon: '✔' },
    { label: 'Adaptability', existing: 'Rigid structure', proposed: 'Dynamic role assignment', existingIcon: '✖', proposedIcon: '🧠' },
  ];

  return (
    <div className="min-h-screen bg-[#07070f] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Abstract Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-700/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(168,85,247,0.15)] backdrop-blur-md">
          ✨ AI-Powered Multi-Agent System
        </div>
        
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 text-center tracking-tight">
          Why Our System is Better
        </h2>
        
        {/* Subtitle */}
        <p className="text-slate-400 text-center max-w-2xl mb-14 text-base md:text-lg leading-relaxed">
          Transforming tedious manual research into an automated, high-precision pipeline. See how the multi-agent approach completely outclasses traditional workflows in every dimension.
        </p>

        {/* Outer Glassmorphism Card Container */}
        <div className="w-full relative rounded-3xl p-[1px] overflow-hidden bg-gradient-to-b from-white/10 via-white/5 to-transparent shadow-2xl">
          <div className="w-full bg-[#0f0f1a]/80 backdrop-blur-2xl rounded-3xl p-6 md:p-10">
            
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pb-6 border-b border-white/10 items-end px-4 md:px-5">
              <div className="font-semibold text-slate-500 uppercase tracking-wider text-xs md:text-sm">
                System Feature
              </div>
              <div className="font-semibold text-red-400/70 uppercase tracking-wider text-xs md:text-sm">
                Existing System
              </div>
              
              {/* Highlighted Feature Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl rounded-lg -z-10" />
                <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 uppercase tracking-wider text-xs md:text-sm border border-cyan-400/30 bg-white/5 py-2.5 px-4 rounded-xl text-center shadow-[0_0_30px_rgba(34,211,238,0.15)] inline-block w-full backdrop-blur-md">
                  Proposed System
                </div>
              </div>
            </div>

            {/* Table Rows Container */}
            <div className="flex flex-col mt-2">
              {data.map((item, index) => (
                <ComparisonRow 
                  key={index} 
                  {...item} 
                  isLast={index === data.length - 1} 
                />
              ))}
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ComparisonSection;
