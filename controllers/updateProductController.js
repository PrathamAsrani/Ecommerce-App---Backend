const productModal = require('../modals/productModel.js');
const fs = require('fs');
const slugify = require('slugify');

module.exports.updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // validation
        console.log(name, description, price, category, quantity);
        console.log(photo);
        switch (true) {
            case !name:
                return res.status(404).send({ error: `Name is required` });
            case !description:
                return res.status(404).send({ error: `Description is required` });
            case !price:
                return res.status(404).send({ error: `Price is required` });
            case !category:
                return res.status(404).send({ error: `Category is required` });
            case !quantity:
                return res.status(404).send({ error: `Quantity is required` });
        }
        const products = await productModal.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: `Product updated Successfully`,
            products
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in updating product`
        })
    }
}