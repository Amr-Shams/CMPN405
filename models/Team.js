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
        default: []
    }
})
// presave players should be 11 player
teamSchema.pre('save', async function (next) {
    const team = this;
    if (team.players.length <= 11) {
        throw new Error('A team should have at least 11 players');
    }
    next();
})
// pre remove hook to remove all players
teamSchema.pre('remove', async function (next) {
    const team = this;
    await Player.deleteMany({ _id: { $in: team.players } });
    next();
})
const Team = mongoos.model('Team', teamSchema);
module.exports = Team;
