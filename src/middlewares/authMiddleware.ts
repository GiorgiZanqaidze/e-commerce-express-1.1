import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Define a type for the JWT payload
interface DecodedToken {
  userId: number; // Adjust this based on your JWT payload
  iat: number;
  exp: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    logger.warn('Access denied. No token provided.');
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken; // Use the defined type for decoding
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }, // Ensure this matches your JWT payload
    });

    if (!user) {
      logger.warn('User not found.');
      res.status(401).json({ message: 'User not found.' });
      return;
    }

    req.user = user; // Attach user object to request
    next(); // Call next() to pass control to the next middleware
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      logger.warn('Token has expired.');
      res.status(401).json({ message: 'Token has expired.' });
    } else {
      logger.error('Invalid token.', error);
      res.status(401).json({ message: 'Invalid token.' });
    }
  }
};

export default authMiddleware;
