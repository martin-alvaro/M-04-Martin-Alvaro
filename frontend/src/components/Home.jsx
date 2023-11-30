import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

function Home() {
  return (
    <div>
      <Login/ >
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>.</p>
    </div>
  );
}

export default Home;
