import { Router } from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  toggleWishlist,
  forgotPassword
} from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/wishlist/:productId', protect, toggleWishlist);

export default router;
