const categoryModal = require('../modals/categoryModel');
const slugify = require('slugify');

module.exports.createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(404).send({ error: `Name is required` });

        const existingCategory = await categoryModal.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: "Category us already registered",
            });
        }

        const category = await new categoryModal({name, slug: slugify(name)}).save();
        res.status(201).send({
            succes: true,
            message: `${name} category added successfully`,
            category
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in category`
        })
    }
}