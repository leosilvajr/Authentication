import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Inicio from './pages/Inicio/Inicio';
import Chat from './pages/Chat/Chat';
import Contas from './pages/Contas/Contas';
import Analises from './pages/Analises/Analises';
import Arquivos from './pages/Arquivos/Arquivos';
import Configuracoes from './pages/Configuracoes/Configuracoes';
import CriarConta from './pages/Contas/CriarConta'; // Importando o novo componente

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
              <Route path="/criarconta" element={<CriarConta />} /> {/* Adicionando a nova rota */}
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
