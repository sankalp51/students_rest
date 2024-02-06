const router = require('express').Router();
const authController = require('../../controller/authController');
router.post('/auth/user-auth', authController.authenticateUser);
router.post('/auth/user-register', authController.registerUser);

module.exports = router;