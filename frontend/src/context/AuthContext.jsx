import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('delivery-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('delivery-token'));

  useEffect(() => {
    if (user) {
      localStorage.setItem('delivery-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('delivery-user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('delivery-token', token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      localStorage.removeItem('delivery-token');
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
