const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/createProductController');
const formidableMiddleware = require('express-formidable');   
const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidableMiddleware(), createProductController);

module.exports = router;