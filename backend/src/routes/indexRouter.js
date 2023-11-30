import express from 'express';
import userRoutes from './userRouter.js';
import postRoutes from './postRouter.js';
import commentRoutes from './commentRouter.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

export default router;
