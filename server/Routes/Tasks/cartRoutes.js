const express = require('express');
const router = express.Router();
const { getCartItems, addToCart, clearCart, updateCartItem, deleteCartItem } = require('../../Controllers/Tasks/cart.controller'); 
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

router.get('/cart', isAuthenticated, getCartItems);
router.post('/cart', isAuthenticated, addToCart);
router.put('/cart', isAuthenticated, updateCartItem); // Added route for updating cart items
router.delete('/cart/:itemId', isAuthenticated, deleteCartItem); // Ensure correct route
router.delete('/cart', isAuthenticated, clearCart); // Added route for clearing the cart

module.exports = router;
