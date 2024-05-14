const bcrypt = require('bcrypt');

module.exports.hashPassword = async(password) => {
    try{
        const rounds = 3;
        const hashedPassword = await bcrypt.hash(password, rounds);
        return hashedPassword;
    }catch(err) {
        console.log(`Error in hashing password: ${err}`);
    };
}

module.exports.comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}