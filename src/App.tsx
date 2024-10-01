import React from 'react';
import './styles/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';
import Registro from './components/Registro';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './PrivateRoute';

const App: React.FC =() => {

  const { token } = useAuth();
  console.log(token);
  
  return (
    <BrowserRouter>
        <Routes>
          {/* Redirigir a Home si el usuario ya está autenticado */}
          <Route 
            path="/login" 
            element={token ? <Navigate to="/" replace /> : <Login />} 
          />
          <Route 
            path="/signin" 
            element={token ? <Navigate to="/" replace /> : <Registro />} 
          />
          {/* Usamos PrivateRoute dentro de Route, y le pasamos el componente como elemento */}
          <Route
            path="/"
            element={
              <PrivateRoute element={<Home />} />
            }
          />
          <Route
            path="/Detail/:id"
            element={
              <PrivateRoute element={<Detail />} />
            }
          />
            
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
