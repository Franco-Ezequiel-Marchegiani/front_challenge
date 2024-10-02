// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
  token: string | null;
  email: string | null;
  login: (data: { token: string; email: string }) => void;
  logout: () => void; // Añadir la función logout
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Cargar el token desde localStorage al iniciar el componente
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  const logout = () => {
    setToken(null); // Limpiar token del estado
    setEmail(null);
    localStorage.removeItem('token'); // Limpiar token de localStorage
    localStorage.removeItem('email');

  };

  const login = ({ token, email }: { token: string; email: string }) => {
    setToken(token);
    setEmail(email);

    localStorage.setItem('token', token);
    localStorage.setItem('email', email);

  };

  return (
    <AuthContext.Provider value={{ token, email, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crea un hook para usar el contexto más fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};