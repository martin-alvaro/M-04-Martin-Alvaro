import Comment from '../mongoDB/models/commentModel.js';

export const createComment = async (req, res) => {
  try {
    const { description } = req.body;

    const newComment = new Comment({
      description,
      author: req.user._id,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    console.log('Fetching comments for post ID:', postId);

    const comments = await Comment.find({ postId: postId });

    console.log('Comments retrieved:', comments);

    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: error.message });
  }
};




export const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const { description } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar el comentario', error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      author: req.user._id,
    });

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
