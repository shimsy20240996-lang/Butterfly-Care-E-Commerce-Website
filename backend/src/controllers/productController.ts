import { Request, Response } from 'express';
import slugify from 'slugify';
import { store, InMemoryProduct } from '../config/store';

// @desc    Get all products with advanced filtering, search, sorting & pagination
// @route   GET /api/products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    let filtered = [...store.products];

    // Filter by active status (unless requested by admin)
    const isAdmin = req.query.all === 'true';
    if (!isAdmin) {
      filtered = filtered.filter(p => p.active !== false);
    }

    // Search keyword
    const search = req.query.search as string;
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    // Category filter (slug or id)
    const category = req.query.category as string;
    if (category && category !== 'all') {
      const catObj = store.categories.find(c => c.slug === category || c._id === category);
      if (catObj) {
        filtered = filtered.filter(p => p.category === catObj._id || p.categorySlug === catObj.slug);
      }
    }

    // Price range
    if (req.query.minPrice) {
      const min = Number(req.query.minPrice);
      filtered = filtered.filter(p => (p.discountPrice || p.price) >= min);
    }
    if (req.query.maxPrice) {
      const max = Number(req.query.maxPrice);
      filtered = filtered.filter(p => (p.discountPrice || p.price) <= max);
    }

    // Age Group
    const ageGroup = req.query.ageGroup as string;
    if (ageGroup && ageGroup !== 'all') {
      filtered = filtered.filter(p => p.ageGroup.toLowerCase().includes(ageGroup.toLowerCase()));
    }

    // Minimum Rating
    if (req.query.rating) {
      const minRating = Number(req.query.rating);
      filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Brand filter
    const brand = req.query.brand as string;
    if (brand && brand !== 'all') {
      filtered = filtered.filter(p => p.brand.toLowerCase().includes(brand.toLowerCase()));
    }

    // In Stock only
    if (req.query.inStock === 'true') {
      filtered = filtered.filter(p => p.stock > 0);
    }

    // Gender filter (boy, girl, unisex, mom)
    const gender = req.query.gender as string;
    if (gender && gender !== 'all') {
      if (gender === 'boy') {
        filtered = filtered.filter(
          p =>
            p.gender === 'boy' ||
            p.gender === 'unisex' ||
            p.name.toLowerCase().includes('boy') ||
            p.categorySlug === 'clothing' ||
            p.categorySlug === 'baby-care' ||
            p.categorySlug === 'sleep-snuggle' ||
            p.categorySlug === 'feeding-nursing'
        );
      } else if (gender === 'girl') {
        filtered = filtered.filter(
          p =>
            p.gender === 'girl' ||
            p.gender === 'unisex' ||
            p.name.toLowerCase().includes('girl') ||
            p.categorySlug === 'clothing' ||
            p.categorySlug === 'baby-care' ||
            p.categorySlug === 'toys-gifts'
        );
      } else if (gender === 'mom') {
        filtered = filtered.filter(p => p.gender === 'mom' || p.categorySlug === 'mom-care');
      } else {
        filtered = filtered.filter(p => p.gender === gender || p.gender === 'unisex');
      }
    }

    // Sale filter
    if (req.query.sale === 'true') {
      filtered = filtered.filter(p => p.sale || (p.discountPrice && p.discountPrice < p.price));
    }

    // Featured / Best Seller / New Arrival quick filters
    if (req.query.featured === 'true') {
      filtered = filtered.filter(p => p.featured);
    }
    if (req.query.bestSeller === 'true') {
      filtered = filtered.filter(p => p.bestSeller);
    }
    if (req.query.newArrival === 'true') {
      filtered = filtered.filter(p => p.newArrival);
    }

    // Sorting
    const sort = (req.query.sort as string) || 'featured';
    switch (sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'bestSeller':
        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    res.status(200).json({
      success: true,
      count: paginated.length,
      total,
      page,
      totalPages,
      products: paginated
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/slug/:slug
export const getProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = store.products.find(p => p.slug === slug);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    // Find related products in the same category
    const relatedProducts = store.products
      .filter(p => p.category === product.category && p._id !== product._id && p.active !== false)
      .slice(0, 4);

    // Find reviews for this product
    const productReviews = store.reviews.filter(r => r.product === product._id && r.status === 'approved');

    res.status(200).json({
      success: true,
      product,
      relatedProducts,
      reviews: productReviews
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = store.products.find(p => p._id === id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      description,
      shortDescription,
      price,
      discountPrice,
      category,
      images,
      stock,
      sku,
      brand,
      ageGroup,
      gender,
      subcategory,
      sale,
      sizes,
      colors,
      materials,
      careInstructions,
      featured,
      bestSeller,
      newArrival,
      active
    } = req.body;

    if (!name || !price || !description) {
      res.status(400).json({ success: false, message: 'Name, price, and description are required.' });
      return;
    }

    let productSlug = slugify(name, { lower: true, strict: true });
    // Check if slug exists, append unique suffix if needed
    if (store.products.some(p => p.slug === productSlug)) {
      productSlug = `${productSlug}-${Date.now().toString().slice(-4)}`;
    }

    const catObj = store.categories.find(c => c._id === category || c.slug === category);
    const catId = catObj ? catObj._id : 'cat-1';
    const catName = catObj ? catObj.name : 'Baby Care';
    const catSlug = catObj ? catObj.slug : 'baby-care';

    const newProduct: InMemoryProduct = {
      _id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: productSlug,
      description: description.trim(),
      shortDescription: shortDescription || description.slice(0, 120),
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      category: catId,
      categorySlug: catSlug,
      categoryName: catName,
      subcategory: subcategory || '',
      gender: (['boy', 'girl', 'unisex', 'mom'].includes(gender) ? gender : 'unisex'),
      images: Array.isArray(images) && images.length > 0 ? images : ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop'],
      stock: stock !== undefined ? Number(stock) : 10,
      sku: (sku || `BC-${Date.now().toString().slice(-6)}`).toUpperCase().trim(),
      brand: brand || 'Butterfly',
      ageGroup: ageGroup || 'All Ages',
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      materials: materials || '100% Organic Cotton',
      careInstructions: careInstructions || 'Gentle wash',
      rating: 5.0,
      reviewCount: 0,
      featured: Boolean(featured),
      bestSeller: Boolean(bestSeller),
      newArrival: Boolean(newArrival),
      sale: Boolean(sale),
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.products.unshift(newProduct);

    // Update category count
    if (catObj) {
      catObj.itemCount = store.products.filter(p => p.category === catObj._id).length;
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      product: newProduct
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.products.findIndex(p => p._id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    const current = store.products[index];
    const updateData = req.body;

    if (updateData.name && updateData.name !== current.name) {
      current.name = updateData.name.trim();
      current.slug = slugify(updateData.name, { lower: true, strict: true });
    }

    if (updateData.category) {
      const catObj = store.categories.find(c => c._id === updateData.category || c.slug === updateData.category);
      if (catObj) {
        current.category = catObj._id;
        current.categoryName = catObj.name;
        current.categorySlug = catObj.slug;
      }
    }

    if (updateData.price !== undefined) current.price = Number(updateData.price);
    if (updateData.discountPrice !== undefined) current.discountPrice = updateData.discountPrice ? Number(updateData.discountPrice) : undefined;
    if (updateData.description !== undefined) current.description = updateData.description;
    if (updateData.shortDescription !== undefined) current.shortDescription = updateData.shortDescription;
    if (updateData.stock !== undefined) current.stock = Number(updateData.stock);
    if (updateData.sku !== undefined) current.sku = updateData.sku.toUpperCase();
    if (updateData.brand !== undefined) current.brand = updateData.brand;
    if (updateData.ageGroup !== undefined) current.ageGroup = updateData.ageGroup;
    if (updateData.gender !== undefined) current.gender = updateData.gender;
    if (updateData.subcategory !== undefined) current.subcategory = updateData.subcategory;
    if (updateData.sale !== undefined) current.sale = Boolean(updateData.sale);
    if (updateData.materials !== undefined) current.materials = updateData.materials;
    if (updateData.careInstructions !== undefined) current.careInstructions = updateData.careInstructions;
    if (updateData.images !== undefined) current.images = updateData.images;
    if (updateData.sizes !== undefined) current.sizes = updateData.sizes;
    if (updateData.colors !== undefined) current.colors = updateData.colors;
    if (updateData.featured !== undefined) current.featured = Boolean(updateData.featured);
    if (updateData.bestSeller !== undefined) current.bestSeller = Boolean(updateData.bestSeller);
    if (updateData.newArrival !== undefined) current.newArrival = Boolean(updateData.newArrival);
    if (updateData.active !== undefined) current.active = Boolean(updateData.active);

    current.updatedAt = new Date().toISOString();
    store.products[index] = current;

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      product: current
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.products.findIndex(p => p._id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Product not found.' });
      return;
    }

    const removed = store.products.splice(index, 1)[0];

    // Update category count
    const catObj = store.categories.find(c => c._id === removed.category);
    if (catObj) {
      catObj.itemCount = store.products.filter(p => p.category === catObj._id).length;
    }

    res.status(200).json({
      success: true,
      message: 'Product removed successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get inventory low stock items (Admin)
// @route   GET /api/products/admin/low-stock
export const getLowStockProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const threshold = Number(req.query.threshold) || 10;
    const lowStock = store.products.filter(p => p.stock <= threshold);

    res.status(200).json({
      success: true,
      count: lowStock.length,
      threshold,
      products: lowStock
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
