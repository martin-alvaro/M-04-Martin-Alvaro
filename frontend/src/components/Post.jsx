import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

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
        navigate('/post');

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
    <div>
      <h1>Publicaciones</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Descripción:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          URL de la Imagen:
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </label>
        <br />
        <button type="submit">Crear Publicación</button>
      </form>
    </div>
  );
};

export default CreatePost;
