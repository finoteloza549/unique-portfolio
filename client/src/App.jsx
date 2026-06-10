import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import CRTLayout from './components/CRTLayout';

// Import Pages
import Landing from './pages/Landing';
import WantedPoster from './pages/WantedPoster';
import CaseFiles from './pages/CaseFiles';
import EvidenceLocker from './pages/EvidenceLocker';
import Timeline from './pages/Timeline';
import Contact from './pages/Contact';
import Headquarters from './pages/Headquarters';

function App() {
  return (
    <Router>
      <SocketProvider>
        <CRTLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<WantedPoster />} />
            <Route path="/cases" element={<CaseFiles />} />
            <Route path="/evidence" element={<EvidenceLocker />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/headquarters" element={<Headquarters />} />
          </Routes>
        </CRTLayout>
      </SocketProvider>
    </Router>
  );
}

export default App;
