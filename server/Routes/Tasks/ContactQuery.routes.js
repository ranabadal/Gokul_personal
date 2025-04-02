const express = require('express');
const { submitContactForm, getQueries, updateQueryStatus, deleteQuery } = require('../../Controllers/Tasks/Contact.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

const router = express.Router();

router.post('/contact', submitContactForm);
router.get('/queries', isAuthenticated, getQueries);
router.put('/queries/:id', isAuthenticated, updateQueryStatus);
router.delete('/queries/:id', isAuthenticated, deleteQuery);

module.exports = router;
