const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/createProductController');
const formidableMiddleware = require('express-formidable');   
const { getProductsController } = require('../controllers/getProductsController');
const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidableMiddleware(), createProductController);

router.get('/get-products', getProductsController);

module.exports = router;