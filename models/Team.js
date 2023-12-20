const mongoos = require('mongoose');

const teamSchema = new mongoos.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    players: {
        type: [mongoos.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    matches: {
        type: [mongoos.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const Team = mongoos.model('Team', teamSchema);
module.exports = Team;
