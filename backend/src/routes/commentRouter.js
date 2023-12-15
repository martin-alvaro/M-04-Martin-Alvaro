import express from 'express';
import * as commentController from '../controllers/commentController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:postId', authMiddleware.authenticateUser, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPost);
router.put('/:commentId', authMiddleware.authenticateUser, authMiddleware.authorizeComment, commentController.editComment);
router.delete('/:commentId', authMiddleware.authenticateUser, authMiddleware.authorizeComment, commentController.deleteComment);
router.get('/', commentController.getAllComments);

export default router;
