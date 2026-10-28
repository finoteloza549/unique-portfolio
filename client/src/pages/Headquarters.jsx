import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { useDossier } from '../context/DossierContext';
import { Shield, Eye, Lock, RefreshCw, Trash, UserCheck, AlertTriangle, Activity, Users, FileText, CheckCircle2, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Headquarters = () => {
  const { socket, isConnected } = useSocket();
  const { dossier, updateDossier } = useDossier();
  const [token, setToken] = useState(localStorage.getItem('admin_token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Dossier Editor State
  const [showEditor, setShowEditor] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ success: null, message: '' });
  const [editorTab, setEditorTab] = useState('vitals');

  const [editVitals, setEditVitals] = useState({
    aliases: '',
    location: '',
    threatLevel: 'HIGH',
    biometricMatch: '',
    deptIndex: ''
  });

  const [editBio, setEditBio] = useState({
    summary: '',
    statusNote: '',
    paragraphsText: ''
  });

  const [editSkills, setEditSkills] = useState([]);
  const [editTech, setEditTech] = useState({ clientText: '', serverText: '' });
  const [editCases, setEditCases] = useState([]);
  const [editIncidents, setEditIncidents] = useState([]);

  useEffect(() => {
    if (dossier) {
      if (dossier.vitals) {
        setEditVitals({
          aliases: dossier.vitals.aliases || '',
          location: dossier.vitals.location || '',
          threatLevel: dossier.vitals.threatLevel || 'HIGH',
          biometricMatch: dossier.vitals.biometricMatch || '',
          deptIndex: dossier.vitals.deptIndex || ''
        });
      }
      if (dossier.bio) {
        setEditBio({
          summary: dossier.bio.summary || '',
          statusNote: dossier.bio.statusNote || '',
          paragraphsText: dossier.bio.paragraphs ? dossier.bio.paragraphs.join('\n\n') : ''
        });
      }
      if (dossier.skills) {
        setEditSkills(dossier.skills.map(s => ({ ...s })));
      }
      if (dossier.techStackCategories) {
        setEditTech({
          clientText: dossier.techStackCategories.client ? dossier.techStackCategories.client.join(', ') : '',
          serverText: dossier.techStackCategories.server ? dossier.techStackCategories.server.join(', ') : ''
        });
      }
      if (dossier.cases) {
        setEditCases(dossier.cases.map(c => ({
          ...c,
          techText: c.tech ? c.tech.join(', ') : ''
        })));
      }
      if (dossier.incidents) {
        setEditIncidents(dossier.incidents.map(inc => ({ ...inc })));
      }
    }
  }, [dossier]);

  // Skill Modifiers
  const handleAddSkill = () => {
    setEditSkills([...editSkills, {
      name: 'New Skill',
      category: 'Weaponry',
      level: '80%',
      bagId: `EVID-SK-${Math.floor(100 + Math.random() * 900)}`,
      caseRef: 'General Audit',
      recovered: '01-01-2026',
      notes: 'Investigated capability.'
    }]);
  };
  const handleRemoveSkill = (index) => {
    setEditSkills(editSkills.filter((_, idx) => idx !== index));
  };
  const handleSkillChange = (index, field, value) => {
    const updated = [...editSkills];
    updated[index][field] = value;
    setEditSkills(updated);
  };

  // Case Modifiers
  const handleAddCase = () => {
    setEditCases([...editCases, {
      id: `case-00${editCases.length + 1}`,
      number: `CASE #00${editCases.length + 1}`,
      title: 'New Case File',
      subtitle: 'Technical Operation',
      description: 'Overview of evidence files.',
      fullDescription: 'Complete narrative of case files and code audits.',
      techText: 'HTML, CSS, JavaScript',
      status: 'ACTIVE',
      statusColor: 'text-police-cyan border-police-cyan/40 bg-cyan-950/20',
      role: 'Developer',
      github: 'https://github.com/finoteloza549',
      demo: 'https://github.com/finoteloza549'
    }]);
  };
  const handleRemoveCase = (index) => {
    setEditCases(editCases.filter((_, idx) => idx !== index));
  };
  const handleCaseChange = (index, field, value) => {
    const updated = [...editCases];
    updated[index][field] = value;
    setEditCases(updated);
  };

  // Incident Modifiers
  const handleAddIncident = () => {
    setEditIncidents([...editIncidents, {
      year: '2026',
      incidentCode: `CR-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: 'New Coding Incitement',
      location: 'GLOBAL GRID',
      description: 'Subject suspected of creating responsive user layouts.',
      status: 'ACTIVE INVESTIGATION',
      iconColor: 'bg-police-cyan shadow-[0_0_10px_#00f0ff]',
      statusColor: 'text-police-cyan bg-police-cyan/10 border-police-cyan/30'
    }]);
  };
  const handleRemoveIncident = (index) => {
    setEditIncidents(editIncidents.filter((_, idx) => idx !== index));
  };
  const handleIncidentChange = (index, field, value) => {
    const updated = [...editIncidents];
    updated[index][field] = value;
    setEditIncidents(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus({ success: null, message: '' });

    const updatedData = {
      vitals: {
        suspectName: dossier.vitals?.suspectName || 'Finoteloza',
        suspectId: dossier.vitals?.suspectId || '#FINOTELOZA-2026',
        aliases: editVitals.aliases,
        location: editVitals.location,
        threatLevel: editVitals.threatLevel,
        biometricMatch: editVitals.biometricMatch,
        deptIndex: editVitals.deptIndex
      },
      bio: {
        title: dossier.bio?.title || 'OFFENSE PROFILE // INVESTIGATION NOTES',
        summary: editBio.summary,
        statusNote: editBio.statusNote,
        paragraphs: editBio.paragraphsText.split('\n\n').map(p => p.trim()).filter(Boolean)
      },
      skills: editSkills.map(s => ({
        name: s.name,
        category: s.category,
        level: s.level,
        bagId: s.bagId,
        caseRef: s.caseRef,
        recovered: s.recovered,
        notes: s.notes
      })),
      techStackCategories: {
        client: editTech.clientText.split(',').map(t => t.trim()).filter(Boolean),
        server: editTech.serverText.split(',').map(t => t.trim()).filter(Boolean)
      },
      cases: editCases.map(c => ({
        id: c.id,
        number: c.number,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        fullDescription: c.fullDescription,
        tech: c.techText.split(',').map(t => t.trim()).filter(Boolean),
        status: c.status,
        statusColor: c.statusColor,
        role: c.role,
        github: c.github,
        demo: c.demo
      })),
      incidents: editIncidents.map(inc => ({
        year: inc.year,
        incidentCode: inc.incidentCode,
        title: inc.title,
        location: inc.location,
        description: inc.description,
        status: inc.status,
        iconColor: inc.iconColor,
        statusColor: inc.statusColor
      }))
    };

    const res = await updateDossier(updatedData, token);
    setIsSaving(false);
    if (res.success) {
      setSaveStatus({ success: true, message: 'Dossier records successfully written to database.' });
      setTimeout(() => setSaveStatus({ success: null, message: '' }), 5000);
    } else {
      setSaveStatus({ success: false, message: res.error || 'Failed to rewrite dossier files.' });
    }
  };

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
            onClick={() => setShowEditor(!showEditor)}
            className={`px-2.5 py-1.5 rounded flex items-center space-x-1.5 transition-all text-[10px] uppercase font-bold cursor-pointer border ${showEditor ? 'bg-police-cyan text-black border-police-cyan shadow-[0_0_8px_#00f0ff]' : 'bg-police-card border-police-cardBorder text-slate-300 hover:border-police-cyan hover:text-police-cyan'}`}
          >
            <FileText size={11} />
            <span>{showEditor ? 'HIDE DOSSIER EDITOR' : 'EDIT SUSPECT DOSSIER'}</span>
          </button>

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

      {/* Dossier Editor Form */}
      <AnimatePresence>
        {showEditor && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-police-card border border-police-cyan rounded-lg p-5 mb-6 text-xs text-slate-300 shadow-[0_0_15px_rgba(0,240,255,0.15)] relative overflow-hidden"
          >
            <div className="flex items-center space-x-2 border-b border-police-cyan/40 pb-2.5 mb-4">
              <Shield className="text-police-cyan animate-pulse" size={16} />
              <span className="font-bold tracking-widest text-police-cyan uppercase font-mono">DOSSIER DATABASE WRITER PORT</span>
            </div>

            {saveStatus.message && (
              <div className={`p-2.5 rounded text-[10px] flex items-center space-x-2 mb-4 font-bold border ${saveStatus.success ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400' : 'bg-red-950/20 border-red-900/40 text-red-400'}`}>
                <AlertTriangle size={14} className="flex-shrink-0 animate-bounce" />
                <span>{saveStatus.message}</span>
              </div>
            )}

            <div className="flex border-b border-[#1e2430] mb-4 space-x-1">
              {[
                { id: 'vitals', label: 'Vitals & Bio' },
                { id: 'skills', label: 'Skills' },
                { id: 'tech', label: 'Tech Stack' },
                { id: 'cases', label: 'Case Files' },
                { id: 'incidents', label: 'Incidents' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEditorTab(tab.id)}
                  className={`px-3 py-1.5 uppercase font-mono text-[10px] font-black border-t border-x rounded-t transition-all cursor-pointer ${
                    editorTab === tab.id
                      ? 'bg-black/60 border-police-cyan text-police-cyan'
                      : 'border-transparent text-slate-500 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* TAB 1: VITALS & BIO */}
              {editorTab === 'vitals' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Suspect Aliases</label>
                      <input
                        type="text"
                        value={editVitals.aliases}
                        onChange={(e) => setEditVitals({ ...editVitals, aliases: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Last Known Location</label>
                      <input
                        type="text"
                        value={editVitals.location}
                        onChange={(e) => setEditVitals({ ...editVitals, location: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Threat Level</label>
                      <select
                        value={editVitals.threatLevel}
                        onChange={(e) => setEditVitals({ ...editVitals, threatLevel: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                      >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                        <option value="MAXIMUM">MAXIMUM</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Biometric Match Percentage</label>
                      <input
                        type="text"
                        value={editVitals.biometricMatch}
                        onChange={(e) => setEditVitals({ ...editVitals, biometricMatch: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Department Index Code</label>
                      <input
                        type="text"
                        value={editVitals.deptIndex}
                        onChange={(e) => setEditVitals({ ...editVitals, deptIndex: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-[#1e2430]/60 pt-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Bio Narrative Summary</label>
                        <input
                          type="text"
                          value={editBio.summary}
                          onChange={(e) => setEditBio({ ...editBio, summary: e.target.value })}
                          className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Bio Status Note</label>
                        <input
                          type="text"
                          value={editBio.statusNote}
                          onChange={(e) => setEditBio({ ...editBio, statusNote: e.target.value })}
                          className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Bio Narrative Paragraphs (Separate with double newlines)</label>
                      <textarea
                        rows={6}
                        value={editBio.paragraphsText}
                        onChange={(e) => setEditBio({ ...editBio, paragraphsText: e.target.value })}
                        className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SKILLS */}
              {editorTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#1e2430] pb-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400">REGISTERED SKILLS ({editSkills.length})</span>
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-2 py-1 bg-police-cyan/15 border border-police-cyan hover:bg-police-cyan hover:text-black font-bold rounded text-[8px] tracking-wider transition-all cursor-pointer uppercase font-mono"
                    >
                      + Add Skill Asset
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {editSkills.map((skill, index) => (
                      <div key={index} className="bg-black/40 border border-slate-900 rounded p-3 relative space-y-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-white"
                        >
                          <Trash size={12} />
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Skill Name</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Category</label>
                            <input
                              type="text"
                              value={skill.category}
                              onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Level %</label>
                            <input
                              type="text"
                              value={skill.level}
                              onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Evidence Bag ID</label>
                            <input
                              type="text"
                              value={skill.bagId}
                              onChange={(e) => handleSkillChange(index, 'bagId', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Case Reference</label>
                            <input
                              type="text"
                              value={skill.caseRef}
                              onChange={(e) => handleSkillChange(index, 'caseRef', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Recovered Date</label>
                            <input
                              type="text"
                              value={skill.recovered}
                              onChange={(e) => handleSkillChange(index, 'recovered', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Investigator Notes</label>
                          <input
                            type="text"
                            value={skill.notes}
                            onChange={(e) => handleSkillChange(index, 'notes', e.target.value)}
                            className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TECH STACK */}
              {editorTab === 'tech' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Client Weaponry Categories (Comma-separated)</label>
                    <textarea
                      rows={3}
                      value={editTech.clientText}
                      onChange={(e) => setEditTech({ ...editTech, clientText: e.target.value })}
                      className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono leading-relaxed"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Server Weaponry Categories (Comma-separated)</label>
                    <textarea
                      rows={3}
                      value={editTech.serverText}
                      onChange={(e) => setEditTech({ ...editTech, serverText: e.target.value })}
                      className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: CASE DOSSIERS */}
              {editorTab === 'cases' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#1e2430] pb-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400">CASE FILE DOSSIERS ({editCases.length})</span>
                    <button
                      type="button"
                      onClick={handleAddCase}
                      className="px-2 py-1 bg-police-cyan/15 border border-police-cyan hover:bg-police-cyan hover:text-black font-bold rounded text-[8px] tracking-wider transition-all cursor-pointer uppercase font-mono"
                    >
                      + Add Case Dossier
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {editCases.map((c, index) => (
                      <div key={index} className="bg-black/40 border border-slate-900 rounded p-3 relative space-y-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveCase(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-white"
                        >
                          <Trash size={12} />
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Case ID</label>
                            <input
                              type="text"
                              value={c.id}
                              onChange={(e) => handleCaseChange(index, 'id', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Case Number</label>
                            <input
                              type="text"
                              value={c.number}
                              onChange={(e) => handleCaseChange(index, 'number', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Title</label>
                            <input
                              type="text"
                              value={c.title}
                              onChange={(e) => handleCaseChange(index, 'title', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Subtitle</label>
                            <input
                              type="text"
                              value={c.subtitle}
                              onChange={(e) => handleCaseChange(index, 'subtitle', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Role</label>
                            <input
                              type="text"
                              value={c.role}
                              onChange={(e) => handleCaseChange(index, 'role', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Status Badge</label>
                            <input
                              type="text"
                              value={c.status}
                              onChange={(e) => handleCaseChange(index, 'status', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Status CSS Classes</label>
                            <input
                              type="text"
                              value={c.statusColor}
                              onChange={(e) => handleCaseChange(index, 'statusColor', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">GitHub Source Repository</label>
                            <input
                              type="text"
                              value={c.github}
                              onChange={(e) => handleCaseChange(index, 'github', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Live Demo Url</label>
                            <input
                              type="text"
                              value={c.demo}
                              onChange={(e) => handleCaseChange(index, 'demo', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Short Description</label>
                          <input
                            type="text"
                            value={c.description}
                            onChange={(e) => handleCaseChange(index, 'description', e.target.value)}
                            className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Tech Weaponry (Comma-separated)</label>
                          <input
                            type="text"
                            value={c.techText || ''}
                            onChange={(e) => handleCaseChange(index, 'techText', e.target.value)}
                            className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Full Case Investigation Record</label>
                          <textarea
                            rows={3}
                            value={c.fullDescription}
                            onChange={(e) => handleCaseChange(index, 'fullDescription', e.target.value)}
                            className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px] leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: INCIDENTS */}
              {editorTab === 'incidents' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#1e2430] pb-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400">CRIMINAL TIMELINE INCIDENTS ({editIncidents.length})</span>
                    <button
                      type="button"
                      onClick={handleAddIncident}
                      className="px-2 py-1 bg-police-cyan/15 border border-police-cyan hover:bg-police-cyan hover:text-black font-bold rounded text-[8px] tracking-wider transition-all cursor-pointer uppercase font-mono"
                    >
                      + Add Incident Log
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                    {editIncidents.map((inc, index) => (
                      <div key={index} className="bg-black/40 border border-slate-900 rounded p-3 relative space-y-3">
                        <button
                          type="button"
                          onClick={() => handleRemoveIncident(index)}
                          className="absolute top-2 right-2 text-red-500 hover:text-white"
                        >
                          <Trash size={12} />
                        </button>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Incident Year</label>
                            <input
                              type="text"
                              value={inc.year}
                              onChange={(e) => handleIncidentChange(index, 'year', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Incident Code</label>
                            <input
                              type="text"
                              value={inc.incidentCode}
                              onChange={(e) => handleIncidentChange(index, 'incidentCode', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Incident Title</label>
                            <input
                              type="text"
                              value={inc.title}
                              onChange={(e) => handleIncidentChange(index, 'title', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Grid Location</label>
                            <input
                              type="text"
                              value={inc.location}
                              onChange={(e) => handleIncidentChange(index, 'location', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Patrol Status</label>
                            <input
                              type="text"
                              value={inc.status}
                              onChange={(e) => handleIncidentChange(index, 'status', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Icon Glow CSS</label>
                            <input
                              type="text"
                              value={inc.iconColor}
                              onChange={(e) => handleIncidentChange(index, 'iconColor', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                          <div>
                            <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Status Badge CSS</label>
                            <input
                              type="text"
                              value={inc.statusColor}
                              onChange={(e) => handleIncidentChange(index, 'statusColor', e.target.value)}
                              className="w-full bg-black/60 border border-police-cardBorder rounded py-1 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase text-slate-500 font-bold mb-1">Narrative Description</label>
                          <input
                            type="text"
                            value={inc.description}
                            onChange={(e) => handleIncidentChange(index, 'description', e.target.value)}
                            className="w-full bg-black/60 border border-police-cardBorder rounded py-1.5 px-2 text-slate-200 focus:outline-none focus:border-police-cyan transition-all font-mono text-[10px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full mt-4 py-2.5 bg-police-cyan hover:bg-white text-black font-bold tracking-widest text-[10px] rounded transition-all cursor-pointer uppercase shadow-[0_0_10px_rgba(0,240,255,0.2)] disabled:opacity-40"
              >
                {isSaving ? 'OVERWRITING FILES IN CORE GRID...' : 'SAVE DOSSIER RECORDS'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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
