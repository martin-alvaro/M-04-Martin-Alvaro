import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        navigate('/login');
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
    <div>
      <h1>Registro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
  <label>
    Usuario:
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
  </label>
  <br />
  <label>
    Contraseña:
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  </label>
  <br />
  <label>
    Correo electrónico:
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
  </label>
  <br />
  <label>
    URL del avatar:
    <input type="text" value={avatarURL} onChange={(e) => setAvatarURL(e.target.value)} required />
  </label>
  <br />
  <button type="submit">Registrar</button>
</form>

    </div>
  );
};

export default Register;
