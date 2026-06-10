import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { Shield, Eye, Lock, RefreshCw, Trash, UserCheck, AlertTriangle, Activity, Users, FileText, CheckCircle2, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Headquarters = () => {
  const { socket, isConnected } = useSocket();
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Dashboard Telemetry Data
  const [summary, setSummary] = useState({
    activeCount: 0,
    totalViews: 0,
    topProject: 'N/A',
    avgDuration: '0s'
  });
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pathChartData, setPathChartData] = useState([]);
  const [deviceChartData, setDeviceChartData] = useState([]);
  
  // Real-time notification overlays
  const [alertNotification, setAlertNotification] = useState(null);

  // Authenticate Admin
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoadingAuth(true);
    setAuthError('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setAuthError('');
      } else {
        setAuthError(data.error || 'Authentication denied.');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Failed to communicate with authentication gateway.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Terminate Admin Session
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
  };

  // Fetch telemetry payload
  const fetchDashboardData = async () => {
    if (!token) return;

    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch Stats Summary
      const summaryRes = await fetch(`${BACKEND_URL}/api/analytics/summary`, { headers });
      if (summaryRes.status === 401) return handleLogout();
      const summaryData = await summaryRes.json();
      setSummary(summaryData);

      // Fetch Recent Visitors
      const visitorsRes = await fetch(`${BACKEND_URL}/api/analytics/visitors`, { headers });
      const visitorsData = await visitorsRes.json();
      
      // Separate active vs inactive or group them
      setActiveVisitors(visitorsData.filter(v => !v.endedAt));

      // Fetch Interrogation Statements
      const messagesRes = await fetch(`${BACKEND_URL}/api/analytics/messages`, { headers });
      const messagesData = await messagesRes.json();
      setMessages(messagesData);

      // Map Route views for charts
      const routeRes = await fetch(`${BACKEND_URL}/api/analytics/chart/routes`, { headers });
      const routeData = await routeRes.json();
      setPathChartData(routeData);

      // Map Device split for charts
      const deviceRes = await fetch(`${BACKEND_URL}/api/analytics/chart/devices`, { headers });
      const deviceData = await deviceRes.json();
      setDeviceChartData(deviceData);

    } catch (err) {
      console.error('Error fetching dashboard telemetry:', err);
    }
  };

  // Initialize socket triggers and fetch database records
  useEffect(() => {
    if (token) {
      fetchDashboardData();

      // Listen to real-time events from Socket.IO server
      if (socket) {
        // Handle visitor changes
        socket.on('analytics-update', () => {
          fetchDashboardData();
        });

        // Trigger red notification flash on incoming contact messages
        socket.on('new-message-alert', (message) => {
          setAlertNotification(message);
          fetchDashboardData();
          setTimeout(() => setAlertNotification(null), 6000);
        });
      }
    }

    return () => {
      if (socket) {
        socket.off('analytics-update');
        socket.off('new-message-alert');
      }
    };
  }, [token, socket]);

  // Update interrogation statement status (Prisma write)
  const updateMessageStatus = async (id, status) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/analytics/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
        );
      }
    } catch (err) {
      console.error('Failed to update message status node:', err);
    }
  };

  // Device chart color mapping
  const COLORS = ['#00f0ff', '#ffb300', '#ff1744', '#a855f7'];

  // 1. Unauthenticated Login Gate
  if (!token) {
    return (
      <div className="flex-1 flex justify-center items-center py-6 px-4 max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-[#11141a] border border-[#1e2430] glow-red rounded-lg p-6 font-mono text-xs md:text-sm text-slate-300 relative"
        >
          <div className="flex items-center space-x-2 border-b border-police-redDark pb-3 mb-5">
            <Lock className="text-police-red animate-pulse" size={16} />
            <span className="font-bold tracking-widest text-police-red uppercase">AUTHENTICATION REQUIRED</span>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
            RESTRICTED ACCESS PORT: LOG IN TO VIEW LIVE TARGET GEOGRAPHY, TRACK CONNECTIONS, AND COMPILE SURVEILLANCE DATA.
          </p>

          {authError && (
            <div className="bg-red-950/20 border border-red-900/40 p-2.5 rounded text-[10px] text-red-400 flex items-start space-x-2 mb-4 font-bold">
              <AlertTriangle size={14} className="flex-shrink-0 animate-bounce" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-wider text-slate-400">OPERATOR ID (USERNAME)</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin ID..."
                className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 text-xs focus:outline-none focus:border-police-red transition-all font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] uppercase tracking-wider text-slate-400">ENCRYPTION PIN (PASSWORD)</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 text-xs focus:outline-none focus:border-police-red transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="w-full py-2 bg-police-red text-white hover:bg-white hover:text-black font-bold tracking-widest text-xs rounded transition-all cursor-pointer uppercase shadow-[0_0_10px_rgba(255,23,68,0.2)]"
            >
              {isLoadingAuth ? 'DECIPHERING ACCESS KEY...' : 'INITIALIZE SURVEILLANCE FEED'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // 2. Main Authenticated Headquarters Dashboard
  return (
    <div className="flex-1 flex flex-col p-1 max-w-7xl mx-auto w-full font-mono text-xs">
      
      {/* Real-time Incident Flasher Alert */}
      <AnimatePresence>
        {alertNotification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 bg-red-950/40 border border-red-500 rounded p-3 text-red-500 font-bold flex items-center justify-between animate-pulse shadow-[0_0_15px_#ef4444]"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="animate-spin" size={16} />
              <span>HIGH THREAT INTERROGATION: INCOMING RECORD SUBMITTED BY {alertNotification.name} ({alertNotification.email})</span>
            </div>
            <button onClick={() => setAlertNotification(null)} className="text-[10px] hover:text-white">[DISMISS]</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Toolbar Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#1e2430] pb-3 mb-5 gap-3">
        <div className="flex items-center space-x-2">
          <Activity className="text-police-red animate-pulse" size={20} />
          <h2 className="text-sm font-bold tracking-widest text-police-red uppercase">SURVEILLANCE CONTROL PANEL // CENTRAL OPERATIONS</h2>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={fetchDashboardData}
            className="bg-police-card border border-police-cardBorder hover:border-police-cyan hover:text-police-cyan px-2.5 py-1.5 rounded flex items-center space-x-1.5 transition-all text-[10px] uppercase font-bold cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>FORCE INDEX RELOAD</span>
          </button>

          <button 
            onClick={handleLogout}
            className="bg-red-950/20 border border-red-900/60 hover:bg-red-600 hover:text-black px-2.5 py-1.5 rounded transition-all text-[10px] uppercase font-bold cursor-pointer text-red-400"
          >
            DISCONNECT LINK
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-police-card border border-[#1e2430] p-4 rounded glow-red">
          <span className="text-slate-500 block uppercase tracking-wider text-[9px]">Active Investigations</span>
          <span className="text-2xl font-bold font-title text-police-red block mt-1 animate-pulse">{summary.activeCount}</span>
          <span className="text-[8px] text-slate-500 uppercase mt-1 block">Targets currently on site</span>
        </div>

        <div className="bg-police-card border border-[#1e2430] p-4 rounded">
          <span className="text-slate-500 block uppercase tracking-wider text-[9px]">Cases Reviewed</span>
          <span className="text-2xl font-bold font-title text-white block mt-1">{summary.totalViews}</span>
          <span className="text-[8px] text-slate-500 uppercase mt-1 block">Cumulative page views</span>
        </div>

        <div className="bg-police-card border border-[#1e2430] p-4 rounded">
          <span className="text-slate-500 block uppercase tracking-wider text-[9px]">Top Viewed Dossier</span>
          <span className="text-lg font-bold font-title text-police-cyan block mt-2 truncate uppercase">{summary.topProject}</span>
          <span className="text-[8px] text-slate-500 uppercase mt-1 block">Most investigated project</span>
        </div>

        <div className="bg-police-card border border-[#1e2430] p-4 rounded">
          <span className="text-slate-500 block uppercase tracking-wider text-[9px]">Avg Session Length</span>
          <span className="text-2xl font-bold font-title text-police-amber block mt-1">{summary.avgDuration}</span>
          <span className="text-[8px] text-slate-500 uppercase mt-1 block">Average engagement time</span>
        </div>
      </div>

      {/* Grid Layout for Analytics/Surveillance Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Live connection stream and messages inbox */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Target Surveillance */}
          <div className="bg-police-card border border-[#1e2430] rounded p-4">
            <h3 className="text-xs font-bold tracking-widest text-police-cyan border-b border-[#1e2430] pb-2 mb-3 uppercase flex items-center space-x-1.5">
              <Eye size={14} className="text-police-cyan animate-pulse" />
              <span>LIVE TARGET GEOGRAPHY (ACTIVE VISITOR SESSIONS)</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {activeVisitors.length === 0 ? (
                <div className="text-center py-6 text-slate-600 uppercase font-semibold">
                  NO ACTIVE SENSORS DETECTED
                </div>
              ) : (
                activeVisitors.map((visitor) => (
                  <div key={visitor.id} className="bg-black/50 border border-slate-900 rounded p-3 leading-relaxed flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        <span className="text-police-red font-bold uppercase">IP: {visitor.ipAddress}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-police-cyan font-bold">{visitor.location || 'GLOBAL ARPANET'}</span>
                      </div>
                      <div className="text-[9px] text-slate-400 mt-1">
                        Active Page: <span className="text-white bg-slate-900 px-1 py-0.5 rounded font-bold font-mono">{visitor.pageViews[visitor.pageViews.length - 1]?.path || '/'}</span>
                      </div>
                      <div className="text-[8px] text-slate-500 truncate max-w-sm mt-0.5">
                        Client Browser: {visitor.userAgent}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[9px] text-right">
                      <div className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-400">
                        Hops: <span className="text-white font-bold">{visitor.pageViews.length}</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-slate-400 flex items-center space-x-1">
                        <Clock size={10} className="text-police-amber" />
                        <span>{Math.floor((Date.now() - new Date(visitor.startedAt).getTime()) / 1000)}s</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Interrogation Report Inbox */}
          <div className="bg-police-card border border-[#1e2430] rounded p-4">
            <h3 className="text-xs font-bold tracking-widest text-police-amber border-b border-[#1e2430] pb-2 mb-3 uppercase flex items-center space-x-1.5">
              <FileText size={14} className="text-police-amber" />
              <span>INTERROGATION TESTIMONY BOX</span>
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="text-center py-6 text-slate-600 uppercase font-semibold">
                  NO TESTIMONY REPORTS RECORDED
                </div>
              ) : (
                messages.map((msg) => {
                  let statusClass = 'border-red-900/40 text-red-500';
                  if (msg.status === 'INVESTIGATING') statusClass = 'border-amber-600/40 text-amber-400';
                  if (msg.status === 'CLOSED') statusClass = 'border-emerald-600/40 text-emerald-400';

                  return (
                    <div key={msg.id} className="bg-black/40 border border-slate-900 rounded p-4 relative">
                      <div className="flex justify-between items-start border-b border-[#1e2430]/60 pb-1.5 mb-2.5">
                        <div>
                          <span className="font-bold text-white uppercase text-[10px]">{msg.name}</span>
                          <span className="text-slate-500 text-[9px] ml-2 font-semibold">({msg.email})</span>
                        </div>
                        <span className={`text-[8px] font-bold border px-1.5 py-0.5 rounded font-mono uppercase tracking-wider ${statusClass}`}>
                          {msg.status}
                        </span>
                      </div>

                      <div className="text-[10px] text-police-cyan font-bold uppercase mb-1">
                        SUBJECT: {msg.subject.replace('_', ' ')}
                      </div>

                      <p className="text-slate-300 leading-relaxed font-mono text-[10px] bg-black/30 border border-[#1e2430]/40 p-2.5 rounded mb-3 max-h-36 overflow-y-auto">
                        {msg.message}
                      </p>

                      {/* Status controls */}
                      <div className="flex flex-wrap gap-2 justify-end items-center text-[9px] pt-1 border-t border-[#1e2430]/30">
                        <span className="text-slate-500 uppercase font-bold mr-1">Patrol Action:</span>
                        <button 
                          onClick={() => updateMessageStatus(msg.id, 'INVESTIGATING')}
                          disabled={msg.status === 'INVESTIGATING'}
                          className="bg-amber-950/20 border border-amber-900/60 hover:bg-amber-600 hover:text-black font-bold px-2 py-0.5 rounded text-amber-500 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          INVESTIGATE
                        </button>
                        <button 
                          onClick={() => updateMessageStatus(msg.id, 'CLOSED')}
                          disabled={msg.status === 'CLOSED'}
                          className="bg-emerald-950/20 border border-emerald-900/60 hover:bg-emerald-600 hover:text-black font-bold px-2 py-0.5 rounded text-emerald-500 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          CLOSE FILE
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Right column: Recharts graphs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Path views chart */}
          <div className="bg-police-card border border-[#1e2430] p-4 rounded">
            <h3 className="text-xs font-bold tracking-widest text-police-cyan border-b border-[#1e2430] pb-2 mb-4 uppercase">
              DOSSIER INVESTIGATION HEATMAP
            </h3>

            <div className="h-64 font-mono">
              {pathChartData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-600 uppercase font-bold">
                  Telemetry Loading...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pathChartData}>
                    <XAxis dataKey="path" stroke="#94a3b8" fontSize={8} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={8} allowDecimals={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#11141a', border: '1px solid #1e2430', color: '#00f0ff', fontSize: '10px' }}
                      labelStyle={{ color: '#ffffff' }}
                    />
                    <Bar dataKey="views" fill="#00f0ff" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Client devices split chart */}
          <div className="bg-police-card border border-[#1e2430] p-4 rounded">
            <h3 className="text-xs font-bold tracking-widest text-police-amber border-b border-[#1e2430] pb-2 mb-4 uppercase">
              CLIENT HARDWARE SPLIT
            </h3>

            <div className="h-60 flex flex-col md:flex-row items-center justify-center gap-4">
              {deviceChartData.length === 0 ? (
                <div className="text-slate-600 uppercase font-bold">
                  Telemetry Loading...
                </div>
              ) : (
                <>
                  <div className="w-40 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={deviceChartData}
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={3}
                          dataKey="count"
                        >
                          {deviceChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Chart Legend */}
                  <div className="flex-1 space-y-2">
                    {deviceChartData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center space-x-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-slate-300 font-bold uppercase text-[9px]">
                          {entry.name}: {entry.count} ({entry.percentage}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Headquarters;
