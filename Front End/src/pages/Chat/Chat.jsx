import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
  const showToast = () => {
    toast.success("Bem Vindo!", {
      position: "top-center", // Especifica a posição diretamente
      autoClose: 3000,
    });
  };

  return (
    <div>
      <h1>Chat</h1>
      <button
        onClick={showToast}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Clique Aqui
      </button>
      <ToastContainer />
    </div>
  );
};

export default Chat;
