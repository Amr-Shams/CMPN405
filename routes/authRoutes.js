
const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/authentication');

const {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 */
router.post('/register', register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', login);


/**
 * @swagger
 * /api/v1/auth/logout:
 *   delete:
 *     summary: Log out a user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 */
router.delete('/logout', authenticateUser, logout);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     summary: Verify a user's email
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The email verification token
 *     responses:
 *       200:
 *         description: The email was successfully verified
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email', verifyEmail); 

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   get:
 *     summary: Reset a user's password
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The password reset token
 *     responses:
 *       200:
 *         description: The password was successfully reset
 *       400:
 *         description: Invalid or expired token
 */
router.get('/reset-password', resetPassword); 

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Send a password reset link to a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: The password reset link was successfully sent
 *       400:
 *         description: Invalid email
 */
router.post('/forgot-password', forgotPassword);

module.exports = router;
