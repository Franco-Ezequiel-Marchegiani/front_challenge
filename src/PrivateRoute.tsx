import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

interface PrivateRouteProps {
  element: JSX.Element; // Componente a renderizar
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { token } = useAuth(); // Obtener el token desde el contexto

  // Redirigir si no hay token
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
