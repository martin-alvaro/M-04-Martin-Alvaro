import React, { useState } from 'react';
import '../css/editPost.css'

const EditPost = ({ post, onCancel }) => {
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    description: post.description,
    imageURL: post.imageURL,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedPost),
      });

      if (response.ok) {
        window.location.reload(); 
        onCancel();
      } else {
        const errorData = await response.json();
        console.error('Error al editar la publicación:', errorData);
      }
    } catch (error) {
      console.error('Error al editar la publicación:', error);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Editar Publicación</h2>
      <form className="edit-post-form" onSubmit={handleEditSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input type="text" name="title" value={editedPost.title} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea name="description" value={editedPost.description} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>URL de la Imagen:</label>
          <input type="text" name="imageURL" value={editedPost.imageURL} onChange={handleInputChange} />
        </div>

        <div className="form-buttons">
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
