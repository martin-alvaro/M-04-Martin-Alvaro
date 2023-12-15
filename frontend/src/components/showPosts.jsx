import React, { useState, useEffect } from 'react';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import AddComment from './AddComment';
import '../css/ShowPosts.css';

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/comments/${postId}`);
      const data = await response.json();
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, comments: data } : post))
      );
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

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
  }, [editingPost]);

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
                    <button style={{ marginBottom: '10px' }} onClick={() => handleEditClick(post._id)}>
                      Editar
                    </button>
                  )}
                </React.Fragment>
              )}
              <DeletePost postId={post._id} onDelete={handleDelete} />
              <h4>Comentarios:</h4>
              <ul>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <li key={comment._id}>{comment.description}</li>
                  ))
                ) : (
                  <p>No hay comentarios.</p>
                )}
              </ul>
              <AddComment postId={post._id} fetchComments={() => fetchComments(post._id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowPosts;
