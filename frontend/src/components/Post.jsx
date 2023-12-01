import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/CreatePost.css'
import Header from './Header'

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      setError('Error al obtener publicaciones');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          imageURL,
        }),
      });

      if (response.ok) {
        fetchPosts();
        setTitle('');
        setDescription('');
        setImageURL('');
        navigate('/home');

      } else {
        const errorData = await response.json();
        console.error('Error al crear la publicación:', errorData);
        setError(errorData.message || 'Error al crear la publicación');
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      setError('Error al crear la publicación');
    }
  };

  return (
    <body>
      <Header />
      <div className="create-post-container">
      <h1>Crear Publicación</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="create-post-form" onSubmit={handleSubmit}>
        <label>
          <p>Título</p>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </label>
        
        <label>
          <p>Descripción</p>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="4"/>
        </label>
        
        <label>
          <p>URL de la Imagen</p>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </label>
        <button type="submit">Crear Publicación</button>
      </form>
    </div>
    </body>
    
  );
};

export default CreatePost;
