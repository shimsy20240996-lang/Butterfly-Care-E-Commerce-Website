import { Request, Response } from 'express';
import { store } from '../config/store';

// @desc    Get Admin Dashboard metrics & charts data
// @route   GET /api/analytics/dashboard
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalOrders = store.orders.length;
    const totalSales = store.orders.reduce((acc, o) => acc + (o.status !== 'Cancelled' ? o.total : 0), 0);
    const totalCustomers = store.users.filter(u => u.role === 'customer').length;
    const totalProducts = store.products.length;
    const lowStockCount = store.products.filter(p => p.stock <= 10).length;
    const pendingOrdersCount = store.orders.filter(o => o.status === 'Pending').length;

    // Order status breakdown
    const statusCounts = {
      Pending: store.orders.filter(o => o.status === 'Pending').length,
      Confirmed: store.orders.filter(o => o.status === 'Confirmed').length,
      Processing: store.orders.filter(o => o.status === 'Processing').length,
      Shipped: store.orders.filter(o => o.status === 'Shipped').length,
      Delivered: store.orders.filter(o => o.status === 'Delivered').length,
      Cancelled: store.orders.filter(o => o.status === 'Cancelled').length
    };

    // Category performance
    const categoryStats = store.categories.map(c => {
      const prods = store.products.filter(p => p.category === c._id || p.categorySlug === c.slug);
      return {
        id: c._id,
        name: c.name,
        productCount: prods.length,
        stockCount: prods.reduce((sum, p) => sum + p.stock, 0)
      };
    });

    // Top selling products
    const topProducts = store.products
      .filter(p => p.bestSeller || p.reviewCount > 20)
      .slice(0, 5)
      .map(p => ({
        id: p._id,
        name: p.name,
        price: p.discountPrice || p.price,
        image: p.images[0],
        stock: p.stock,
        rating: p.rating,
        salesCount: p.reviewCount + 15
      }));

    // Monthly revenue trend (Past 6 months simulated + live)
    const monthlySales = [
      { month: 'Apr', sales: 185000, orders: 28 },
      { month: 'May', sales: 240000, orders: 36 },
      { month: 'Jun', sales: 310000, orders: 45 },
      { month: 'Jul', sales: 380000, orders: 52 },
      { month: 'Aug', sales: 490000, orders: 68 },
      { month: 'Sep', sales: totalSales > 0 ? totalSales + 520000 : 540000, orders: totalOrders + 74 }
    ];

    res.status(200).json({
      success: true,
      stats: {
        totalSales,
        totalOrders,
        totalCustomers,
        totalProducts,
        lowStockCount,
        pendingOrdersCount
      },
      statusCounts,
      categoryStats,
      topProducts,
      monthlySales
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
