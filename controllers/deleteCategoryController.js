const categoryModal = require('../modals/categoryModel');
const slugify = require('slugify');

module.exports.deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModal.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in deleting category`
        })
    }
}