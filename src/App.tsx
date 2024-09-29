import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Detail from './components/Detail';

const App: React.FC =() => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Detail" element={<Detail />} />
        </Routes>
    </BrowserRouter>
    
  );
}

export default App;
