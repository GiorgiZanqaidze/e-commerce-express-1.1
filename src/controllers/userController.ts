import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
