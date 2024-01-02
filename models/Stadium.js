const mongos = require('mongoose');


const stadiumSchema = new mongos.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    seats: {
        type: [[Number]],
        required: true,
        default: []
    },
    matches: {
        type: [mongos.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    location: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    capacity: {
        type: Number,
        required: true,
        min: 1,
        max: 99999
    },
})

const Stadium = mongos.model('Stadium', stadiumSchema);
module.exports = Stadium;