const categoryModal = require('../modals/categoryModel');
const slugify = require('slugify');

module.exports.updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) return res.status(404).send({ error: `Name is required` });

        const existingCategory = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });

        res.status(200).send({
            success: true,
            message: `${name} category updated successfully`,
            existingCategory
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in updating category`
        })
    }
}