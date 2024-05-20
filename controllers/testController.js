module.exports.testController = async(req, res) => {
    console.log(`Protected route`);
    res.send({message: `Protected route`});
}