const productModal = require('../modals/productModel.js');
const fs = require('fs');
const slugify = require('slugify');

module.exports.productPhotoController = async (req, res) => {
    try {
        const product = await productModal.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching photo of the products`
        })
    }
}