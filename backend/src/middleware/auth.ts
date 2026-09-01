import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { store } from '../config/store';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
    name: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized to access this resource. Please log in.' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    return;
  }

  const user = store.users.find(u => u._id === decoded.id);
  if (!user) {
    res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    return;
  }

  req.user = {
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name
  };

  next();
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin role required.' });
  }
};
