import React, { useState } from 'react';

const EditComment = ({ comment, onCancel, onEdit }) => {
  const [updatedDescription, setUpdatedDescription] = useState(comment.description);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: updatedDescription,
        }),
      });

      if (response.ok) {
        onEdit(comment._id, { description: updatedDescription });
      } else {
        console.error('Error al editar el comentario');
      }
    } catch (error) {
      console.error('Error al editar el comentario:', error);
    }
  };

  return (
    <div>
      <h4>Editar Comentario</h4>
      <form onSubmit={handleEditSubmit}>
        <label>
          Descripción:
          <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} required />
        </label>
        <button type="submit">Guardar Cambios</button>
        <button onClick={onCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditComment;
