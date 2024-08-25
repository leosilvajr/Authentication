import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Contas = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7277/getUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar os usuários');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate('/criarconta'); // Redireciona para a página de criação de conta
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contas</h1>
      <button
        onClick={handleAddUser}
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition-colors duration-300"
      >
        Incluir
      </button>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Usuário</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Nome Completo</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Senha</th>
            <th className="px-4 py-2 border-b-2 border-gray-200 text-left">Expiração do Token</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 border-b border-gray-200">{user.userName}</td>
              <td className="px-4 py-2 border-b border-gray-200">{user.fullName}</td>
              <td className="px-4 py-2 border-b border-gray-200">********</td>
              <td className="px-4 py-2 border-b border-gray-200">
                {new Date(user.refreshTokenExpiryTime).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contas;
