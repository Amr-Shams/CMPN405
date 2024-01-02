const mongoos = require('mongoose');
const playerSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    position: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    number: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    team: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Team'
    },
    matches: {
        type: [mongoos.Schema.Types.ObjectId],
        default: []
    }
})

const Player = mongoos.model('Player', playerSchema);

module.exports = Player;
