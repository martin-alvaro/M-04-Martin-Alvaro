import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          avatarURL,
        }),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        if (errorData.error) {
          setError('El correo electrónico ya está registrado');
        } else {
          setError(errorData.message || 'Error al registrar usuario');
        }
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setError('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Registro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          <p>Usuario</p>
          <input className="register-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>

        <label>
          <p>Contraseña</p>
          <input className="register-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>

        <label>
          <p>Correo electrónico</p>
          <input className="register-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </label>

        <label>
          <p>URL del avatar</p>
          <input className="register-input" type="text" value={avatarURL} onChange={(e) => setAvatarURL(e.target.value)} required/>
        </label>
        
        <button className="register-button" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
