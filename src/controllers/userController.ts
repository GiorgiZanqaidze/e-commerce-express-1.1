import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const registerUser = async (req: Request) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    throw new Error('All fields are required.');
  }

  // Check if a user with the same email already exists
  const existingEmailUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmailUser) {
    throw new Error('User with this email already exists.'); // More specific error message
  }

  // Check if a user with the same username already exists
  const existingUsernameUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUsernameUser) {
    throw new Error('User with this username already exists.'); // Check for username
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    };
  } catch (error) {
    // Handle specific Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed.'); // Handle unique constraint violation
      }
    }
    throw new Error('Failed to register user.'); // Catch-all for other errors
  }
};

export const loginUser = async (req: Request) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found.'); // More specific error message
    }

    // Compare provided password with hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials.'); // More specific error message
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    // Handle specific Prisma errors
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Unique constraint failed.'); // Handle unique constraint violation
      }
    }
    throw new Error('Failed to log in.'); // Catch-all for other errors
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds of 10 is standard

    // Create the user with the hashed password
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Store the hashed password
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: 'User creation failed: ' + error.message });
    }
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users.' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user.' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username,
        email,
        password, // Hash this before storing
      },
    });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: 'Failed to update user.' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user.' });
  }
};
