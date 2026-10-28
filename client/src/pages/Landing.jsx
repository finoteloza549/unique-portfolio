import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Play, AlertTriangle } from 'lucide-react';
import { useDossier } from '../context/DossierContext';
import { handcuffsBase64 } from '../assets/handcuffsBase64';

const Landing = () => {
  const navigate = useNavigate();
  const { dossier } = useDossier();
  const { vitals } = dossier;
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    // Show the security access notice after the handcuffs swing apart (1.5 seconds)
    const timer = setTimeout(() => {
      setShowNotice(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4 py-8 min-h-[85vh] select-none">
      
      {/* Centered swinging handcuffs with pure black background and no text */}
      <div className="w-full max-w-md bg-black border border-[#4a4d52]/60 rounded-2xl p-6 shadow-2xl relative mb-6">
        <div className="relative w-full aspect-[708/397] overflow-hidden bg-black rounded-lg">
          <div className="split relative w-full h-full">
            <div className="split-half left absolute top-0 w-full h-full" style={{ backgroundImage: `url(${handcuffsBase64})` }}></div>
            <div className="split-half right absolute top-0 w-full h-full" style={{ backgroundImage: `url(${handcuffsBase64})` }}></div>
          </div>
        </div>
      </div>

      {/* Security notice - Fades in dynamically with bold, legible typography */}
      <AnimatePresence>
        {showNotice && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center space-y-6"
          >
            <div className="bg-[#11141a] border-2 border-police-cyan rounded-xl p-8 shadow-[0_0_30px_rgba(0,240,255,0.2)] max-w-lg mx-auto crisp-card">
              <div className="flex items-center justify-center space-x-2 border-b border-police-cyan/40 pb-3 mb-6">
                <Shield className="text-police-cyan animate-pulse" size={20} />
                <span className="font-mono font-black text-police-cyan tracking-widest text-[11px] uppercase">
                  METROPOLITAN POLICE DEPARTMENT
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-title font-black text-white uppercase tracking-wider leading-snug mb-5">
                CONFIDENTIAL INVESTIGATION
              </h2>
              
              <div className="text-slate-200 text-sm md:text-base font-sans font-extrabold leading-relaxed space-y-4 text-center">
                <p>Welcome to the Police Investigation Database.</p>
                <p>Inside, you'll find the complete case file of a developer known for creating responsive websites, full-stack applications, and solving technical challenges.</p>
                <p>Every section contains evidence of projects, technical skills, and development experience.</p>
                <p className="text-police-cyan font-black pt-2 tracking-wide uppercase">Proceed to begin your investigation.</p>
              </div>
            </div>

            {/* Entry Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/about')}
              className="px-10 py-4 bg-police-cyan hover:bg-white text-black font-title font-black tracking-widest text-xs rounded transition-all cursor-pointer uppercase shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center space-x-2.5 mx-auto border-none focus:outline-none"
            >
              <Play size={12} fill="currentColor" />
              <span>BEGIN INVESTIGATION</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cybernetic Disclaimer */}
      <div className="w-full mt-8 flex items-center justify-center space-x-2 bg-red-950/20 border border-red-900/30 py-2.5 px-4 rounded text-red-500 text-center text-[10px]">
        <AlertTriangle size={12} className="flex-shrink-0 animate-bounce" />
        <span className="tracking-wide font-mono uppercase">
          ATTENTION: ALL CONNECTIONS AND ROUTE HOPS LOGGED FOR COMPLIANCE MONITORING.
        </span>
      </div>
    </div>
  );
};

export default Landing;
