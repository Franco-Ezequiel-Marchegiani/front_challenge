// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define el tipo de los datos que vas a manejar en el contexto
interface AuthContextType {
  token: string | null;
  login: (newToken: string) => void; // Añadir la función login
  logout: () => void; // Añadir la función logout
}

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Cargar el token desde localStorage al iniciar el componente
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken); // Establecer el token si existe
    }
  }, []);

  const logout = () => {
    setToken(null); // Limpiar token del estado
    localStorage.removeItem('token'); // Limpiar token de localStorage
  };

  const login = (newToken: string) => {
    setToken(newToken); // Guardar el nuevo token
    localStorage.setItem('token', newToken); // Guardar token en localStorage
  };

  return (
    <AuthContext.Provider value={{ token, logout, login }}>
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