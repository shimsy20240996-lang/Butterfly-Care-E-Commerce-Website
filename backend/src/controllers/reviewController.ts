import { Request, Response } from 'express';
import { store, InMemoryReview } from '../config/store';
import { AuthRequest } from '../middleware/auth';

// @desc    Get approved reviews for a product
// @route   GET /api/reviews/product/:productId
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = store.reviews.filter(
      r => (r.product === productId) && r.status === 'approved'
    );

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit a review for a product
// @route   POST /api/reviews
export const createReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, rating, title, comment, userName, userEmail } = req.body;

    if (!productId || !rating || !comment || !title) {
      res.status(400).json({ success: false, message: 'Rating, title, and review comments are required.' });
      return;
    }

    const name = req.user ? req.user.name : (userName || 'Loving Mom');
    const email = req.user ? req.user.email : (userEmail || '');

    const newReview: InMemoryReview = {
      _id: `rev-${Date.now()}`,
      product: productId,
      user: req.user ? req.user.id : undefined,
      userName: name,
      userEmail: email,
      rating: Math.min(5, Math.max(1, Number(rating))),
      title: title.trim(),
      comment: comment.trim(),
      verifiedPurchase: true,
      status: 'approved', // Auto-approved for immediate smooth experience
      createdAt: new Date().toISOString()
    };

    store.reviews.unshift(newReview);

    // Recalculate product rating & review count
    const prod = store.products.find(p => p._id === productId);
    if (prod) {
      const prodReviews = store.reviews.filter(r => r.product === productId && r.status === 'approved');
      const sum = prodReviews.reduce((acc, r) => acc + r.rating, 0);
      prod.rating = Number((sum / prodReviews.length).toFixed(1));
      prod.reviewCount = prodReviews.length;
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been published.',
      review: newReview
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews/admin/all
export const getAllReviewsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviewsWithProduct = store.reviews.map(r => {
      const prod = store.products.find(p => p._id === r.product);
      return {
        ...r,
        productName: prod ? prod.name : 'Unknown Product',
        productImage: prod && prod.images.length > 0 ? prod.images[0] : ''
      };
    });

    res.status(200).json({
      success: true,
      count: reviewsWithProduct.length,
      reviews: reviewsWithProduct
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update review status (Admin approve/reject)
// @route   PUT /api/reviews/:id/status
export const updateReviewStatusAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const review = store.reviews.find(r => r._id === id);
    if (!review) {
      res.status(404).json({ success: false, message: 'Review not found.' });
      return;
    }

    review.status = status;

    res.status(200).json({
      success: true,
      message: `Review marked as ${status}.`,
      review
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete review (Admin)
// @route   DELETE /api/reviews/:id
export const deleteReviewAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.reviews.findIndex(r => r._id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Review not found.' });
      return;
    }

    store.reviews.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
