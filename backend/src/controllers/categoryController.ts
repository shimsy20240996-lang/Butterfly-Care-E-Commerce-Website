import { Request, Response } from 'express';
import slugify from 'slugify';
import { store, InMemoryCategory } from '../config/store';

// @desc    Get all categories with active product counts
// @route   GET /api/categories
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const showAll = req.query.all === 'true';
    let categories = [...store.categories];

    if (!showAll) {
      categories = categories.filter(c => c.active !== false);
    }

    // Refresh item count
    categories = categories.map(c => ({
      ...c,
      itemCount: store.products.filter(p => (p.category === c._id || p.categorySlug === c.slug) && p.active !== false).length
    }));

    categories.sort((a, b) => a.order - b.order);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single category by slug
// @route   GET /api/categories/:slug
export const getCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const category = store.categories.find(c => c.slug === slug || c._id === slug);

    if (!category) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }

    const products = store.products.filter(p => (p.category === category._id || p.categorySlug === category.slug) && p.active !== false);

    res.status(200).json({
      success: true,
      category: {
        ...category,
        itemCount: products.length
      },
      products
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create category (Admin)
// @route   POST /api/categories
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, featured, active, order } = req.body;

    if (!name || !image) {
      res.status(400).json({ success: false, message: 'Category name and image URL are required.' });
      return;
    }

    let catSlug = slugify(name, { lower: true, strict: true });
    if (store.categories.some(c => c.slug === catSlug)) {
      catSlug = `${catSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newCategory: InMemoryCategory = {
      _id: `cat-${Date.now()}`,
      name: name.trim(),
      slug: catSlug,
      description: description || '',
      image,
      featured: featured !== undefined ? Boolean(featured) : true,
      active: active !== undefined ? Boolean(active) : true,
      order: order !== undefined ? Number(order) : store.categories.length + 1,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.categories.push(newCategory);

    res.status(201).json({
      success: true,
      message: 'Category created successfully!',
      category: newCategory
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update category (Admin)
// @route   PUT /api/categories/:id
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.categories.findIndex(c => c._id === id || c.slug === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }

    const current = store.categories[index];
    const { name, description, image, featured, active, order } = req.body;

    if (name) {
      current.name = name.trim();
      current.slug = slugify(name, { lower: true, strict: true });
    }
    if (description !== undefined) current.description = description;
    if (image) current.image = image;
    if (featured !== undefined) current.featured = Boolean(featured);
    if (active !== undefined) current.active = Boolean(active);
    if (order !== undefined) current.order = Number(order);

    current.updatedAt = new Date().toISOString();
    store.categories[index] = current;

    res.status(200).json({
      success: true,
      message: 'Category updated successfully!',
      category: current
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete category (Admin)
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.categories.findIndex(c => c._id === id || c.slug === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Category not found.' });
      return;
    }

    store.categories.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
