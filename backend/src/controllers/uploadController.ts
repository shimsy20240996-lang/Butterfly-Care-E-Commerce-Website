import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if credentials provided
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

// @desc    Upload an image (Cloudinary or Base64/Data URI fallback)
// @route   POST /api/upload
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image, folder = 'butterfly-care' } = req.body;

    if (!image) {
      res.status(400).json({ success: false, message: 'Please provide an image payload (URL or base64 data string).' });
      return;
    }

    // If it is already a public HTTP/HTTPS URL, return it directly
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      res.status(200).json({
        success: true,
        url: image
      });
      return;
    }

    // If Cloudinary is configured with real keys, upload to Cloudinary
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'butterflycare' &&
      process.env.CLOUDINARY_API_KEY !== 'mock_key'
    ) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder,
        resource_type: 'image'
      });

      res.status(200).json({
        success: true,
        url: uploadResponse.secure_url
      });
      return;
    }

    // Otherwise, return the base64 or high-res mock image URL
    res.status(200).json({
      success: true,
      url: image.startsWith('data:image') ? image : `https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Image upload failed.' });
  }
};
