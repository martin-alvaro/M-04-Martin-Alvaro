import express from 'express';
import * as commentController from '../controllers/commentController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware.authenticateUser, commentController.createComment);
router.put('/:commentId', authMiddleware.authenticateUser, authMiddleware.authorizeComment, commentController.editComment);
router.delete('/:commentId', authMiddleware.authenticateUser, authMiddleware.authorizeComment, commentController.deleteComment);

export default router;
