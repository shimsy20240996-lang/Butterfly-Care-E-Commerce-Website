import { Request, Response } from 'express';
import { store } from '../config/store';

// @desc    Get all customers (Admin)
// @route   GET /api/users
export const getUsersAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, role } = req.query;
    let users = [...store.users];

    if (role) {
      users = users.filter(u => u.role === role);
    }

    if (search) {
      const q = (search as string).toLowerCase();
      users = users.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.phone && u.phone.includes(q))
      );
    }

    const sanitizedUsers = users.map(u => {
      const customerOrders = store.orders.filter(o => o.user === u._id || o.customerDetails.email.toLowerCase() === u.email.toLowerCase());
      const totalSpent = customerOrders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);

      return {
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone,
        addresses: u.addresses,
        orderCount: customerOrders.length,
        totalSpent,
        createdAt: u.createdAt
      };
    });

    res.status(200).json({
      success: true,
      count: sanitizedUsers.length,
      users: sanitizedUsers
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single user details with order history (Admin)
// @route   GET /api/users/:id
export const getUserByIdAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = store.users.find(u => u._id === id);

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found.' });
      return;
    }

    const orders = store.orders.filter(o => o.user === user._id || o.customerDetails.email.toLowerCase() === user.email.toLowerCase());
    const totalSpent = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        wishlist: user.wishlist,
        orderCount: orders.length,
        totalSpent,
        createdAt: user.createdAt
      },
      orders
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
