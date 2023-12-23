const crypto = require('crypto');

const hashString = (str) => {
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
    }

module.exports = hashString;