import React, { useState, useEffect } from 'react';
import DeletePost from './DeletePost';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener elementos:', error);
        setError('Error al obtener elementos');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <h1>Publicaciones</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <img src={post.imageURL} alt={post.title} />
            <DeletePost postId={post._id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPosts;
