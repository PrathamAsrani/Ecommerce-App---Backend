const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createCategoryController } = require('../controllers/createCategoryController');
const { updateCategoryController } = require('../controllers/updateCategoryController');
const { categoryController } = require('../controllers/categoryController');
const { singleCategoryController } = require('../controllers/singleCategoryController');
const { deleteCategoryController } = require('../controllers/deleteCategoryController');
const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

router.get('/get-categories', categoryController);

router.get('/single-category/:slug', singleCategoryController);

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

module.exports = router;
