import Comment from '../mongoDB/models/commentModel.js';

export const createComment = async (req, res) => {
  try {
    const newComment = new Comment({ ...req.body, author: req.user._id });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { ...req.body, author: req.user._id },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.status(500).json({ message: error.message });
  }
};
