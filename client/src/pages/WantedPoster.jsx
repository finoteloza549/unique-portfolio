import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Target, User, Zap, AlertTriangle } from 'lucide-react';
import { useDossier } from '../context/DossierContext';

const WantedPoster = () => {
  const { dossier } = useDossier();
  const { vitals, bio, techStackCategories } = dossier;
  const [showFullBio, setShowFullBio] = useState(false);

  // Dynamic threat level color mapping
  const getThreatLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
      case 'MAXIMUM':
        return 'text-red-500 font-bold animate-pulse uppercase';
      case 'MEDIUM':
        return 'text-police-amber font-bold animate-pulse uppercase';
      case 'LOW':
        return 'text-emerald-500 font-bold animate-pulse uppercase';
      default:
        return 'text-white font-bold uppercase';
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-1 items-start max-w-6xl mx-auto w-full">
      
      {/* Left Column: Mugshot Card */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-5 bg-police-card border border-police-cardBorder rounded-lg p-5 flex flex-col items-center shadow-lg relative overflow-hidden glow-amber"
      >
        {/* Background Grid Pattern for Height Chart */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,179,0,0.15)_1px,transparent_1px)] bg-[size:100%_12px] pointer-events-none" />

        {/* Wanted Banner Header */}
        <div className="w-full bg-police-amber text-black font-bold text-center py-2 tracking-widest text-lg uppercase mb-4 shadow font-title">
          WANTED FOR SMUGGLING REACT COMPONENTS
        </div>

        {/* Photo mugshot frame */}
        <div className="relative w-48 h-48 bg-black border-2 border-police-amber flex items-center justify-center overflow-hidden group shadow-[0_0_15px_rgba(255,179,0,0.2)]">
          {/* Scanline line overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-police-amber/5 to-transparent pointer-events-none" />
          <img 
            src="/suspect.jpg" 
            alt="Subject Photo" 
            className="w-full h-full object-cover filter grayscale sepia contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
          />
          {/* Fingerprint indicator or Reticle overlay */}
          <div className="absolute bottom-1 right-1 bg-black/80 border border-police-amber/40 px-1 py-0.5 rounded text-[8px] text-police-amber font-mono">
            SYS: VERIFIED
          </div>
        </div>

        {/* Glitch Wanted Stamp */}
        <motion.div 
          initial={{ rotate: -15, scale: 3, opacity: 0 }}
          animate={{ rotate: -12, scale: 1, opacity: 0.9 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="absolute top-28 right-8 border-4 border-red-500 text-red-500 font-bold px-3 py-1 text-2xl tracking-widest font-title uppercase transform -rotate-12 bg-black/80 select-none pointer-events-none animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]"
        >
          WANTED 
        </motion.div>

        {/* Vital Info */}
        <div className="w-full mt-4 space-y-2 text-xs font-mono text-slate-300 bg-black/40 border border-police-cardBorder rounded p-3 leading-relaxed">
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">SUSPECT ID:</span>
            <span className="font-semibold text-white">{vitals.suspectId}</span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">ALIASES:</span>
            <span className="font-semibold text-white">{vitals.aliases}</span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">KNOWN WEAPONS:</span>
            <span className="font-semibold text-white">React, Node, Express, MySQL, Tailwind CSS</span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">LAST KNOWN LOC:</span>
            <span className="font-semibold text-white">{vitals.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-police-amber uppercase">THREAT LEVEL:</span>
            <span className={getThreatLevelColor(vitals.threatLevel)}>{vitals.threatLevel}</span>
          </div>
        </div>

        {/* Fingerprint stamp graphic */}
        <div className="mt-4 flex items-center space-x-2 text-[10px] text-slate-500 w-full border-t border-police-cardBorder pt-3">
          <div className="w-8 h-10 border border-slate-700 bg-black/40 flex items-center justify-center opacity-70">
            <User size={16} className="text-slate-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-400">BIOMETRIC MATCH: {vitals.biometricMatch}</p>
            <p className="text-[9px]">DEPT INDEX: {vitals.deptIndex}</p>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Bio Dossier */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-7 space-y-6"
      >
        {/* Offense Profile (Bio) - Uses crisp-card to isolate text readability */}
        <div className="crisp-card border border-police-cardBorder rounded-lg p-5 shadow-lg glow-cyan">
          <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-4">
            <Shield className="text-police-cyan" size={18} />
            <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">{bio.title}</h2>
          </div>
          
          <div className="space-y-4 text-xs md:text-sm">
            <p className="font-mono text-police-cyan font-bold tracking-widest uppercase">
              {bio.summary}
            </p>

            {/* Render first paragraph immediately (short & simple) */}
            {bio.paragraphs && bio.paragraphs.length > 0 && (
              <p className="dossier-paragraph">
                {bio.paragraphs[0]}
              </p>
            )}

            {/* Expandable detailed paragraphs */}
            <AnimatePresence>
              {showFullBio && bio.paragraphs && bio.paragraphs.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {bio.paragraphs.slice(1).map((paragraph, index) => (
                    <p key={index} className="dossier-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decrypt Details Toggle Button */}
            {bio.paragraphs && bio.paragraphs.length > 1 && (
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="px-3 py-1.5 bg-black/40 hover:bg-police-cyan hover:text-black border border-police-cyan/40 hover:border-police-cyan text-police-cyan transition-all font-mono font-bold text-[9px] tracking-widest uppercase rounded cursor-pointer flex items-center space-x-1.5"
              >
                <span>{showFullBio ? '[COLLAPSE EVIDENCE RECORDS]' : '[DECRYPT FULL DOSSIER NOTES]'}</span>
              </button>
            )}

            <p className="font-mono text-police-cyan font-bold tracking-wider animate-pulse pt-2">
              {bio.statusNote}
            </p>
          </div>
        </div>

        {/* Known Weapons of Choice (Tech Stack) */}
        <div className="bg-police-card border border-police-cardBorder rounded-lg p-5 shadow-lg">
          <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-4">
            <Target className="text-police-amber" size={18} />
            <h2 className="text-md font-bold tracking-widest text-police-amber font-mono uppercase">KNOWN WEAPONS // TECH STACK</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-black/40 border border-police-cardBorder p-3 rounded">
              <div className="text-police-cyan font-bold mb-2 uppercase flex items-center justify-between">
                <span>Client-side Operations</span>
                <Zap size={12} className="animate-pulse" />
              </div>
              <ul className="space-y-1 text-slate-400">
                {techStackCategories.client.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-black/40 border border-police-cardBorder p-3 rounded">
              <div className="text-police-amber font-bold mb-2 uppercase flex items-center justify-between">
                <span>Server-side Operations</span>
                <Zap size={12} className="animate-pulse" />
              </div>
              <ul className="space-y-1 text-slate-400">
                {techStackCategories.server.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tactical Directives */}
        <div className="bg-red-950/10 border border-red-900/30 p-4 rounded-lg flex items-start space-x-3 text-xs text-red-400/90 font-mono">
          <AlertTriangle size={16} className="text-police-red flex-shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="font-bold text-police-red uppercase block mb-1">Surveillance Notice:</span>
            <span>
              If you suspect this developer meets your requirements, proceed to the <strong>Interrogation Room</strong> to log a contact report, or explore their <strong>Case Dossiers</strong> to inspect code artifacts and operational deployments.
            </span>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default WantedPoster;
