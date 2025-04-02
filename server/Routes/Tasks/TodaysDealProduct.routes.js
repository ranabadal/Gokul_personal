const express = require('express');
const router = express.Router();
const { addTodaysDealProduct, updateTodaysDealProduct, getAllTodaysDealProducts, getTodaysDealProductById, deleteTodaysDealProduct } = require('../../Controllers/Tasks/TodaysDealProduct.controller');
const { isAuthenticated } = require('../../Middlewares/isAuthenticated');

router.post('/todaysdeals', addTodaysDealProduct);
router.put('/todaysdeals/:id', updateTodaysDealProduct);
router.get('/todaysdeals',getAllTodaysDealProducts);
router.get('/todaysdeals/:id',getTodaysDealProductById);
router.delete('/todaysdeals/:id', deleteTodaysDealProduct);

module.exports = router;
