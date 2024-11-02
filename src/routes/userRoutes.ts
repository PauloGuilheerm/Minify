import express from 'express';

import { loginUser, createUser } from "../controllers/userController";
import { applyAuthMiddleware } from "../utils/genericMiddleware";

const getLoginRoute = (router: express.Router) : void => {
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user and get authentication token
 *     description: Authenticates the user with email and password, returning a token if credentials are valid.
 *     tags:
 *       - USER
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful and token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT authentication token
 *       400:
 *         description: Invalid email or password provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email or password"
 *       401:
 *         description: Authentication failed - invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'An unexpected error occurred'
 */

  applyAuthMiddleware(router, '/login', 'post', loginUser, false);
};

const getCreateUserRoute = (router: express.Router) : void => {
  /**
 * @swagger
 * /createuser:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with a unique email, name, and password.
 *     tags:
 *       - USER
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password (at least 6 characters)
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Unique identifier for the user
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Validation error - name, email, or password invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid name || Invalid email || Invalid password. It must be at least 6 characters long."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating user"
 */

  applyAuthMiddleware(router, '/createuser', 'post', createUser, false);
}

export const getUserRoutes = (router: express.Router) : void => {
  getLoginRoute(router);
  getCreateUserRoute(router);
};