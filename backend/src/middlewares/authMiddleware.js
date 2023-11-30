import jwt from 'jsonwebtoken';
import User from '../mongoDB/models/usersModels.js';  
import Post from '../mongoDB/models/postModel.js';
import Comment from '../mongoDB/models/commentModel.js';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      console.log('Token no proporcionado');
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decodedToken = jwt.verify(token, 'secretKey'); 
    req.user = await User.findById(decodedToken.userId);

    console.log('Usuario autenticado:', req.user);

    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'Autenticación fallida' });
  }
};



export const authorizePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    console.log('Usuario autenticado:', req.user);
    console.log('Post encontrado:', post);

    if (!post || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const authorizeComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
