const Team = require('../models/Team');
const Player = require('../models/Player');
const { StatusCodes } = require('http-status-codes');
const validator = require('validator');
const CustomError = require('../errors');

// create a team
const createTeam = async (req, res) => {
    // validate user input 
    const errors = [];
    if (!req.body.name) {
        errors.push({ message: 'Please enter a name' });
    }
    if (!req.body.players) {
        errors.push({ message: 'Please enter players' });
    }
    if (errors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
  const team = await Team.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ team });
};

// get all teams
const getAllTeams = async (req, res) => {
  const teams = await Team.find({}).populate('players');
  res.status(StatusCodes.OK).json({ teams });
};

// get a single team
const getSingleTeam = async (req, res) => {
  const teamId = req.params.id;
  // validate user input
    if (!validator.isMongoId(teamId)) {
        throw new CustomError.BadRequestError('Please provide a valid team id');
    }
  const team = await Team.findOne({ _id: teamId }).populate('players');
  if (!team) {
    throw new CustomError.NotFoundError(`No team with id : ${teamId}`);
  }
  res.status(StatusCodes.OK).json({ team });
};

// update team
const updateTeam = async (req, res) => {
  const teamId = req.params.id;
  // validate user input
    if (!validator.isMongoId(teamId)) {
        throw new CustomError.BadRequestError('Please provide a valid team id');
    }
  const team = await Team.findOneAndUpdate({ _id: teamId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!team) {
    throw new CustomError.NotFoundError(`No team with id : ${teamId}`);
  }
  res.status(StatusCodes.OK).json({ team });
};

// delete team
const deleteTeam = async (req, res) => {
  const teamId = req.params.id;
  // validate user input
    if (!validator.isMongoId(teamId)) {
        throw new CustomError.BadRequestError('Please provide a valid team id');
    }
  const team = await Team.findOneAndDelete({ _id: teamId });
  if (!team) {
    throw new CustomError.NotFoundError(`No team with id : ${teamId}`);
  }
  res.status(StatusCodes.OK).send();
};

// add player to team
const addPlayerToTeam = async (req, res) => {
    const { playerId, teamId } = req.body;
    // validate user input
    if (!validator.isMongoId(playerId) || !validator.isMongoId(teamId)) {
      throw new CustomError.BadRequestError(
        'Please provide a valid player and team id'
      );
    }
    // check if the player exists
    const player = await Player.findOne({ _id: playerId });
    if (!player) {
      throw new CustomError.NotFoundError(`No player with id : ${playerId}`);
    }
    const team = await Team.findOneAndUpdate(
      { _id: teamId },
      { $push: { players: playerId } },
      { new: true, runValidators: true }
    );
    if (!team) {
      throw new CustomError.NotFoundError(`No team with id : ${teamId}`);
    }
    res.status(StatusCodes.OK).json({ team });
  }

// remove player from team

const removePlayerFromTeam = async (req, res) => {
    const { playerId, teamId } = req.body;
    // validate user input
    if (!validator.isMongoId(playerId) || !validator.isMongoId(teamId)) {
      throw new CustomError.BadRequestError(
        'Please provide a valid player and team id'
      );
    }
    // check if the player exists
    const player = await Player.findOne({ _id: playerId });
    if (!player) {
      throw new CustomError.NotFoundError(`No player with id : ${playerId}`);
    }
    // remove the player from the team
    const team = await Team.findOneAndUpdate(
      { _id: teamId },
      { $pull: { players: playerId } },
      { new: true, runValidators: true }
    );

    if (!team) {
      throw new CustomError.NotFoundError(`No team with id : ${teamId}`);
    }
    res.status(StatusCodes.OK).json({ team });
  }
  

module.exports = {
    createTeam,
    getAllTeams,
    getSingleTeam,
    updateTeam,
    deleteTeam,
    addPlayerToTeam,
    removePlayerFromTeam
    };

