import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock API call - replace with actual API endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
    } catch (error) {
      // For demo purposes, use mock authentication
      if (email === 'admin@fleet.com' && password === 'admin123') {
        const mockUser = { id: '1', email, role: 'admin' as const };
        const mockToken = 'mock-admin-token';
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('authUser', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);
      } else if (email === 'user@fleet.com' && password === 'user123') {
        const mockUser = { id: '2', email, role: 'user' as const };
        const mockToken = 'mock-user-token';
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('authUser', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials. Try admin@fleet.com/admin123 or user@fleet.com/user123');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
