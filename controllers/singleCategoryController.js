const categoryModal = require('../modals/categoryModel');

module.exports.singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({slug: req.params.slug});
        res.status(200).send({
            succes: true,
            message: `Category fetched`,
            category
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching single categories`
        })
    }
}