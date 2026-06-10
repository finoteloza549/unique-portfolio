import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

// Dynamic backend URL resolver (useful for local development vs production deployment)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsersCount, setActiveUsersCount] = useState(1);
  const location = useLocation();

  useEffect(() => {
    // Connect to the socket server
    const newSocket = io(BACKEND_URL, {
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    newSocket.on('connect', () => {
      console.log('Tactical terminal linked to Surveillance Center. ID:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Surveillance connection lost.');
      setIsConnected(false);
    });

    newSocket.on('active-count', (count) => {
      setActiveUsersCount(count);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Track page views automatically on location changes
  useEffect(() => {
    if (socket && isConnected) {
      // Exclude admin pages from general visitor tracking metrics if desired,
      // or track everything to show full system interactions.
      const pageData = {
        path: location.pathname,
        title: document.title,
        referer: document.referrer || 'Direct Access',
      };
      
      socket.emit('page-view', pageData);
    }
  }, [location, socket, isConnected]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, activeUsersCount }}>
      {children}
    </SocketContext.Provider>
  );
};
