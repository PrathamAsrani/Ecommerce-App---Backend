const userModal = require('../modals/userModal.js');
const {hashPassword} = require('../helper/authHelper.js');
module.exports.registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address} = req.body;
        if(!name) return res.status(400).send({error: `Name is required`});
        if(!email) return res.status(400).send({error: `Email is required`});
        if(!password) return res.status(400).send({error: `Password is required`});
        if(!phone) return res.status.send({error: `Phone number is required`});
        if(!address) return res.status(400).send({error: `address is required`});

        // existing user
        const existingUser = await userModal.findOne({email});
        if(existingUser){
            return res.status(200).send({
                status: true,
                message: `Already registered email please login`
            })
        }

        // register the user 
        const hashedPassword = await hashPassword(password);
        await userModal.create({
            name, email, password: hashedPassword, phone, address
        }).then((data)=> {
            console.log(data);
            res.status(201).send({
                status: true,
                message: `Created user`,
                user: {
                    name, email, phone, address
                }
            });
        }).catch((err)=>{
            console.log(`Error in userModal.create in register Controller ${err}`);
            res.status(500).send({error: err.message});
        })
    }catch(err){
        console.log(`Error in registerController ${err}`);
        res.status(500).send({
            status: false,
            message: `Error in registerController ${err}`,
        })
    }
}