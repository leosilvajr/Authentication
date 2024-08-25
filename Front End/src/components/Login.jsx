import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png'; 

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7277/signin', { username, password });
      localStorage.setItem('token', response.data.accessToken);
      onLogin();
      navigate('/', { state: { showToast: true } });
      
    } catch (err) {
      setError('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo da Aplicação" className="w-16 h-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium">Usuário</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium">Senha</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >Entrar
          </button>
          
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
