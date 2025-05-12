const express = require('express');
const router = express.Router();
const { getUsers, updateUser, deleteUser } = require('../../Controllers/Tasks/User.controller');
const { isAdmin } = require('../../Middlewares/isAdmin');

router.get('/', isAdmin, getUsers);
router.put('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

module.exports = router;
