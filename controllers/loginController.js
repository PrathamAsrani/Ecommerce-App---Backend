const JWT = require('jsonwebtoken');
const userModal = require('../modals/userModal.js');
const { comparePassword } = require('../helper/authHelper.js');

module.exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) return res.status(404).send({ error: `Email is required` });
        if (!password) return res.status(404).send({ error: `Password is required` });
        const user = await userModal.findOne({email});
        if(!user){
            return res.status(404).send({ error: `User id not registered` });
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: `Invalid Password`
            });
        }
        // generate token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: `Logged In successfully`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })
    } catch (error) {
        console.log(`Error in loginController: ${error}`);
        res.status(500).send({
            status: false,
            message: `Error in loginController: ${error}`
        })
    }
}