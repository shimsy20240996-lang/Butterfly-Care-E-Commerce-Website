import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'butterfly_care_super_secret_jwt_key_2026_mom_love';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
