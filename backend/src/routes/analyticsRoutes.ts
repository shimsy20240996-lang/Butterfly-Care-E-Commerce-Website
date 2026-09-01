import { Router } from 'express';
import { getDashboardStats } from '../controllers/analyticsController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/dashboard', protect, adminOnly, getDashboardStats);

export default router;
