// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cargar el usuario desde el token almacenado en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Llama a la API para obtener los datos del usuario si hay un token
      axios
        .get('http://localhost:5000/api/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  // Función para hacer login
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
      setUser(response.data.user);
      navigate('/'); // Redirige a la página principal
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Credenciales incorrectas');
    }
  };

  // Función para hacer logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);