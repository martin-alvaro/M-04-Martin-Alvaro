import React from 'react';

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        onDelete(postId);
      } else {
        const errorData = await response.json();
        console.error('Error al eliminar la publicación:', errorData);
      }
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Eliminar Publicación</button>
    </div>
  );
};

export default DeletePost;
