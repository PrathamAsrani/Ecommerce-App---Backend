const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController } = require('../controllers/createProductController');
const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, createProductController);

module.exports = router;