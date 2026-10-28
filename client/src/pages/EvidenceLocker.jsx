import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FileText, Pin, ExternalLink, Github, Tag, Cpu, RefreshCw, AlertTriangle } from 'lucide-react';
import { useDossier } from '../context/DossierContext';
import { handcuffsBase64 } from '../assets/handcuffsBase64';

const EvidenceLocker = () => {
  const { dossier } = useDossier();
  const { skills, vitals, cases } = dossier;
  const [selectedCase, setSelectedCase] = useState(null);

  return (
    <div className="flex-1 flex flex-col p-1 max-w-7xl mx-auto w-full">
      
      {/* Page Header */}
      <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-6">
        <FileText className="text-police-cyan" size={20} />
        <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">EVIDENCE WALL // INVESTIGATION TARGETS</h2>
      </div>

      {/* Dynamic Corkboard / Investigation Wall */}
      <div className="relative w-full bg-[#0a0b0e] border border-police-cardBorder rounded-2xl p-4 md:p-6 overflow-hidden min-h-[1100px] lg:min-h-[920px] shadow-2xl">
        
        {/* Board Background Patterns (Tactical Blueprints) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ff1744_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* =======================================================
            SVG ANIMATED RED YARN CONNECTION LAYER (Desktop Only)
            ======================================================= */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
          <defs>
            <linearGradient id="yarn-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1744" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffb300" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow-effect" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff1744" floodOpacity="0.6" />
            </filter>
          </defs>
          
          {/* Connection paths (Yarns) */}
          <motion.path 
            d="M 170 120 Q 250 80 430 130"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2.5" 
            strokeDasharray="5 5"
            className="filter drop-shadow-[0_0_2px_#ff1744]"
            style={{ strokeDashoffset: 10, animation: 'yarn-flow 8s linear infinite' }}
          />
          <motion.path 
            d="M 120 280 L 100 450"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className="filter drop-shadow-[0_0_2px_#ff1744]"
            style={{ strokeDashoffset: 5, animation: 'yarn-flow 6s linear infinite' }}
          />
          <motion.path 
            d="M 280 470 Q 550 500 800 240"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2.5" 
            strokeDasharray="6 4"
            className="filter drop-shadow-[0_0_2px_#ff1744]"
            style={{ strokeDashoffset: 15, animation: 'yarn-flow 12s linear infinite' }}
          />
          <motion.path 
            d="M 680 180 Q 750 140 850 120"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2" 
            className="filter drop-shadow-[0_0_2px_#ff1744]"
          />
          <motion.path 
            d="M 980 180 Q 980 280 980 410"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2" 
            strokeDasharray="3 3"
            className="filter drop-shadow-[0_0_2px_#ff1744]"
            style={{ strokeDashoffset: 3, animation: 'yarn-flow 4s linear infinite' }}
          />
          <motion.path 
            d="M 220 540 Q 250 630 350 690"
            fill="none" 
            stroke="url(#yarn-glow)" 
            strokeWidth="2" 
            strokeDasharray="5 5"
            className="filter drop-shadow-[0_0_2px_#ff1744]"
            style={{ strokeDashoffset: 8, animation: 'yarn-flow 7s linear infinite' }}
          />
        </svg>

        <style>{`
          @keyframes yarn-flow {
            to {
              stroke-dashoffset: -100;
            }
          }
        `}</style>

        {/* ==========================================
            BOARD ELEMENTS (Absolute on Desktop, Flow on Mobile)
            ========================================== */}
        <div className="relative z-10 grid grid-cols-1 lg:block gap-6">

          {/* 1. SUSPECT POLAROID POSTER (Top Left) */}
          <div className="lg:absolute lg:left-4 lg:top-4 w-full lg:w-[280px] bg-[#f8f9fa] text-black p-4 rounded-sm shadow-2xl rotate-[-2deg] flex flex-col items-center border border-slate-300">
            {/* Visual pushpin */}
            <Pin className="text-[#ff1744] absolute -top-3 left-1/2 transform -translate-x-1/2 rotate-12 drop-shadow" size={24} fill="#ff1744" />
            
            {/* Wanted header */}
            <div className="w-full bg-[#111] text-white font-bold text-center py-1 text-[11px] tracking-widest uppercase mb-3 font-title">
              WANTED DOSSIER
            </div>

            {/* Photo frame */}
            <div className="relative w-44 h-44 bg-slate-200 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden grayscale contrast-125 sepia">
              <img 
                src="/suspect.jpg" 
                alt="Subject Mugshot" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div class="text-[10px] text-slate-400 font-mono text-center px-2">MUGSHOT UNVERIFIED // NO STATIC RESOURCE</div>';
                }}
              />
            </div>

            <div className="text-center font-mono mt-3 w-full border-t border-dashed border-slate-300 pt-2.5">
              <p className="font-bold text-xs uppercase tracking-wide">{vitals.suspectName}</p>
              <p className="text-[9px] text-red-600 font-bold uppercase tracking-wider mt-0.5">Threat: {vitals.threatLevel}</p>
            </div>
            
            {/* Fingerprint indicator stamp */}
            <div className="absolute bottom-4 right-4 border-2 border-red-500 text-red-500 font-bold px-1.5 py-0.5 text-[10px] tracking-widest font-title uppercase rotate-[-12deg] select-none pointer-events-none animate-pulse">
              WANTED
            </div>
          </div>

          {/* 2. CONFISCATED HANDCUFFS EVIDENCE (Top Center) */}
          <div className="lg:absolute lg:left-[320px] lg:top-4 w-full lg:w-[460px] bg-police-card border border-police-cardBorder rounded-lg p-4 flex flex-col shadow-2xl relative">
            <Pin className="text-[#00f0ff] absolute -top-3 left-1/4 transform -translate-x-1/2 rotate-[-6deg] drop-shadow" size={20} fill="#00f0ff" />
            
            <div className="flex items-center justify-between border-b border-[#1e2430] pb-2 mb-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-police-cyan uppercase flex items-center space-x-1.5">
                <Shield size={12} className="text-police-cyan" />
                <span>CONFISCATED ARTIFACT #EVID-HC-99</span>
              </span>
              <span className="text-[8px] bg-red-950/40 border border-red-500/30 text-police-red px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                ACTIVE MONITOR
              </span>
            </div>

            {/* Handcuffs Visual - Clean with black background and no text */}
            <div className="w-full h-[220px] relative bg-black rounded border border-slate-900 overflow-hidden flex items-center justify-center p-2">
              <div className="relative w-full h-full bg-black rounded">
                <div className="split relative w-full h-full">
                  <div className="split-half left absolute top-0 w-full h-full" style={{ backgroundImage: `url(${handcuffsBase64})` }}></div>
                  <div className="split-half right absolute top-0 w-full h-full" style={{ backgroundImage: `url(${handcuffsBase64})` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-2.5 text-[8px] font-mono text-slate-500 flex justify-between">
              <span>SCANNER NODE: ONLINE</span>
              <span className="text-police-cyan animate-pulse">● SWING ARTIFACT MONITOR ACTIVE</span>
            </div>
          </div>

          {/* 3. CASE INVESTIGATION FOLDERS (Right Column) */}
          <div className="lg:absolute lg:right-4 lg:top-4 w-full lg:w-[350px] flex flex-col space-y-4">
            
            <div className="bg-[#3b2d24]/40 border border-[#4a3a2f] p-2.5 rounded text-[10px] font-mono text-slate-400 flex items-center space-x-2">
              <Cpu size={14} className="text-police-amber" />
              <span>CLASSIFIED FILES // DOSSIER REGISTRY</span>
            </div>

            {cases.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCase(project)}
                className="w-full bg-[#dbca9e] text-[#4a3b2b] p-4 rounded-r-lg border-l-8 border-[#a18c5e] shadow-lg cursor-pointer relative flex flex-col justify-between group min-h-[120px]"
              >
                {/* Visual pin */}
                <Pin className="text-[#a855f7] absolute -top-2 left-6 transform rotate-45 drop-shadow" size={16} fill="#a855f7" />

                <div className="absolute top-2 right-2 text-[#8c784f] group-hover:text-black transition-colors">
                  <FileText size={18} />
                </div>

                <div>
                  <span className="text-[8px] font-bold font-mono tracking-widest text-[#7a653c] uppercase block">
                    {project.number}
                  </span>
                  <h4 className="text-sm font-bold font-title uppercase tracking-wide mt-0.5">
                    {project.title}
                  </h4>
                  <p className="text-[10px] text-[#635132] font-semibold tracking-wider font-mono uppercase mt-0.5">
                    {project.subtitle}
                  </p>
                </div>

                <div className="mt-3 flex justify-between items-center text-[9px] font-mono border-t border-[#c4b387] pt-2">
                  <span className="font-bold text-[#8a252c]">{project.status}</span>
                  <span className="underline group-hover:text-black">INSPECT DETAILS &gt;</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 4. DYNAMIC NEON STICKY NOTES (Center Left) */}
          {/* Sticky Note 1: Yellow (Aliases/Vitals) */}
          <div className="lg:absolute lg:left-6 lg:top-[380px] w-full lg:w-[220px] bg-[#ffff88] text-black p-4 shadow-xl rotate-[-3deg] relative font-mono text-[11px] leading-relaxed border border-yellow-300">
            <Pin className="text-[#ffb300] absolute -top-2 left-1/2 transform -translate-x-1/2 rotate-12 drop-shadow" size={16} fill="#ffb300" />
            <h5 className="font-bold text-[10px] border-b border-black/20 pb-1 mb-2 uppercase text-center tracking-wide">METRIC ANNOTATIONS</h5>
            <p className="mb-1"><strong>SUBJECT ID:</strong> {vitals.suspectId}</p>
            <p className="mb-1"><strong>ALIASES:</strong> {vitals.aliases}</p>
            <p className="mb-1"><strong>START YEAR:</strong> {vitals.yearStarted}</p>
            <p className="mb-1"><strong>BIOMETRICS:</strong> {vitals.biometricMatch}</p>
          </div>

          {/* Sticky Note 2: Pink (Threat Alert) */}
          <div className="lg:absolute lg:left-[250px] lg:top-[390px] w-full lg:w-[240px] bg-[#ffb3d9] text-black p-4 shadow-xl rotate-[2deg] relative font-mono text-[11px] leading-relaxed border border-pink-300">
            <Pin className="text-[#ff1744] absolute -top-2 left-1/3 transform -translate-x-1/2 rotate-[-12deg] drop-shadow" size={16} fill="#ff1744" />
            <h5 className="font-bold text-[10px] border-b border-black/20 pb-1 mb-2 uppercase text-center tracking-wide">LOCATION INTEL</h5>
            <p className="mb-2"><strong>CURRENT SECTOR:</strong></p>
            <p className="font-bold text-[13px] text-red-700 uppercase mb-2 animate-pulse">{vitals.location}</p>
            <p className="text-[10px] text-slate-600 border-t border-black/10 pt-1 leading-normal">
              Subject operates dynamic web nodes within sub-saharan ARPANET hubs.
            </p>
          </div>

          {/* Sticky Note 3: Cyan (System logs) */}
          <div className="lg:absolute lg:left-[515px] lg:top-[365px] w-full lg:w-[250px] bg-[#e6ffff] text-black p-4 shadow-xl rotate-[-1deg] relative font-mono text-[11px] leading-relaxed border border-cyan-200">
            <Pin className="text-[#00f0ff] absolute -top-2 left-2/3 transform -translate-x-1/2 rotate-45 drop-shadow" size={16} fill="#00f0ff" />
            <h5 className="font-bold text-[10px] border-b border-black/20 pb-1 mb-2 uppercase text-center tracking-wide">TACTICAL AUDIT FEED</h5>
            <p className="leading-tight mb-1 text-[10px]">
              &gt; Socket feed initialized...
            </p>
            <p className="leading-tight mb-1 text-[10px]">
              &gt; Compile check: <span className="text-emerald-700 font-bold">STABLE</span>
            </p>
            <p className="leading-tight mb-1 text-[10px]">
              &gt; Active monitoring nodes connected to Bahir Dar servers.
            </p>
          </div>

          {/* 5. SEALED EVIDENCE BAGS / SKILLS (Bottom Grid) */}
          <div className="lg:absolute lg:top-[570px] lg:left-4 lg:right-4 w-full">
            <div className="border-t border-[#1e2430]/60 pt-4 mb-4 flex items-center space-x-2">
              <span className="text-xs font-mono font-bold tracking-widest text-police-amber uppercase">
                SEALED EVIDENCE REGISTRY // COGNITIVE WEAPONRY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                  className="bg-police-card border border-police-cardBorder rounded-lg flex flex-col relative overflow-hidden group shadow-lg glow-amber p-4"
                >
                  {/* Visual Pushpin */}
                  <Pin className="text-police-amber absolute -top-1 left-4 transform rotate-12 drop-shadow z-10" size={12} fill="#ffb300" />
                  
                  {/* Sealed Evidence Red Tape */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-red-700/80 border-b border-red-800 text-[8px] text-white flex items-center justify-center font-bold tracking-widest uppercase select-none">
                    SEALED EVIDENCE DO NOT OPEN
                  </div>

                  {/* Evidence Tag Header */}
                  <div className="mt-2 flex justify-between items-center text-[10px] text-slate-500 font-mono border-b border-[#1e2430] pb-2">
                    <span className="text-police-amber font-semibold">{skill.bagId}</span>
                    <span>DEP: CYBER-NETS</span>
                  </div>

                  {/* Barcode representation */}
                  <div className="mt-2 text-center text-slate-400 font-mono text-[10px] select-none tracking-tighter opacity-80 leading-none">
                    ||||| | || |||| | | ||||| | |||
                    <div className="text-[7px] tracking-widest mt-0.5">{skill.bagId}-AUDIT</div>
                  </div>

                  {/* Skill Details */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white font-title tracking-wide uppercase">
                        {skill.name}
                      </h3>
                      <p className="text-[9px] text-police-cyan font-semibold tracking-wider uppercase mt-0.5">
                        {skill.category}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono mt-3 leading-relaxed">
                        {skill.notes}
                      </p>
                    </div>

                    {/* Progress bars & Recovery info */}
                    <div className="mt-4 pt-3 border-t border-[#1e2430]/60 space-y-2">
                      <div>
                        <div className="flex justify-between text-[9px] font-mono text-slate-500 mb-1">
                          <span>CHARGE RATIO</span>
                          <span className="text-police-cyan font-bold">{skill.level}</span>
                        </div>
                        <div className="w-full bg-black/60 h-1.5 rounded-full overflow-hidden border border-slate-900">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: skill.level }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="bg-police-cyan h-full shadow-[0_0_8px_#00f0ff]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>CASE REF:</span>
                        <span className="text-slate-300 font-semibold">{skill.caseRef}</span>
                      </div>
                      
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>RECOVERED:</span>
                        <span className="text-slate-300 font-semibold">{skill.recovered}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Expanded Folder Case Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#ede2c4] border-2 border-[#8c784f] rounded-lg overflow-hidden flex flex-col font-mono text-xs md:text-sm text-slate-800 relative max-h-[85vh] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Folder tab accent header */}
              <div className="bg-[#a18c5e] text-black font-bold px-4 py-2.5 flex justify-between items-center font-title tracking-widest text-sm uppercase border-b border-[#8c784f]">
                <div className="flex items-center space-x-2 text-black">
                  <Shield size={16} />
                  <span>DOSSIER RECORD: {selectedCase.number}</span>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="hover:text-red-950 font-bold transition-colors cursor-pointer text-base font-sans"
                >
                  [X]
                </button>
              </div>

              {/* Dossier contents */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="border-b border-[#c4b387] pb-4">
                  <h3 className="text-2xl font-bold font-title text-black tracking-wide uppercase">{selectedCase.title}</h3>
                  <p className="text-red-800 font-bold tracking-widest uppercase text-xs mt-1">{selectedCase.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-black/5 border border-[#c4b387] p-3 rounded">
                  <div>
                    <span className="text-[#7a653c] font-bold block uppercase text-[10px]">CASE STATUS:</span>
                    <span className="text-black font-bold text-sm">{selectedCase.status}</span>
                  </div>
                  <div>
                    <span className="text-[#7a653c] font-bold block uppercase text-[10px]">SUBJECT ROLE:</span>
                    <span className="text-black font-bold text-sm">{selectedCase.role}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[#7a653c] font-bold uppercase tracking-wider mb-2 flex items-center">
                    <span className="border-b border-[#c4b387] w-full pr-2">Case Narrative // Summary</span>
                  </h4>
                  {/* Clean readable paragraph inside modal */}
                  <p className="text-slate-800 leading-relaxed font-sans text-xs md:text-sm">
                    {selectedCase.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-[#7a653c] font-bold uppercase tracking-wider mb-2 flex items-center">
                    <span className="border-b border-[#c4b387] w-full pr-2">Used System Artifacts // Tech Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedCase.tech.map((t) => (
                      <span key={t} className="flex items-center space-x-1 bg-black/5 border border-[#c4b387] text-slate-800 px-2 py-0.5 rounded text-xs font-semibold">
                        <Tag size={10} className="text-red-800 mr-1" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="bg-black/10 border-t border-[#c4b387] p-4 flex flex-col sm:flex-row justify-end items-center gap-3">
                <a 
                  href={selectedCase.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2 border border-slate-600 hover:border-black text-slate-700 hover:text-black font-bold tracking-wider rounded flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs font-mono"
                >
                  <Github size={14} />
                  <span>INSPECT CODEBASE</span>
                </a>
                <a 
                  href={selectedCase.demo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-red-800 hover:bg-red-950 text-white font-bold tracking-wider rounded flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs font-mono shadow"
                >
                  <ExternalLink size={14} />
                  <span>TRACE DEPLOYMENT</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EvidenceLocker;
