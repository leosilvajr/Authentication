import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menus = [
  { title: "Início", src: "Chart_fill", path: "/" },
  { title: "Chat", src: "Chat", path: "/chat" },
  { title: "Contas", src: "User", path: "/contas", gap: true },
  { title: "Analises", src: "Chart", path: "/analises" },
  { title: "Arquivos", src: "Folder", path: "/arquivos", gap: true },
  { title: "Configurações", src: "Setting", path: "/configuracoes" },
  { title: "Sair", src: "Logout", path: "#", isLogout: true }, // Alterado para "#" para evitar navegação
];

const Sidebar = ({ open, setOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (logout) {
      try {
        const response = await fetch('https://localhost:7277/revoke', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const message = await response.text();
          localStorage.removeItem('token'); // Remove o token de autenticação

          // Após o token ser removido, redireciona o usuário para a tela de login
          navigate('/login');
          window.location.reload(); // Recarrega a página para garantir que todas as informações sejam resetadas
        } else {
          alert('Falha ao realizar o logoff. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao se comunicar com o servidor:', error);
        alert('Erro ao tentar se comunicar com o servidor.');
      }
      setLogout(false); // Resetar o estado
    } else {
      setShowModal(true); // Exibir o modal de confirmação
    }
  };

  const handleConfirmLogout = () => {
    setLogout(true);
    handleLogout(); // Chama a função de logout
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Oculta o modal de confirmação
  };

  return (
    <div className={` ${open ? "w-72" : "w-20"} bg-gray-800 h-screen p-5 pt-8 relative duration-300`}>
      <img
        src="./src/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-700
        border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt="Toggle Sidebar"
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt="Logo"
        />
        <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"} ml-4`}>
          Authentication
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-gray-700 text-gray-300 text-sm items-center gap-x-4
            ${menu.gap ? "mt-9" : "mt-2"} ${location.pathname === menu.path ? "bg-gray-700" : ""}`}
            onClick={menu.isLogout ? () => handleLogout() : undefined} // Chama a função de logout se for o botão "Sair"
          >
            <Link to={menu.path} className="flex items-center w-full h-full gap-x-4">
              <img src={`./src/assets/${menu.src}.png`} alt={menu.title} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Confirmação</h2>
      <p className="text-center text-gray-600 mb-8">Deseja desconectar o usuário atual?</p>
      <div className="flex justify-center gap-6">
        <button
          className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300"
          onClick={handleConfirmLogout}
        >
          Sim, Desconectar
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-5 py-2 rounded-full font-semibold hover:bg-gray-400 transition duration-300"
          onClick={handleCancelLogout}
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Sidebar;
