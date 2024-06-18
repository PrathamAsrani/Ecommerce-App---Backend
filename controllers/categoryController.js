const categoryModal = require('../modals/categoryModel');

module.exports.categoryController = async (req, res) => {
    try {
        const category = await categoryModal.find({});
        res.status(200).send({
            success: true,
            message: `All categories fetched`,
            category
        });
    } catch (err) {
        console.log(`Error: ${err}`);
        res.status(500).send({
            success: false,
            err,
            message: `Error in fetching categories`
        })
    }
}