import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts
} from '../controllers/productController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/admin/low-stock', protect, adminOnly, getLowStockProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
