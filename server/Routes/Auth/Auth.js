// const { signup, login, forgotPassword, resetPassword } = require('../../Controllers/Auth/Auth.controller');
// const { signupValidation, loginValidation } = require('../../Middlewares/isAuthenticated');
// const { submitContactForm } = require('../../Controllers/Tasks/Contact.controller');

// const router = require('express').Router();

// router.post('/signup', signupValidation, signup);
// router.post('/login', loginValidation, login);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);
// router.post('/contact', submitContactForm);

// module.exports = router;

const { signup, login, forgotPassword, resetPassword, updateProfile } = require('../../Controllers/Auth/Auth.controller');
const { signupValidation, loginValidation, isAuthenticated } = require('../../Middlewares/isAuthenticated');
const { submitContactForm } = require('../../Controllers/Tasks/Contact.controller');

const router = require('express').Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/contact', submitContactForm);
router.put('/update-profile/:userId', isAuthenticated, updateProfile); // Add profile update route

module.exports = router;