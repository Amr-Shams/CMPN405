const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stadium: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    fans: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
    }
})
    