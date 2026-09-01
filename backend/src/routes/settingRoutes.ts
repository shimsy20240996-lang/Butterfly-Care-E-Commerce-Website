import { Router } from 'express';
import { getPublicSettings, updateSettingsAdmin } from '../controllers/settingController';
import { protect, adminOnly } from '../middleware/auth';

const router = Router();

router.get('/', getPublicSettings);
router.put('/', protect, adminOnly, updateSettingsAdmin);

export default router;
