import React, { useState } from 'react';

const AddComment = ({ postId, fetchComments }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        setDescription('');
        setError('');
        
        fetchComments();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al agregar comentario');
      }
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      setError('Error al agregar comentario');
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <label>
          <p>Descripción del comentario</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Comentario</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddComment;
