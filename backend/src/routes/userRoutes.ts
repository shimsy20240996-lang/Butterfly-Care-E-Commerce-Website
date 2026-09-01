import { Router } from 'express';
import { getUsersAdmin, getUserByIdAdmin } from '../controllers/userController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', protect, adminOnly, getUsersAdmin);
router.get('/:id', protect, adminOnly, getUserByIdAdmin);

export default router;
