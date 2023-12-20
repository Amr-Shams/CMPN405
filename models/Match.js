const mongoos = require('mongoose');



const MatchSchema = new mongoos.Schema({
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
        required: true,
        default: []
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Finished'],
        trim: true,
    }
})
    