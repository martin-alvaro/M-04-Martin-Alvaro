import React, { useState, useEffect } from 'react';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import '../css/ShowPosts.css';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);
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

  const handleEditClick = (postId) => {
    setEditingPost(postId);  
  };

  const handleEditCancel = () => {
    setEditingPost(null);  
  };

  return (
    <div className="show-posts-container">
      <h1>Publicaciones</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay publicaciones disponibles.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="post">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <img src={post.imageURL} alt={post.title} />
              {localStorage.getItem('userId') === post.author && (
                <React.Fragment>
                  {editingPost === post._id ? (
                    <EditPost post={post} onCancel={handleEditCancel} />
                  ) : (
                    <button style={{marginBottom:'10px'}} onClick={() => handleEditClick(post._id)}>Editar</button>
                  )}
                </React.Fragment>
              )}
              <DeletePost  postId={post._id} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowPosts;
