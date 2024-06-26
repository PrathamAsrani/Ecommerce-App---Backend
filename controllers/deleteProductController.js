const productModal = require('../modals/productModel.js');

module.exports.deleteProductController = async (req, res) => {
    try {
        await productModal.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully"
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in deleting product`
        })
    }
}