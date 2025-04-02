const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require('../../Controllers/Tasks/User.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

router.get('/', isAuthenticated, getUsers);
router.put('/:id', isAuthenticated, updateUser);
router.delete('/:id', isAuthenticated, deleteUser);

module.exports = router;
