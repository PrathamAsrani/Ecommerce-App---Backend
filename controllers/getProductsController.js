const productModal = require('../modals/productModel.js');

module.exports.getProductsController = async (req, res) => {
    try {
        const products = await productModal.find({}).populate("category").select("-photo").limit(12).sort({createdAt : -1});
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "Products fetched successfully",
            products
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching products`
        })
    }
}