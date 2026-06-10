import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { Shield, Eye, AlertTriangle, Radio, Power, Terminal as TermIcon, FileText, Briefcase, Calendar, Info, Mail } from 'lucide-react';

const CRTLayout = ({ children }) => {
  const { isConnected, activeUsersCount } = useSocket();
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [tickerText, setTickerText] = useState('LOADING DATABASE SYSTEM...');
  const location = useLocation();
  const navigate = useNavigate();

  // Cycle system messages in the bottom ticker to create a live tactical atmosphere
  useEffect(() => {
    const logs = [
      'SYSTEM HEALTH: OPTIMAL // ENCRYPTED ACCESS PORT ACTIVE',
      'ALERT: ALL PAGE VISITIONS AND COMMUNICATIONS ARE LOGGED TO REGISTRY',
      'MONITORING LINK: SOCKET NODE CONNECTED // TRACKING PACKETS...',
      'FIREWALL STATUS: SECURE // NO RECENT INTRUSIONS DETECTED',
      'WANTED STAMP APPLIED // CLASSIFIED EVIDENCE INDEXED',
      'INTRUSION DETECTION SYSTEM ACTIVE // REPORT THREATS TO ADMIN',
      `SURVEILLANCE NODE ACTIVE: ${activeUsersCount} TARGET(S) IN VIEWPORT`
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % logs.length;
      setTickerText(logs[index]);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeUsersCount]);

  const navItems = [
    { path: '/', label: 'TERMINAL', icon: <TermIcon size={16} /> },
    { path: '/about', label: 'WANTED POSTER', icon: <Info size={16} /> },
    { path: '/cases', label: 'CASE DOSSIERS', icon: <Briefcase size={16} /> },
    { path: '/evidence', label: 'EVIDENCE LOCKER', icon: <FileText size={16} /> },
    { path: '/timeline', label: 'CRIMINAL HISTORY', icon: <Calendar size={16} /> },
    { path: '/contact', label: 'INTERROGATION', icon: <Mail size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-black text-[#e2e8f0] p-3 md:p-6 flex flex-col items-center justify-center overflow-hidden font-mono selection:bg-police-cyan selection:text-black">
      {/* Physical Monitor Bezel Container */}
      <div className="relative w-full max-w-7xl bg-[#1e2330] rounded-3xl border-8 border-[#2d3548] shadow-[0_0_80px_rgba(0,0,0,0.8)] p-2 md:p-4 flex flex-col flex-1 min-h-[92vh]">
        {/* Screw Details in Corners */}
        <div className="absolute top-2 left-2 w-4 h-4 bg-[#414b66] rounded-full border border-gray-600 shadow-inner flex items-center justify-center text-[8px] text-gray-800 font-bold select-none cursor-default">+</div>
        <div className="absolute top-2 right-2 w-4 h-4 bg-[#414b66] rounded-full border border-gray-600 shadow-inner flex items-center justify-center text-[8px] text-gray-800 font-bold select-none cursor-default">+</div>
        <div className="absolute bottom-2 left-2 w-4 h-4 bg-[#414b66] rounded-full border border-gray-600 shadow-inner flex items-center justify-center text-[8px] text-gray-800 font-bold select-none cursor-default">+</div>
        <div className="absolute bottom-2 right-2 w-4 h-4 bg-[#414b66] rounded-full border border-gray-600 shadow-inner flex items-center justify-center text-[8px] text-gray-800 font-bold select-none cursor-default">+</div>

        {/* Physical Controls on Bezel top */}
        <div className="w-full flex items-center justify-between px-6 pb-2 text-[10px] text-slate-400 font-sans border-b border-[#2d3548]">
          <div className="flex items-center space-x-4">
            <span className="font-bold tracking-widest text-slate-300">POLICE COMPUTER TERMINAL MODEL-88</span>
            <div className="flex items-center space-x-1">
              <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' : 'bg-red-600 shadow-[0_0_8px_#dc2626]'}`} />
              <span className="text-[9px] uppercase tracking-wider">{isConnected ? 'LINKED' : 'OFFLINE'}</span>
            </div>
            {/* Live Surveillance Red Pulse */}
            <div className="flex items-center space-x-1 bg-red-950/40 border border-red-500/30 px-2 py-0.5 rounded text-red-500 font-bold animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <Radio size={10} className="mr-0.5 animate-spin" />
              <span>LIVE SURVEILLANCE FEED</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400">CRT POWER:</span>
              <button 
                onClick={() => setIsPowerOn(!isPowerOn)}
                className={`p-1.5 rounded-full border transition-all ${isPowerOn ? 'bg-police-cyan/20 border-police-cyan text-police-cyan shadow-[0_0_8px_#00f0ff]' : 'bg-red-950/20 border-red-800 text-red-600'}`}
                title="Toggle Monitor Screen Power"
              >
                <Power size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* CRT Screen Wrapper */}
        <div className="relative flex-1 flex flex-col bg-[#050608] mt-2 rounded-xl overflow-hidden border border-[#141923]">
          
          <AnimatePresence mode="wait">
            {isPowerOn ? (
              <motion.div 
                key="screen-on"
                initial={{ opacity: 0, scaleY: 0.01 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ 
                  scaleY: [1, 0.005, 0], 
                  scaleX: [1, 1, 0],
                  opacity: [1, 1, 0],
                  transition: { duration: 0.6, times: [0, 0.6, 1], ease: "easeInOut" }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex flex-col crt-screen p-4 h-full relative"
              >
                {/* Rolling Scanline Overlay */}
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                  className="crt-scanline"
                />

                {/* Tactical Terminal Grid Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-3 border-b-2 border-police-cyan/40 mb-4 gap-2">
                  <Link to="/" className="flex items-center space-x-2 group">
                    <Shield className="text-police-cyan animate-pulse group-hover:rotate-12 transition-transform" size={24} />
                    <div>
                      <h1 className="text-lg font-bold tracking-widest text-police-cyan font-mono group-hover:text-white transition-colors">PD-DATABASE // SYSTEM LOG</h1>
                      <p className="text-[9px] text-slate-500">LEVEL 3 SECURITY PROTOCOL IN OPERATION</p>
                    </div>
                  </Link>

                  <div className="flex items-center space-x-3 text-xs">
                    <div className="bg-police-card border border-police-cardBorder px-2.5 py-1 text-slate-400">
                      SYS CODE: <span className="text-police-cyan font-bold">CRT-M88</span>
                    </div>
                    <div className="bg-police-card border border-police-cardBorder px-2.5 py-1 text-slate-400 flex items-center space-x-2">
                      <span>ACTIVE TARGETS:</span>
                      <span className="text-police-red font-bold animate-pulse">{activeUsersCount}</span>
                    </div>
                    <Link to="/headquarters" className="bg-police-cyan hover:bg-white text-black font-bold px-3 py-1 flex items-center space-x-1 transition-all rounded select-none cursor-pointer">
                      <Eye size={12} />
                      <span className="font-sans text-[10px] tracking-wider">HEADQUARTERS</span>
                    </Link>
                  </div>
                </header>

                {/* Folder Nav Navigation tabs */}
                <nav className="flex flex-wrap gap-1 mb-4 border-b border-[#141923]">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center space-x-2 px-3 py-2 text-xs font-bold tracking-widest border-t border-x rounded-t-lg transition-all relative top-[1px]
                        ${isActive 
                          ? 'bg-police-cyan/10 border-police-cyan/50 text-police-cyan glow-cyan' 
                          : 'bg-transparent border-[#1e2430]/40 text-slate-400 hover:text-slate-200 hover:bg-[#11141a]/60 hover:border-slate-700'
                        }
                      `}
                    >
                      {item.icon}
                      <span className="hidden sm:inline">{item.label}</span>
                    </NavLink>
                  ))}
                </nav>

                {/* Primary Page Content */}
                <main className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-1">
                  {children}
                </main>

                {/* Confidential warning footer */}
                <footer className="mt-4 pt-3 border-t border-police-cardBorder flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={12} className="text-police-amber" />
                    <span className="text-police-amber/70 font-semibold tracking-wider">
                      RESTRICTED TERMINAL: DESTRUCTION OF ARTIFACTS SUBJECT TO PROSECUTION
                    </span>
                  </div>
                  
                  {/* Sliding Marquee Ticker */}
                  <div className="w-full md:w-80 bg-black/60 border border-police-cardBorder rounded py-0.5 px-2 overflow-hidden relative">
                    <div className="whitespace-nowrap text-police-cyan text-[9px] uppercase tracking-widest font-mono text-center">
                      {tickerText}
                    </div>
                  </div>
                </footer>
              </motion.div>
            ) : (
              /* CRT TV Screen Power Down State */
              <motion.div 
                key="screen-off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-grow bg-[#000] flex items-center justify-center h-full w-full relative"
              >
                {/* Tiny glowing capacitor dot that fades */}
                <motion.div 
                  initial={{ scale: 3, opacity: 1 }}
                  animate={{ scale: [3, 0], opacity: [1, 0.8, 0] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_#ffffff,0_0_30px_#ffffff]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-700/60 font-sans text-xs">
                  <p className="font-bold tracking-widest">SYSTEM DE-ENERGIZED</p>
                  <button 
                    onClick={() => setIsPowerOn(true)} 
                    className="mt-3 text-[10px] border border-red-900/60 px-2 py-1 rounded hover:bg-red-950/20 hover:text-red-500 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    Engage Power Relay
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CRTLayout;
