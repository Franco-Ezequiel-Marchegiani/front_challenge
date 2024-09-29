import React from 'react';
import './styles/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';
import Registro from './components/Registro';

const App: React.FC =() => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/signin" element={<Registro />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
