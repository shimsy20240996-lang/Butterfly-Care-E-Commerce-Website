'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Review } from '@/types';
import { Star, CheckCircle, Trash2, Check, ShieldAlert } from 'lucide-react';

export default function AdminReviewsPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await api.get<{ reviews: Review[] }>('/reviews/admin/all');
      if (data && data.reviews) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/reviews/${id}/status`, { status });
      showToast(`Review status updated to ${status}!`);
      setReviews(reviews.map((r) => (r._id === id ? { ...r, status: status as any } : r)));
    } catch (err: any) {
      showToast(err.message || 'Failed to update review status.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      showToast('Review removed.');
      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err: any) {
      showToast(err.message || 'Failed to delete review.', 'error');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3EF]">
        <div className="text-center p-8 bg-white rounded-3xl">
          <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto mb-2" />
          <p className="font-bold text-butterfly-text">Admin Access Required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EF] flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-6 overflow-y-auto">
        <div className="pb-4 border-b border-butterfly-border">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
            Customer Reviews Moderation
          </h1>
          <p className="text-xs text-butterfly-textMuted mt-1">
            Approve, monitor, and moderate customer product feedback.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-serif font-bold text-sm text-butterfly-text">{rev.title}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {rev.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xs text-butterfly-textMuted leading-relaxed">{rev.comment}</p>

                <div className="flex items-center gap-2 text-[11px] text-butterfly-text font-medium pt-1">
                  <span>Reviewed by: <strong>{rev.userName}</strong></span>
                  <span>•</span>
                  <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                  {rev.productName && (
                    <>
                      <span>•</span>
                      <span className="text-butterfly-primary font-semibold">Product: {rev.productName}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {rev.status !== 'approved' && (
                  <button
                    onClick={() => handleUpdateStatus(rev._id, 'approved')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(rev._id)}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
