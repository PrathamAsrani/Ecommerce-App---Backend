const userModal = require('../modals/userModal.js');
const { hashPassword } = require('../helper/authHelper.js');

module.exports.forgotPasswordController = async (req, res) => {
    try{
        const {email, answer, newPassword} = req.body;
        if (!email) return res.status(404).send({ error: `Email is required` });
        if (!answer) return res.status(404).send({ error: `Answer is required` });
        if (!newPassword) return res.status(404).send({ error: `New Password is required` });

        const user = await userModal.findOne({email, answer});
        if(!user) return res.status(404).send({ success: false, message: `Wrong Email or Answer` });

        const hashedPassword = await hashPassword(newPassword);
        await userModal.findByIdAndUpdate(user._id, {password: hashedPassword});
        res.status(200).send({
            success: true,
            message: `Password Updated Successfully`
        });
    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: `Something went wrong`,
            err
        });
    }
};