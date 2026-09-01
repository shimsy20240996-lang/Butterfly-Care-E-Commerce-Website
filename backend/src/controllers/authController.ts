import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { store, InMemoryUser } from '../config/store';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
      return;
    }

    const existingUser = store.users.find(u => u.email === email.toLowerCase().trim());
    if (existingUser) {
      res.status(400).json({ success: false, message: 'A customer account with this email already exists.' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: InMemoryUser = {
      _id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'customer',
      phone: phone || '',
      addresses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.users.push(newUser);

    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Butterfly Care.',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        addresses: newUser.addresses,
        wishlist: newUser.wishlist
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Please enter both email and password.' });
      return;
    }

    const user = store.users.find(u => u.email === email.toLowerCase().trim());
    if (!user || !user.password) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        wishlist: user.wishlist
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const user = store.users.find(u => u._id === req.user?.id);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        wishlist: user.wishlist
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile & addresses
// @route   PUT /api/auth/profile
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const userIndex = store.users.findIndex(u => u._id === req.user?.id);
    if (userIndex === -1) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const user = store.users[userIndex];
    const { name, phone, addresses, password } = req.body;

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (addresses) user.addresses = addresses;

    if (password && password.length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    user.updatedAt = new Date().toISOString();
    store.users[userIndex] = user;

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        addresses: user.addresses,
        wishlist: user.wishlist
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle item in wishlist
// @route   POST /api/auth/wishlist/:productId
export const toggleWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized' });
      return;
    }

    const { productId } = req.params;
    const userIndex = store.users.findIndex(u => u._id === req.user?.id);
    if (userIndex === -1) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    const user = store.users[userIndex];
    const existsIndex = user.wishlist.indexOf(productId);

    if (existsIndex > -1) {
      user.wishlist.splice(existsIndex, 1);
    } else {
      user.wishlist.push(productId);
    }

    store.users[userIndex] = user;

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
      inWishlist: existsIndex === -1
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Forgot password handler (simulated email reset)
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const user = store.users.find(u => u.email === email?.toLowerCase().trim());
    if (!user) {
      // Return 200 to prevent email enumeration
      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, reset instructions have been dispatched.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Password reset link has been sent to your email address.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
