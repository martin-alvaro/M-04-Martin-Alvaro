import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';


function Header() {
  return (
    <div className="header-container">
      <nav>
        <ul className="header-nav">
          <li className="header-item">
            <Link to="/createpost" className="header-link">Crear Publicación</Link>
          </li>
          <li className="header-item">
            <Link to="/home" className="header-link">Publicaciones</Link>
          </li>
          <li className="header-item">
            <Link to="/profile" className="header-link">👤</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
