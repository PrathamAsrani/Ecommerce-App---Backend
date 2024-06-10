const express = require('express');
const router = express.Router();
const {registerController} = require('../controllers/registerController.js');
const {loginController} = require('../controllers/loginController.js');
const {testController} = require('../controllers/testController.js');
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware.js');

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/test', requireSignIn, isAdmin, testController);

router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({
        success:true
    });
});

module.exports = router; 