const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist,removeFromWishlist  } = require('../../Controllers/Tasks/Wishlist.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');


router.get('/wishlist', isAuthenticated, getWishlist);
router.post('/wishlist', isAuthenticated, addToWishlist);
router.delete('/wishlist/:productId', isAuthenticated,removeFromWishlist); 

module.exports = router;
