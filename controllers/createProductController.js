const productModal = require('../modals/productModel.js');
import fs from 'fs';
import slugify from 'slugify';

module.exports.createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        // validation
        switch(true){
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
            case !photo && photo.size > 1000000:
                return res.status(404).send({ error: `Photo is required, and should be less than 1mb` });
        }

        const products = new productModal({...req.fields, slug: slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: `Product Created Successfully`,
            products
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in creating product`
        })
    }
}