'use client';

import React, { useState } from 'react';
import { Review } from '@/types';
import { api } from '@/lib/api';
import { useToastStore } from '@/context/toastStore';
import { useAuthStore } from '@/context/authStore';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductReviewsProps {
  productId: string;
  initialReviews: Review[];
  rating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  initialReviews,
  rating,
  reviewCount
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formComment.trim()) {
      showToast('Please fill out the review title and comments.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await api.post<{ success: boolean; review: Review }>('/reviews', {
        productId,
        rating: formRating,
        title: formTitle,
        comment: formComment,
        userName: user?.name || formName || 'Loving Mom',
        userEmail: user?.email || formEmail || ''
      });

      if (data && data.review) {
        setReviews([data.review, ...reviews]);
        showToast('Thank you! Your review has been published.');
        setIsModalOpen(false);
        setFormTitle('');
        setFormComment('');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to submit review.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 border-t border-butterfly-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-butterfly-text">
            Customer Reviews ({reviews.length})
          </h3>
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-butterfly-text">{rating} out of 5</span>
            <span className="text-xs text-butterfly-textMuted">Based on verified orders</span>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-butterfly-soft border border-butterfly-border text-butterfly-text text-xs font-bold uppercase tracking-wider transition-all shadow-soft self-start md:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4 text-butterfly-primary" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-butterfly-border shadow-soft flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-butterfly-textMuted">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="font-serif text-sm font-semibold text-butterfly-text">
                  {rev.title}
                </h4>

                <p className="text-xs text-butterfly-textMuted leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-butterfly-text font-medium pt-3 border-t border-butterfly-border/40">
                <span>{rev.userName}</span>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] text-butterfly-textMuted font-normal">Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-butterfly-border">
          <p className="text-sm text-butterfly-text">No reviews yet for this product.</p>
          <p className="text-xs text-butterfly-textMuted mt-1">
            Be the first mother to share your experience with this item!
          </p>
        </div>
      )}

      {/* Write Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-butterfly-text/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-card border border-butterfly-border p-6 sm:p-8 z-10"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-butterfly-border">
                <h3 className="font-serif text-lg font-bold text-butterfly-text">Write a Review</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full hover:bg-butterfly-soft"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">Your Rating</label>
                  <div className="flex gap-2 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formRating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {!user && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-butterfly-text mb-1">Your Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Dilani P."
                        className="w-full text-xs p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-butterfly-text mb-1">Email (Private)</label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full text-xs p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Incredibly soft and pure quality!"
                    className="w-full text-xs p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Share how this product felt for you and your little one..."
                    className="w-full text-xs p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-butterfly-primary text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-butterfly-primaryHover shadow-card disabled:opacity-60"
                >
                  {isSubmitting ? 'Publishing...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
