import { Request, Response } from 'express';
import { store } from '../config/store';

// @desc    Get store public settings
// @route   GET /api/settings
export const getPublicSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      settings: store.settings
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update store settings (Admin)
// @route   PUT /api/settings
export const updateSettingsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const update = req.body;
    store.settings = {
      ...store.settings,
      ...update
    };

    res.status(200).json({
      success: true,
      message: 'Store settings updated successfully!',
      settings: store.settings
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
