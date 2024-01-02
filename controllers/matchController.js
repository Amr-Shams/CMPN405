const User = require('../models/User');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Stadium = require('../models/Stadium');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// create a match
const createMatch = async (req, res) => {
    const { team1, team2, date, location } = req.body;
    if(!team1 || !team2 || !date || !location){
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const lastMatchTeam1 = await Team.findOne({name:team1}).matches.sort({date:-1}).limit(1);
    const lastMatchTeam2 = await Team.findOne({name:team2}).matches.sort({date:-1}).limit(1);
    // check if the date is already taken
    if(lastMatchTeam1.date > date || lastMatchTeam2.date > date){
        throw new CustomError.BadRequestError('The date is already taken');
    }
    // check if the date is not less than 3 days from the last match
    if(lastMatchTeam1.date.getDay() - date < 3 || lastMatchTeam2.date.getDay() - date < 3){
        throw new CustomError.BadRequestError('The date is less than 3 days from the last match');
    }
    // check if the two teams are not the same
    if(team1 === team2){
        throw new CustomError.BadRequestError('The two teams are the same');
    }

    // check if the stadium is available by quering the matchs dates for the stadium
    const MatchesTime = Stadium.findOne({name:location}).matches;
    // check if the time is already taken
    if(MatchesTime.includes(time)){
        throw new CustomError.BadRequestError('The time is already taken');
    }
    // create a match
    const match = await Match.create({
        team1,
        team2,
        location,
        date,
    });

    // add the match to the team matches
    const Team1 = await Team.findOne({name:team1});
    Team1.matches.push(match);
    await Team1.save();
    // add the match to the team matches2
    const Team2 = await Team.findOne({name:team2});
    Team2.matches.push(match);
    await Team2.save();
    // add the match to the stadium matches
    const Stadium = await Stadium.findOne({name:location});
    Stadium.matches.push(match);
    await Stadium.save();
    res.status(StatusCodes.CREATED).json({
        msg: 'Success! Match created',
    });
};

// get all the matches
const getAllMatches = async (req, res) => {
    const matches = await Match.find({});
    res.status(StatusCodes.OK).json({ matches });
};

// get a single match

const getSingleMatch = async (req, res) => {
    const match = await Match.findOne({ _id: req.params.id });
    if (!match) {
        throw new CustomError.NotFoundError(`No match with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ match });
}

// update a match
const updateMatch = async (req, res) => {
    const { team1, team2, date, location } = req.body;
    if (!team1 || !team2 || !date || !location) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const match = await Match.findOne({ _id: req.params.id });

    match.team1 = team1;
    match.team2 = team2;
    match.date = date;
    match.location = location;

    await match.save();

    res.status(StatusCodes.OK).json({ match });
};

// delete a match
const deleteMatch = async (req, res) => {
    const match = await Match.deleteOne({ _id: req.params.id });
    if (!match) {
        throw new CustomError.NotFoundError(`No match with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ match });
}


module.exports = {
    createMatch,
    getAllMatches,
    getSingleMatch,
    updateMatch,
    deleteMatch,
};