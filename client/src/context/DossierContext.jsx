import React, { createContext, useContext, useState, useEffect } from 'react';
import { suspectData as staticSuspectData } from '../data/suspectData';

const DossierContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const DossierProvider = ({ children }) => {
  const [dossier, setDossier] = useState(staticSuspectData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic portfolio data from server
  const fetchDossier = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/suspect-data`);
      if (response.ok) {
        const data = await response.json();
        setDossier(data);
      } else {
        console.warn('[DOSSIER] Server returned non-ok status, falling back to static data.');
      }
    } catch (err) {
      console.warn('[DOSSIER] Failed to communicate with server, using local data backup.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDossier();
  }, []);

  // Update dynamic portfolio data on server
  const updateDossier = async (updatedData, token) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/suspect-data`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const resJson = await response.json();
        setDossier(resJson.data);
        return { success: true };
      } else {
        const errJson = await response.json();
        return { success: false, error: errJson.error || 'Failed to save updates.' };
      }
    } catch (err) {
      console.error('[DOSSIER] Network failure during update:', err);
      return { success: false, error: 'Database link lost. Check server connection.' };
    }
  };

  return (
    <DossierContext.Provider value={{ dossier, updateDossier, isLoading, refreshDossier: fetchDossier }}>
      {children}
    </DossierContext.Provider>
  );
};

export const useDossier = () => {
  const context = useContext(DossierContext);
  if (!context) {
    throw new Error('useDossier must be used within a DossierProvider');
  }
  return context;
};
