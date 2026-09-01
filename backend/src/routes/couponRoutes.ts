import { Router } from 'express';
import {
  validateCoupon,
  getCouponsAdmin,
  createCouponAdmin,
  updateCouponAdmin,
  deleteCouponAdmin
} from '../controllers/couponController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.post('/validate', validateCoupon);
router.get('/', protect, adminOnly, getCouponsAdmin);
router.post('/', protect, adminOnly, createCouponAdmin);
router.put('/:id', protect, adminOnly, updateCouponAdmin);
router.delete('/:id', protect, adminOnly, deleteCouponAdmin);

export default router;
