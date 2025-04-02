const express = require('express');
const router = express.Router();
const { addAddress, getAddresses, updateAddress, deleteAddress } = require('../../Controllers/Tasks/Address.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

router.post('/add', isAuthenticated, addAddress);
router.get('/', isAuthenticated, getAddresses);
router.put('/:id', isAuthenticated, updateAddress);
router.delete('/:id', isAuthenticated, deleteAddress);

module.exports = router;
