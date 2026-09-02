'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Product, Review } from '@/types';
import { api } from '@/lib/api';
import { formatLKR } from '@/lib/currency';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useToastStore } from '@/context/toastStore';
import { useSettingsStore } from '@/context/settingsStore';
import { generateWhatsAppLink } from '@/lib/utils';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductDetailSkeleton } from '@/components/ui/Skeleton';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  MessageCircle,
  ShieldCheck,
  Truck,
  RefreshCw,
  Minus,
  Plus,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [mainImgSrc, setMainImgSrc] = useState('/products/img1.webp');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const { addItem, openDrawer } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useToastStore();
  const { settings } = useSettingsStore();

  useEffect(() => {
    if (!slug) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const data = await api.get<{
          product: Product;
          relatedProducts: Product[];
          reviews: Review[];
        }>(`/products/slug/${slug}`);

        if (data && data.product) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setReviews(data.reviews || []);
          if (data.product.sizes && data.product.sizes.length > 0) {
            setSelectedSize(data.product.sizes[0]);
          }
          if (data.product.colors && data.product.colors.length > 0) {
            setSelectedColor(data.product.colors[0]);
          }
          setSelectedImage(0);
          setMainImgSrc(data.product.images?.[0] || '/products/img1.webp');
          setQuantity(1);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]);

  useEffect(() => {
    if (product && product.images && product.images[selectedImage]) {
      setMainImgSrc(product.images[selectedImage]);
    }
  }, [product, selectedImage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-butterfly-text">Product Not Found</h2>
        <p className="text-sm text-butterfly-textMuted mt-2">
          The item you are looking for might be discontinued or unavailable.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex px-6 py-3 rounded-full bg-butterfly-primary text-white text-xs font-bold uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const currentPrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: mainImgSrc,
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity,
      selectedSize: selectedSize || (product.sizes?.[0] || ''),
      selectedColor: selectedColor || (product.colors?.[0] || ''),
      sku: product.sku,
      maxStock: product.stock
    });

    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openDrawer();
    router.push('/checkout');
  };

  // WhatsApp Inquiry link
  const whatsappNumber = settings.whatsappNumber || '+94 74 022 5855';
  const whatsappText = `Hello, I'm interested in ${product.name} (SKU: ${product.sku}). Is this product available?`;
  const whatsappUrl = generateWhatsAppLink(whatsappNumber, whatsappText);

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-butterfly-textMuted mb-8">
          <Link href="/" className="hover:text-butterfly-primary">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-butterfly-primary">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-butterfly-primary">
            {product.categoryName || 'Care Essentials'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-butterfly-text font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Product Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-butterfly-border shadow-soft">
          {/* LEFT: Multi-image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Main Image */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-butterfly-border shadow-soft group">
              <Image
                src={mainImgSrc}
                alt={product.name}
                fill
                priority
                onError={() => setMainImgSrc('/products/img1.webp')}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Wishlist Button on image */}
              <button
                onClick={() => {
                  const added = toggleWishlist(product._id);
                  showToast(added ? 'Saved to Wishlist!' : 'Removed from Wishlist');
                }}
                className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-colors shadow-card ${
                  inWishlist
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-white/90 text-butterfly-text hover:bg-white hover:text-rose-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-butterfly-primary shadow-sm scale-105'
                        : 'border-butterfly-border/70 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-butterfly-primary">
                  {product.categoryName || 'Care Essential'}
                </span>
                <span className="text-xs font-mono text-butterfly-textMuted">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text leading-snug">
                {product.name}
              </h1>

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-2.5 pt-1">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-butterfly-text">{product.rating}</span>
                <span className="text-xs text-butterfly-textMuted font-medium">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            {/* Price Card */}
            <div className="p-4 rounded-2xl bg-butterfly-soft/40 border border-butterfly-border flex items-baseline gap-4">
              <span className="text-2xl sm:text-3xl font-bold text-butterfly-text">
                {formatLKR(currentPrice)}
              </span>
              {product.discountPrice && (
                <>
                  <span className="text-base text-butterfly-textMuted line-through">
                    {formatLKR(product.price)}
                  </span>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    Save {formatLKR(product.price - product.discountPrice)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  product.stock > 5 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
              />
              <span>
                {product.stock > 5
                  ? 'In Stock & Ready for Islandwide Dispatch'
                  : product.stock > 0
                  ? `Only ${product.stock} items left in stock`
                  : 'Currently Out of Stock'}
              </span>
            </div>

            {/* Size Variant Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-butterfly-text">
                  Select Size / Quantity Option:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                        selectedSize === s
                          ? 'bg-butterfly-text text-white border-butterfly-text shadow-sm'
                          : 'bg-white hover:bg-butterfly-soft text-butterfly-text border-butterfly-border'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Variant Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-butterfly-text">
                  Select Color / Theme:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                        selectedColor === c
                          ? 'bg-butterfly-primary text-white border-butterfly-primary shadow-sm'
                          : 'bg-white hover:bg-butterfly-soft text-butterfly-text border-butterfly-border'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add To Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-butterfly-border rounded-2xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-butterfly-soft text-butterfly-text rounded-xl"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-bold text-butterfly-text min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-butterfly-soft text-butterfly-text rounded-xl"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-4 px-6 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:bg-gray-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>

              {/* Instant Buy Now Button */}
              {product.stock > 0 && (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 rounded-2xl bg-butterfly-text hover:bg-black text-white text-xs font-bold tracking-widest uppercase transition-all shadow-soft flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Instant Buy Now</span>
                </button>
              )}

              {/* WhatsApp Direct Inquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Ask About This Product on WhatsApp</span>
              </a>
            </div>

            {/* Expandable Accordion Tabs */}
            <ProductAccordion product={product} />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews
          productId={product._id}
          initialReviews={reviews}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="py-14 border-t border-butterfly-border">
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-butterfly-text">
                You May Also Like
              </h3>
              <p className="text-xs text-butterfly-textMuted mt-1">
                Complementary essentials loved by mothers who viewed this product.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
