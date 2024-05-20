const JWT = require('jsonwebtoken');
const userModal = require('../modals/userModal.js');

module.exports.requireSignIn = async(req, res, next) => {
    try{
        let token = req.headers.authorization;
        const decode = await JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        console.log(`Error in requireSignIn of middlewares: ${err}`);
        res.status(500).send({
            status: false,
            error: `Error in requireSignIn of middlewares: ${err}`
        })
    }
}

module.exports.isAdmin = async (req, res, next) => {
    try{
        const user = await userModal.findById(req.user._id);
        console.log(user.role, typeof(user.role));
        if(user.role !== 1) return res.status(401).send({message: `Unauthorized access`});
        else next();
    }catch(err){
        console.log(`Error in isAdmin of middlewares: ${err}`);
        res.status(401).send({
            status: false,
            error: `Error in isAdmin of middlewares: ${err}`
        })
    }
}