import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Inicio = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.showToast) {
      toast.success('Login realizado com sucesso.', {
        position: 'top-center',
        autoClose: 2500,
      });
    }
  }, [location.state]);

  return (
    <div>
      <h1>Início</h1>
      <h4>Bem-vindo ao nosso sistema. Aqui você pode encontrar várias funcionalidades para gerenciar suas atividades.</h4>
      <p>Use o menu à esquerda para navegar entre as diferentes páginas do sistema.</p>
      <ToastContainer /> {/* Coloque o ToastContainer aqui também */}
    </div>
  );
};

export default Inicio;
