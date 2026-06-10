import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, FolderOpen, Folder, ExternalLink, Github, Tag, Eye, Lock } from 'lucide-react';

const CaseFiles = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
  {
    id: 'case-001',
    number: 'CASE #001',
    title: 'Weather Intelligence System',
    subtitle: 'Real-Time Weather Monitoring',
    description: 'Weather application that provides current conditions and forecasts using external APIs.',
    fullDescription:
      'A responsive weather application built with React that fetches real-time weather data from a public API. Users can search for cities worldwide, view current temperature, humidity, wind speed, and weather forecasts. Features clean UI, API integration, and responsive design.',
    tech: ['HTML', 'JavaScript', 'Weather API', 'CSS'],
    status: 'DEPLOYED',
    statusColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
    role: 'Frontend Developer',
    github: 'https://github.com/finoteloza549/Weather-app',
    demo: 'https://weather-app-pied-iota-68.vercel.app/'
  },

  {
    id: 'case-002',
    number: 'CASE #002',
    title: 'Task Management System',
    subtitle: 'Personal Productivity Tracker',
    description: 'A to-do application for organizing and tracking daily tasks.',
    fullDescription:
      'A task management application that allows users to create, edit, complete, and delete tasks. Features local storage persistence, filtering, and responsive design to improve daily productivity.',
    tech: ['HTML', 'JavaScript', 'Local Storage', 'CSS'],
    status: 'DEPLOYED',
    statusColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20',
    role: 'Frontend Developer',
    github: 'https://github.com/finoteloza549',
    demo: 'https://to-do-list-app-dun-nine.vercel.app/'
  },

  {
    id: 'case-003',
    number: 'CASE #003',
    title: 'Personal Portfolio',
    subtitle: 'Developer Showcase Platform',
    description: 'Professional portfolio website showcasing projects and skills.',
    fullDescription:
      'A modern portfolio website designed to showcase projects, technical skills, education, and contact information. Built with React and Tailwind CSS featuring responsive design, animations, and project galleries.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Framer Motion'],
    status: 'ACTIVE',
    statusColor: 'text-police-cyan border-police-cyan/40 bg-cyan-950/20',
    role: 'Full-Stack Developer',
    github: 'YOUR_GITHUB_LINK',
    demo: 'YOUR_DEMO_LINK'
  }
];
  return (
    <div className="flex-1 flex flex-col p-1 max-w-6xl mx-auto w-full">
      <div className="flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-6">
        <FolderOpen className="text-police-cyan" size={20} />
        <h2 className="text-md font-bold tracking-widest text-police-cyan font-mono uppercase">CLASSIFIED CASE FILES // DOSSIER RECORDS</h2>
      </div>

      {/* Grid of Folders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 folder-perspective">
        {cases.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedCase(project)}
            className="folder-card bg-[#11141a] border border-[#1e2430] rounded-lg p-5 cursor-pointer flex flex-col relative overflow-hidden group glow-cyan min-h-[280px]"
          >
            {/* Top folder tab accent */}
            <div className="absolute top-0 left-0 bg-police-cyan/20 border-r border-b border-[#1e2430] text-[9px] text-police-cyan font-mono px-3 py-1 uppercase font-bold tracking-wider rounded-br-lg">
              {project.number}
            </div>

            {/* Folder icon on top right */}
            <div className="absolute top-4 right-4 text-slate-700 group-hover:text-police-cyan transition-colors duration-300">
              <Folder size={32} />
            </div>

            {/* Status Stamp */}
            <div className={`self-start text-[8px] font-bold border px-1.5 py-0.5 rounded font-mono mt-4 uppercase tracking-wider ${project.statusColor}`}>
              {project.status}
            </div>

            <div className="mt-4 flex-1 flex flex-col">
              <h3 className="text-lg font-bold font-title tracking-wide text-white group-hover:text-police-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-[10px] text-police-cyan/80 uppercase tracking-widest font-mono mt-1">
                {project.subtitle}
              </p>
              
              <p className="text-xs text-slate-400 font-mono mt-3 leading-relaxed flex-1">
                {project.description}
              </p>

              <p className="text-xs text-slate-400 font-mono mt-3 leading-relaxed flex-1">
                {project.fullDescription}
              </p>
            </div>

            {/* Tags footer */}
            <div className="mt-4 pt-3 border-t border-[#1e2430] flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[9px] font-mono bg-black/60 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[9px] font-mono text-slate-600 self-center">
                  +{project.tech.length - 3} MORE
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Dossier Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#11141a] border-2 border-police-cyan glow-cyan rounded-lg overflow-hidden flex flex-col font-mono text-xs md:text-sm text-slate-300 relative max-h-[85vh]"
            >
              {/* Top border header */}
              <div className="bg-police-cyan text-black font-bold px-4 py-2 flex justify-between items-center font-title tracking-widest text-sm uppercase">
                <div className="flex items-center space-x-2">
                  <Shield size={16} />
                  <span>DOSSIER RECORD: {selectedCase.number}</span>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="hover:text-white transition-colors cursor-pointer text-base font-sans"
                >
                  [X]
                </button>
              </div>

              {/* Dossier contents */}
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="border-b border-[#1e2430] pb-4">
                  <h3 className="text-2xl font-bold font-title text-white tracking-wide">{selectedCase.title}</h3>
                  <p className="text-police-cyan font-bold tracking-widest uppercase text-xs mt-1">{selectedCase.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-black/40 border border-[#1e2430] p-3 rounded">
                  <div>
                    <span className="text-police-cyan font-semibold block uppercase text-[10px]">CASE STATUS:</span>
                    <span className="text-white font-bold">{selectedCase.status}</span>
                  </div>
                  <div>
                    <span className="text-police-cyan font-semibold block uppercase text-[10px]">SUBJECT ROLE:</span>
                    <span className="text-white font-bold">{selectedCase.role}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-police-cyan font-bold uppercase tracking-wider mb-2 flex items-center">
                    <span className="border-b border-police-cyan/30 w-full pr-2">Case Narrative // Summary</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-mono text-xs">
                    {selectedCase.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-police-cyan font-bold uppercase tracking-wider mb-2 flex items-center">
                    <span className="border-b border-police-cyan/30 w-full pr-2">Used System Artifacts // Tech</span>
                  </h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedCase.tech.map((t) => (
                      <span key={t} className="flex items-center space-x-1 bg-[#1e2430]/60 border border-[#1e2430] text-slate-300 px-2.5 py-1 rounded text-xs">
                        <Tag size={10} className="text-police-cyan mr-1" />
                        <span>{t}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="bg-black/60 border-t border-[#1e2430] p-4 flex flex-col sm:flex-row justify-end items-center gap-3">
                <a 
                  href={selectedCase.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2 border border-slate-700 hover:border-police-cyan hover:text-police-cyan text-slate-400 font-bold tracking-wider rounded flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs"
                >
                  <Github size={14} />
                  <span>INSPECT CODEBASE</span>
                </a>
                <a 
                  href={selectedCase.demo} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-police-cyan text-black hover:bg-white font-bold tracking-wider rounded flex items-center justify-center space-x-2 transition-all cursor-pointer text-xs"
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

export default CaseFiles;
