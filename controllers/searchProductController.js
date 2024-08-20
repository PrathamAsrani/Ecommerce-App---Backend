const productModal = require('../modals/productModel')

/*
const product = await productModal.find({
            $or: [
                {name: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        })

find({filter})
using or condition means, if any cond matched then get the result,
using $regex: checking keyword present in the string or not
and using $options: "i" means case insensitive
, {photo: 0} -> will say don't select photo
*/

module.exports.searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const product = await productModal.find(
            {
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            },
            { 
                photo: 0 
            }
        )
        res.json(product)
        // res.status(200).send({
        //     success: true,
        //     message: "Product found",
        //     data: product
        // })
    } catch (err) {
        console.log(`Error on searchProductController ${err}`);
        res.status(400).send({
            success: false,
            message: "Error on searchProductController",
            error: err
        })
    }
}