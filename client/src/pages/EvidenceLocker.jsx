import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Tag, Award, AlertTriangle } from 'lucide-react';

const EvidenceLocker = () => {
  const skills = [
    { name: 'React.js', category: 'Frontend Weaponry', level: '90%', bagId: 'EVID-RX-701', caseRef: 'Case #001 & #002', recovered: '09-12-2021', notes: 'Primary frontend rendering engine. High risk of responsive DOM manipulation.' },
    { name: 'JavaScript / ES6', category: 'Core Arsenal', level: '95%', bagId: 'EVID-JS-102', caseRef: 'Core Framework', recovered: '04-03-2020', notes: 'Core execution script. Used extensively in async loop constructions and node contexts.' },
    { name: 'Tailwind CSS', category: 'Frontend Weaponry', level: '85%', bagId: 'EVID-TW-934', caseRef: 'Case #001 & #003', recovered: '01-15-2022', notes: 'Utility-first layout wrapper. Used to build high-definition styles with minimum payload sizes.' },
    { name: 'Node.js / Express', category: 'Backend Weaponry', level: '88%', bagId: 'EVID-ND-804', caseRef: 'Case #001 & #003', recovered: '06-20-2022', notes: 'Event-driven server framework. Handles concurrent socket pipelines.' },
    { name: 'MySQL', category: 'Database Asset', level: '80%', bagId: 'EVID-MY-202', caseRef: 'Case #002 & #003', recovered: '10-05-2022', notes: 'Relational data vault. Storing visitor metadata and communication records.' },
    { name: 'Prisma ORM', category: 'Database Asset', level: '85%', bagId: 'EVID-PR-111', caseRef: 'Case #002 & #003', recovered: '11-12-2022', notes: 'Object-Relational mapping module. Standardized query builder for database schemas.' },
    { name: 'Socket.IO', category: 'Communication Pipe', level: '90%', bagId: 'EVID-SK-555', caseRef: 'Case #001 & HQ Feed', recovered: '02-18-2023', notes: 'Bi-directional web socket client. Pushes instant surveillance metrics to HQ.' },
    { name: 'Git / Version Control', category: 'Tactical Tooling', level: '90%', bagId: 'EVID-GT-007', caseRef: 'General Audit', recovered: '02-10-2020', notes: 'Distributed ledger system. Audits version diffs and code merges.' }
  ];

  return (
    <div className="flex-1 flex flex-col p-1 max-w-6xl mx-auto w-full">
      <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-6">
        <FileText className="text-police-cyan" size={20} />
        <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">EVIDENCE LOCKER // SKILLS REGISTER</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-police-card border border-police-cardBorder rounded-lg flex flex-col relative overflow-hidden group shadow-lg glow-amber p-4"
          >
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

      <div className="mt-8 bg-police-card border border-police-cardBorder p-4 rounded-lg flex items-center space-x-3 text-xs text-slate-400 font-mono max-w-2xl">
        <Award size={18} className="text-police-amber flex-shrink-0 animate-pulse" />
        <span>
          Note: Evidence is cataloged regularly. Standard procedures mandate the audit of these skill metrics across live testbeds to verify their stability.
        </span>
      </div>
    </div>
  );
};

export default EvidenceLocker;
