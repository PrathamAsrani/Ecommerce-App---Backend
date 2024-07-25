const productModal = require('../modals/productModel.js')

module.exports.productCountController = async(req, res) => {
    try{
        const total = await productModal.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })
    } catch (err) {
        console.log(`Error in productCountController: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching products --> productCountController`
        })
    }
}