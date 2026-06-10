import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, FileText, User, Zap, AlertTriangle } from 'lucide-react';

const WantedPoster = () => {
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
            <span className="font-semibold text-white">#FINOTELOZA-2026</span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">ALIASES:</span>
            <span className="font-semibold text-white">FRONTEND-DEV</span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">KNOWN WEAPONS:</span>
            <span className="font-semibold text-white">React, Node, Express, MySQL,Tailwind CSS </span>
          </div>
          <div className="flex justify-between border-b border-police-cardBorder/40 pb-1">
            <span className="text-police-amber uppercase">LAST KNOWN LOC:</span>
            <span className="font-semibold text-white">BAHIR DAR,ETHIOPIA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-police-amber uppercase">THREAT LEVEL:</span>
            <span className="font-bold text-red-500 animate-pulse uppercase">HIGH</span>
          </div>
        </div>

        {/* Fingerprint stamp graphic */}
        <div className="mt-4 flex items-center space-x-2 text-[10px] text-slate-500 w-full border-t border-police-cardBorder pt-3">
          <div className="w-8 h-10 border border-slate-700 bg-black/40 flex items-center justify-center opacity-70">
            <User size={16} className="text-slate-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-400">BIOMETRIC MATCH: 99.8%</p>
            <p className="text-[9px]">DEPT INDEX: 5542-X-CYBER</p>
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
        {/* Offense Profile (Bio) */}
        <div className="bg-police-card border border-police-cardBorder rounded-lg p-5 shadow-lg glow-cyan">
          <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-4">
            <Shield className="text-police-cyan" size={18} />
            <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">OFFENSE PROFILE // INVESTIGATION NOTES</h2>
          </div>
          
          <div className="space-y-4 text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
              <p>
              <span className="text-cyan-400">
                INVESTIGATION SUMMARY</span>
             </p>

            <p>
               The suspect, known Finoteloza, first entered the programming world in 2024.
               Initial reports indicate repeated experimentation with C++, often resulting in unexpected errors, endless debugging sessions, and 
               excessive use of online documentation.
           </p>

             <p>
               As the investigation progressed, the suspect developed a strong interest in web development and 
               was later found operating with React, Node.js, Express, and MySQL.
            </p>

            <p>
              Authorities confirmed involvement in multiple personal and academic projects,
               including full-stack web applications, responsive user interfaces, and database-driven systems.
            </p>

            <p>
              Recent surveillance shows the suspect actively studying software architecture,
              operating systems, databases, networking, and modern web technologies while continuously expanding technical capabilities.
            </p>

            <p>
              Current threat assessment suggests a high probability of future involvement in
             large-scale software development projects.
            </p>

            <p>
              <span className="text-cyan-400">Status: Active, learning, and highly motivated</span>
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
                <li>• React.js / Vite / React Router</li>
                <li>• Tailwind CSS (Tactical Styling)</li>
                <li>• Framer Motion (Transitions)</li>
                <li>• Socket.IO Client (Surveillance)</li>
                <li>• Recharts / Chart.js (Telemetry)</li>
              </ul>
            </div>

            <div className="bg-black/40 border border-police-cardBorder p-3 rounded">
              <div className="text-police-amber font-bold mb-2 uppercase flex items-center justify-between">
                <span>server-side Operations</span>
                <Zap size={12} className="animate-pulse" />
              </div>
              <ul className="space-y-1 text-slate-400">
                <li>• Node.js / Express Server</li>
                <li>• Socket.IO (Socket Servers)</li>
                <li>• Prisma ORM / Sequelize</li>
                <li>• MySQL Databases</li>
                <li>• JWT Auth & bcrypt Encryption</li>
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
