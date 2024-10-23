// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        logger.warn('Access denied. No token provided.');
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number }; // Adjust based on your JWT payload
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            logger.warn('User not found.');
            res.status(401).json({ message: 'User not found.' });
            return;
        }

        req.user = user; // Attach user object to request
        next(); // Call next() to pass control to the next middleware
    } catch (error) {
        logger.error('Invalid token.');
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
