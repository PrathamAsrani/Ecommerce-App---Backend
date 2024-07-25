const productModal = require('../modals/productModel.js')

module.exports.productFiltersController = async(req, res) => {
    try{
        const {checked, radio} = req.body
        let args = {}
        if(checked.length > 0)
            args.category = checked
        if(radio.length) 
            args.price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModal.find(args)
        res.status(200).send({
            success: true,
            products
        })
    } catch (err) {
        console.log(`Error in productFiltersController: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching products filters --> productFiltersController`
        })
    }
}