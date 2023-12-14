import express from 'express';
import * as postController from '../controllers/postController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware.authenticateUser, postController.createPost);
router.delete('/:postId', authMiddleware.authenticateUser, authMiddleware.authorizePost, postController.deletePost);
router.put('/:postId', authMiddleware.authenticateUser, authMiddleware.authorizePost, postController.editPost);
router.get('/', postController.getAllPosts);

export default router;
