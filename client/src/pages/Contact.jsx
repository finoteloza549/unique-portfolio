import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';
import { Shield, Send, CheckCircle, FileText, AlertTriangle, HelpCircle } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Contact = () => {
  const { socket } = useSocket();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'PROJECT_INQUIRY',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [caseId, setCaseId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setCaseId(data.id || 'INC-' + Math.floor(Math.random() * 9000 + 1000));
        
        // Emit Socket.IO event for instant admin alert
        if (socket) {
          socket.emit('new-message', data);
        }

        setFormData({
          name: '',
          email: '',
          subject: 'PROJECT_INQUIRY',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Failed to submit interrogation report:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-4 px-4 max-w-2xl mx-auto w-full font-mono">
      <div className="w-full flex items-center space-x-2 border-b border-[#1e2430] pb-3 mb-6">
        <FileText className="text-police-cyan" size={20} />
        <h2 className="text-md font-bold tracking-widest text-police-cyan uppercase">INTERROGATION ROOM // LOG STATEMENT</h2>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#11141a] border border-emerald-500 glow-cyan rounded-lg p-6 text-center space-y-4 shadow-lg"
          >
            <CheckCircle className="text-emerald-400 mx-auto animate-bounce" size={48} />
            <h3 className="text-lg font-bold text-white font-title tracking-widest uppercase">
              STATEMENT LOGGED SUCCESSFULLY
            </h3>
            
            <div className="bg-black/60 border border-[#1e2430] p-4 rounded text-xs leading-relaxed max-w-md mx-auto text-slate-300">
              <div className="flex justify-between border-b border-[#1e2430]/40 pb-1 mb-2 font-semibold">
                <span className="text-police-cyan">ASSIGNED CASE ID:</span>
                <span className="text-white">{caseId}</span>
              </div>
              <p>
                Your testimony has been ingested into our central indexes. A security agent will review your statements and initiate coordinates to trace your email channel within 24-48 solar cycles.
              </p>
            </div>

            <button
              onClick={() => setSubmitStatus(null)}
              className="px-4 py-2 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all font-bold tracking-wider rounded text-xs cursor-pointer uppercase"
            >
              Record New Statement
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="w-full bg-police-card border border-police-cardBorder rounded-lg p-6 space-y-5 shadow-lg relative glow-cyan"
          >
            {/* Header watermarks */}
            <div className="absolute top-4 right-4 text-[10px] text-slate-700 select-none">
              PD-FORM-504
            </div>

            <div className="text-[11px] text-slate-400 border-b border-[#1e2430] pb-2 leading-relaxed">
              <span className="text-police-amber font-bold uppercase block mb-1">INSTRUCTIONS FOR TESTIMONY:</span>
              Fill in all fields to log your details. Every entry is logged by IP surveillance. Fake information will be flagged by automated validator processes.
            </div>

            {submitStatus === 'error' && (
              <div className="bg-red-950/20 border border-red-900/40 p-3 rounded text-xs text-red-400 flex items-start space-x-2">
                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5 animate-pulse" />
                <span>
                  ERROR: Statement transmission failed. Socket routes might be congested. Verify your database connection.
                </span>
              </div>
            )}

            {/* Sender Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-[10px] text-police-cyan uppercase tracking-widest font-bold">
                1. SENDER ALIAS / FULL NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Identify yourself..."
                className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 text-xs focus:outline-none focus:border-police-cyan focus:shadow-[0_0_8px_#00f0ff] transition-all font-mono"
              />
            </div>

            {/* Sender Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] text-police-cyan uppercase tracking-widest font-bold">
                2. SENDER COMMUNICATION PORT / EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="operator@domain.com"
                className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 text-xs focus:outline-none focus:border-police-cyan focus:shadow-[0_0_8px_#00f0ff] transition-all font-mono"
              />
            </div>

            {/* Subject Dropdown */}
            <div className="space-y-1.5">
              <label htmlFor="subject" className="block text-[10px] text-police-cyan uppercase tracking-widest font-bold">
                3. INCIDENT CLASSIFICATION
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-[#11141a] border border-police-cardBorder rounded py-2 px-3 text-slate-300 text-xs focus:outline-none focus:border-police-cyan transition-all font-mono select-none cursor-pointer"
              >
                <option value="PROJECT_INQUIRY">PROJECT CONTRACT DISCUSSIONS</option>
                <option value="EMPLOYMENT_OFFER">TALENT ACQUISITION / HIRED AGENT</option>
                <option value="THREAT_REPORT">SYSTEM ANOMALY / BUG REPORT</option>
                <option value="ENCRYPTED_QUERY">GENERAL ENCRYPTED QUERY</option>
              </select>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-[10px] text-police-cyan uppercase tracking-widest font-bold">
                4. STATEMENT TESTIMONY / DETAILS
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Log details of your inquiry here..."
                className="w-full bg-black/60 border border-police-cardBorder rounded py-2 px-3 text-slate-200 text-xs focus:outline-none focus:border-police-cyan focus:shadow-[0_0_8px_#00f0ff] transition-all font-mono resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-police-cyan text-black hover:bg-white transition-all font-bold tracking-widest text-xs rounded shadow-[0_0_10px_rgba(0,240,255,0.2)] flex items-center justify-center space-x-2 cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING DOSSIER PACKETS...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>INGEST INTERROGATION TESTIMONY</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
