// create a token for the user
env = require('dotenv').config();
const creatTokenUser = (user) => {
    return {name: user.name, email: user.email, role: user.role, userId: user._id};
}

module.exports = creatTokenUser;