import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CriarConta = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    const newUser = {
      UserName: username,
      FullName: fullName,
      Password: password,
    };

    try {
      await axios.post('https://localhost:7277/signup', newUser);
      navigate('/contas'); // Volta para a página Contas após salvar
    } catch (err) {
      console.error('Erro ao criar conta:', err.response ? err.response.data : err.message);
    }
  };

  const handleBack = () => {
    navigate('/contas'); // Volta para a página Contas
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Criar Conta</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Nome de Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Nome Completo
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CriarConta;
