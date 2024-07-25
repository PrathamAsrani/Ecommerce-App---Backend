const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/createProductController');
const formidableMiddleware = require('express-formidable');   
const { getProductsController } = require('../controllers/getProductsController');
const { getSingleProductsController } = require('../controllers/getSingleProductsController');
const { productPhotoController } = require('../controllers/productPhotoController');
const { deleteProductController } = require('../controllers/deleteProductController');
const { updateProductController } = require('../controllers/updateProductController');
const { productFiltersController } = require('../controllers/productFiltersController');
const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidableMiddleware(), createProductController);

router.put('/update-product/:pid', requireSignIn, isAdmin, formidableMiddleware(), updateProductController);

router.get('/get-products', getProductsController);

router.get('/get-single-product/:slug', getSingleProductsController);

router.get('/product-photo/:pid', productPhotoController);

router.delete('/product-delete/:pid', deleteProductController);

router.get('/product-filters', productFiltersController);

module.exports = router;