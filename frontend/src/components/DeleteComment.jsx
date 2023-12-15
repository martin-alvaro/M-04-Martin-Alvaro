import React from 'react';

const DeleteComment = ({ commentId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete(commentId);
      } else {
        console.error('Error al eliminar el comentario');
      }
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Eliminar Comentario</button>
    </div>
  );
};

export default DeleteComment;
