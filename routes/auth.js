const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorize } = require('../middleware/auth');
const { authLimiter } = require('../middleware/security');
const {
  validateRegister,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validateProfileUpdate,
  validateChangePassword
} = require('../validators/authValidation');

// Public routes
router.post('/register', authLimiter, validateRegister, authController.register);
router.post('/login', authLimiter, validateLogin, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/request-password-reset', authLimiter, validatePasswordResetRequest, authController.requestPasswordReset);
router.post('/reset-password', authLimiter, validatePasswordReset, authController.resetPassword);

// Protected routes (require authentication)
router.use(authenticateToken); // All routes below require authentication

router.post('/logout', authController.logout);
router.post('/logout-all', authController.logoutAll);
router.get('/profile', authController.getProfile);
router.put('/profile', validateProfileUpdate, authController.updateProfile);
router.put('/change-password', validateChangePassword, authController.changePassword);

// Admin routes
router.get('/users', authorize('admin'), authController.getAllUsers);
router.get('/users/:id', authorize('admin'), authController.getUserById);
router.put('/users/:id/status', authorize('admin'), authController.updateUserStatus);
router.delete('/users/:id', authorize('admin'), authController.deleteUser);

module.exports = router;
