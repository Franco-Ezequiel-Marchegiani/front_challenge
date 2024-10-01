import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useNavigateTo = () => {
    const navigate = useNavigate();
  
    // Crear una función de navegación que acepta una ruta como parámetro
    const navigateTo = useCallback((route: string) => {
      navigate(route);
    }, [navigate]);
  
    return navigateTo;
  };

export default useNavigateTo;