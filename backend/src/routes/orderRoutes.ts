import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderByNumber,
  getOrderById,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  markWhatsAppOpened
} from '../controllers/orderController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.post('/', createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/track/:orderNumber', getOrderByNumber);
router.get('/admin/all', protect, adminOnly, getAllOrdersAdmin);
router.get('/:id', getOrderById);
router.put('/:id/status', protect, adminOnly, updateOrderStatusAdmin);
router.put('/:id/whatsapp-opened', markWhatsAppOpened);

export default router;
