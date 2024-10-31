// src/routes/userRoutes.ts
import { Router, Request, Response } from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  registerUser
} from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: secretPassword123
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 */

// Register a new user
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request, validation failed
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req);
    return res.status(201).json(result); // Send the response here
  } catch (error: any) { // Use any type for error
    console.error(error.message); // Log the original error message
    return res.status(500).json({ message: error.message || 'Failed to register user.' }); // Send a response with the original error message
  }
});

// Login a user
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: secretPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: your_jwt_token
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const response = await loginUser(req);
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || 'Failed to register user.' });
  }
});


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: secretPassword123
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request, validation failed
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body, res);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 *       500:
 *         description: Failed to fetch users
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers(req, res);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: User not found
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req, res);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request, validation failed
 */
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req, res);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Failed to delete user
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteUser(req, res);
    res.status(204).send(); // No content to send back
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
