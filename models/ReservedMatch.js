const mongos = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const ReservedMatchSchema = new mongoose.Schema({
    matchId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seatRow: {
        type: Number,
        required: true
    },
    seatColumn: {
        type: Number,
        required: true
    }
})

const ReservedMatch = mongos.model('ReservedMatch', ReservedMatchSchema);
module.exports = ReservedMatch;
