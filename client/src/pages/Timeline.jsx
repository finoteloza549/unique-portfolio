import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShieldAlert } from 'lucide-react';
import { useDossier } from '../context/DossierContext';

const Timeline = () => {
  const { dossier } = useDossier();
  const { incidents } = dossier;


  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-1 items-start max-w-6xl mx-auto w-full">
      {/* Sidebar stats panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-4 bg-police-card border border-police-cardBorder rounded-lg p-5 font-mono text-xs text-slate-300 space-y-4"
      >
        <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3">
          <ShieldAlert className="text-police-cyan" size={16} />
          <span className="font-bold tracking-widest text-police-cyan uppercase">SUBJECT HISTORY INDEX</span>
        </div>

        <div className="space-y-3 bg-black/40 p-3 rounded border border-police-cardBorder">
          <div>
            <span className="text-police-cyan uppercase block text-[10px]">TOTAL INCIDENT LOGS:</span>
            <span className="text-white font-bold text-lg">4 RECORDED OFFENSES</span>
          </div>
          <div>
            <span className="text-police-cyan uppercase block text-[10px]">OPERATIONAL DURATION:</span>
            <span className="text-white font-bold text-sm">2 YEARS DEPLOYED</span>
          </div>
          <div>
            <span className="text-police-cyan uppercase block text-[10px]">CURRENT LEGAL STATUS:</span>
            <span className="text-emerald-400 font-bold text-sm animate-pulse">HIGH-RISK DEVELOPER</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed">
          WARNING: Chronological incidents are fetched via encrypted history indexes. The developer's career steps have been fully audited by independent security entities.
        </p>
      </motion.div>

      {/* Main Timeline Grid */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-8 bg-police-card border border-police-cardBorder rounded-lg p-5 flex flex-col space-y-6 shadow-lg glow-cyan"
      >
        <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-2">
          <Calendar className="text-police-cyan" size={18} />
          <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">RECORDED CRIMINAL TIMELINE</h2>
        </div>

        {/* Timeline Path */}
        <div className="relative pl-6 md:pl-8 border-l border-police-cardBorder/60 space-y-8 ml-2">
          {incidents.map((incident, index) => (
            <motion.div 
              key={incident.incidentCode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Connector Node */}
              <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4.5 h-4.5 rounded-full border-2 border-black ${incident.iconColor}`} />

              <div className="bg-black/30 border border-[#1e2430] p-4 rounded-lg flex flex-col md:flex-row md:items-start gap-4">
                
                {/* Year and Code info */}
                <div className="md:w-32 flex-shrink-0">
                  <span className="text-white font-bold text-sm tracking-wider font-mono block">
                    {incident.year}
                  </span>
                  <span className="text-police-cyan text-[10px] uppercase font-semibold font-mono mt-1 block">
                    {incident.incidentCode}
                  </span>
                  <div className={`mt-2 text-[8px] font-bold border px-1.5 py-0.5 rounded font-mono inline-block uppercase tracking-wider ${incident.statusColor}`}>
                    {incident.status}
                  </div>
                </div>

                {/* Incident Narrative */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white font-title tracking-wide uppercase">
                    {incident.title}
                  </h3>
                  <p className="text-[10px] text-police-amber font-semibold font-mono tracking-wider mt-0.5">
                    AT: {incident.location}
                  </p>
                  <p className="dossier-paragraph text-xs mt-2">
                    {incident.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Timeline;
