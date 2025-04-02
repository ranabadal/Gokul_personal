const express = require('express');
const router = express.Router();
const { getReviews } = require('../../Controllers/Tasks/Review.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

router.get('/', isAuthenticated, getReviews);

module.exports = router;