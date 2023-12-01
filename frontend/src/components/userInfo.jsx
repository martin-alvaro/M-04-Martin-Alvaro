import React, { useState, useEffect } from 'react';
import '../css/userInfo.css'
import Header from './Header';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('UserId:', userId); 
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };
  
    fetchUserInfo();
  }, []);
  

  console.log('User:', user); 

  return (
    <body>
      <Header />
      <div className="user-profile-container">
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div className="user-details">
          <img className="user-avatar" src={user.avatarURL} alt={user.nameuser} />
          <p className="user-info">
            <span>Nombre de usuario:</span> {user.username}
          </p>
          <p className="user-info">
            <span>Correo electrónico:</span> {user.email}
          </p>
        </div>
      ) : (
        <p className="loading-message">Cargando información del usuario...</p>
      )}
    </div>
    </body>
  );
};

export default UserProfile;
