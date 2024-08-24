import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Inicio from './pages/Inicio';
import Chat from './pages/Chat';
import Contas from './pages/Contas';
import Analises from './pages/Analises';
import Arquivos from './pages/Arquivos';
import Configuracoes from './pages/Configuracoes';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="flex-1 p-7">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/contas" element={<Contas />} />
              <Route path="/analises" element={<Analises />} />
              <Route path="/arquivos" element={<Arquivos />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
