import { Router } from 'express';
import {
  getProductReviews,
  createReview,
  getAllReviewsAdmin,
  updateReviewStatusAdmin,
  deleteReviewAdmin
} from '../controllers/reviewController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/product/:productId', getProductReviews);
router.post('/', createReview);
router.get('/admin/all', protect, adminOnly, getAllReviewsAdmin);
router.put('/:id/status', protect, adminOnly, updateReviewStatusAdmin);
router.delete('/:id', protect, adminOnly, deleteReviewAdmin);

export default router;
