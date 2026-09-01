import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.post('/', protect, adminOnly, uploadImage);

export default router;
