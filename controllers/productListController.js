const productModal = require('../modals/productModel.js')

module.exports.productListController = async (req, res) => {
    try {
        const perPage = 6, page = req.params.page ? req.params.page : 1
        const products = await productModal.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            products
        })
    } catch (err) {
        console.log(`Error in productListController: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching products --> productListController`
        })
    }
}