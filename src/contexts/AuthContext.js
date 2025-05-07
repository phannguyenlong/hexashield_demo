// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Authentication Context
const AuthContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize auth state from localStorage on load
  useEffect(() => {
    const user = localStorage.getItem('hexashield_user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setError('');
    
    try {
      // In a real app, this would be an API call to your backend
      // For demo, we'll use mock credentials
      if (email === 'admin@hexashield.com' && password === 'admin123') {
        const user = {
          id: '1',
          name: 'Admin User',
          email: 'admin@hexashield.com',
          role: 'administrator',
          company: 'HexaShield',
        };
        
        setCurrentUser(user);
        localStorage.setItem('hexashield_user', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hexashield_user');
  };

  const value = {
    currentUser,
    login,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

