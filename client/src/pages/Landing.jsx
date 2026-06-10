import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Terminal as TermIcon, AlertTriangle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [bootLogs, setBootLogs] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showAccessButton, setShowAccessButton] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  
  const rawLogs = [
    'PD-OS(tm) Version 4.09-X86',
    'Copyright (c) 1982-2026 Dept of Cybernetic Security.',
    '-------------------------------------------------------',
    'CONNECTING TO CENTRAL SURVEILLANCE FEED...',
    'ESTABLISHING SOCKET CONNECTION TO NODE: OK',
    'RESOLVING HOST CONFIGURATION: OK',
    'DECRYPTING PORTFOLIO DOSSIER PATHS...',
    'FETCHING SUBJECT METADATA: 5 CASE FILES DETECTED',
    'LOADING SKILL INDEX (EVIDENCE LOCKER): 12 ASSETS FOUND',
    'WARNING: UNAUTHORIZED DISCLOSURE SUBJECT TO HARSH PENALTIES',
    'PORTAL SECURE // LEVEL 3 CLEARANCE GRANTED'
  ];

  const fullMessage = 'AWAITING OPERATOR INPUT. DOSSIER SEARCH COMPLETED. ACCESS ARTIFACTS BELOW.';

  // Boot sequence effect
  useEffect(() => {
    if (currentLine < rawLogs.length) {
      const timer = setTimeout(() => {
        setBootLogs((prev) => [...prev, rawLogs[currentLine]]);
        setCurrentLine(currentLine + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Start typewriter for the main action text
      let charIndex = 0;
      const typeTimer = setInterval(() => {
        if (charIndex <= fullMessage.length) {
          setTypedMessage(fullMessage.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeTimer);
          setShowAccessButton(true);
        }
      }, 30);
      return () => clearInterval(typeTimer);
    }
  }, [currentLine]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-6 px-4 max-w-4xl mx-auto w-full">
      {/* Decrypting holographic interface */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#11141a]/95 border border-[#1e2430] glow-cyan rounded-lg p-6 font-mono text-xs md:text-sm text-police-cyan relative"
      >
        <div className="flex justify-between items-center pb-3 border-b border-[#1e2430] mb-4">
          <div className="flex items-center space-x-2">
            <TermIcon size={16} className="text-police-cyan animate-pulse" />
            <span className="font-bold tracking-widest uppercase">SECURE TERMINAL CONNECTION // PORT 8080</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-police-cyan animate-ping" />
            <span className="text-[10px] tracking-wider text-slate-500 uppercase">ONLINE</span>
          </div>
        </div>

        {/* Boot Logs */}
        <div className="space-y-1.5 h-64 overflow-y-auto mb-4 font-mono pr-2 border-b border-[#1e2430] pb-4 select-none">
          {bootLogs.map((log, idx) => {
            const isWarning = log.includes('WARNING');
            const isOk = log.includes('OK') || log.includes('GRANTED');
            return (
              <div 
                key={idx} 
                className={`${isWarning ? 'text-police-amber' : isOk ? 'text-emerald-400' : 'text-police-cyan'} leading-relaxed`}
              >
                <span className="text-slate-600 mr-2">&gt;</span>
                {log}
              </div>
            );
          })}
          {currentLine < rawLogs.length && (
            <span className="inline-block w-2 h-4 bg-police-cyan animate-pulse" />
          )}
        </div>

        {/* Action Typewriter Area */}
        <div className="h-10 text-slate-300 font-mono text-xs md:text-sm flex items-center">
          {currentLine >= rawLogs.length && (
            <span>
              {typedMessage}
              {typedMessage.length < fullMessage.length && (
                <span className="inline-block w-2.5 h-4 bg-police-cyan animate-pulse ml-1" />
              )}
            </span>
          )}
        </div>

        {/* Access Button Panel */}
        <div className="h-16 flex items-center justify-center mt-6">
          {showAccessButton && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
              className="px-6 py-3 bg-police-cyan text-black hover:bg-white transition-all font-bold tracking-widest text-sm rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center space-x-3 cursor-pointer"
            >
              <Shield size={16} />
              <span>ACCESS SUBJECT DOSSIER</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Cybernetic Disclaimer */}
      <div className="mt-8 flex items-center justify-center space-x-2 bg-red-950/20 border border-red-900/30 py-2.5 px-4 rounded text-red-500 max-w-lg text-center text-[10px] md:text-xs">
        <AlertTriangle size={14} className="flex-shrink-0 animate-bounce" />
        <span className="tracking-wide">
          ATTENTION: This system tracks IP addresses, location codes, and navigation metrics in real-time. Unauthorized attempts to alter database contents will trigger automated containment reports.
        </span>
      </div>
    </div>
  );
};

export default Landing;
