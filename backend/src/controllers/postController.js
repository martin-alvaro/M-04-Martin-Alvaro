import Post from '../mongoDB/models/postModel.js';

export const createPost = async (req, res) => {
  try {
    console.log('Usuario autenticado:', req.user);

    const newPost = new Post({ ...req.body, author: req.user._id });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).json({ message: error.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      author: req.user._id,
    });

    if (!deletedPost) {
      return res.status(404).json({ message: 'Posteo no encontrado' });
    }

    res.status(200).json({ message: 'Posteo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
