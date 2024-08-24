import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menus = [
  { title: "Início", src: "Chart_fill", path: "/" },
  { title: "Chat", src: "Chat", path: "/chat" },
  { title: "Contas", src: "User", path: "/contas", gap: true },
  { title: "Analises", src: "Chart", path: "/analises" },
  { title: "Arquivos", src: "Folder", path: "/arquivos", gap: true },
  { title: "Configurações", src: "Setting", path: "/configuracoes" },
  { title: "Sair", src: "Logout", path: "/login", isLogout: true }, 
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('https://localhost:7277/revoke', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        const message = await response.text();
        alert(message); // Exibe a mensagem de logoff bem-sucedido
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
            onClick={menu.isLogout ? handleLogout : undefined} // Chama a função de logout se for o botão "Sair"
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
    </div>
  );
  
};

export default Sidebar;
