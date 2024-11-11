// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <header>
        {user ? (
          <>
            <span>Bienvenido, {user.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
      <h1>Hola. ¿Qué vas a pedir hoy?</h1>
      <nav>
        <Link to="/category/restaurantes">Restaurantes</Link>
        <Link to="/category/mercados">Mercados</Link>
        <Link to="/category/heladerias">Heladerías</Link>
        <Link to="/category/bodegas">Bodegas</Link>
      </nav>
    </div>
  );
};

export default HomePage;