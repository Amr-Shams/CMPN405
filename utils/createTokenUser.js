// create a token for the user
env = require('dotenv').config();
const creatTokenUser = (user) => {
    const token = jwt.sign({name: user.name, email: user.email, role: user.role, id: user._id}, process.env.TOKEN_SECRET);
    return token;
}

module.exports = creatTokenUser;