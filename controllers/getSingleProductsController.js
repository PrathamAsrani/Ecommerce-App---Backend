const productModal = require('../modals/productModel.js');

module.exports.getSingleProductsController = async (req, res) => {
    try {
        console.log(req.params.slug)
        const product = await productModal.findOne(
            {name: req.params.slug}
        )
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success: true,
            message: "Single product fetched successfully",
            product
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