// src/services/authService.js
const API_BASE_URL = 'https://localhost:7277';
const SIGNIN_ENDPOINT = '/signin';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}${SIGNIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data; // Retorne os dados que desejar, como o token de autenticação
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Propague o erro para o componente chamar
  }
};
