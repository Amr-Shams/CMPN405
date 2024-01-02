const User = require('../models/User');
const Match = require('../models/Match');
const Stadium = require('../models/Stadium');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');

const getAllUsers = async (req, res) => {
  // find all users except the admin
  const users = await User.find({}).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};
// reserve a seat
const reserveSeat = async (req, res) => {
  const { matchId, seat } = req.body;
  if (!matchId || !seat) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const match = await Match.findOne({ _id: matchId });
  if (!match) {
    throw new CustomError.NotFoundError(`No match with id : ${matchId}`);
  }
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }
  // find the stadium with the match location
  const stadium = await Stadium.findOne({ name: match.location });
  if (!stadium) {
    throw new CustomError.NotFoundError(
      `No stadium with name : ${match.location}`
    );
  }
  // check if the capacity is full
  if (stadium.capacity === stadium.seats.length) {
    throw new CustomError.BadRequestError('Stadium is full');
  }
  // check if the seat is already reserved
  if (stadium.seats.includes(seat)) {
    throw new CustomError.BadRequestError('Seat is already reserved');
  }
  // reserve the seat
  user.seat = seat;
  await user.save();
  // add the match to the user matches
  user.matches.push(matchId);
  await user.save();
  // add the user to the match fans
  match.fans.push(user);
  await match.save();
  // add the seat to the stadium seats
  stadium.seats.push(seat);
  await stadium.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Seat reserved.' });
};
// get the reservation ticket match, seat, stadium name and location, date,team1,team2
const getReservation = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }
  const match = await Match.findOne({ _id: user.matches[0] });
  if (!match) {
    throw new CustomError.NotFoundError(`No match with id : ${matchId}`);
  }
  const stadium = await Stadium.findOne({ name: match.location });
  if (!stadium) {
    throw new CustomError.NotFoundError(
      `No stadium with name : ${match.location}`
    );
  }
  res.status(StatusCodes.OK).json({
    match,
    stadium,
    seat: user.seat,
  });
};
// cancel the reservation

const cancelReservation = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`);
  }
  const match = await Match.findOne({ _id: user.matches[0] });
  if (!match) {
    throw new CustomError.NotFoundError(`No match with id : ${matchId}`);
  }
  const stadium = await Stadium.findOne({ name: match.location });
  if (!stadium) {
    throw new CustomError.NotFoundError(
      `No stadium with name : ${match.location}`
    );
  }
  // remove the seat from the stadium seats
  const index = stadium.seats.indexOf(user.seat);
  if (index > -1) {
    stadium.seats.splice(index, 1);
  }
  await stadium.save();
  // remove the match from the user matches
  const index2 = user.matches.indexOf(user.matches[0]);
  if (index2 > -1) {
    user.matches.splice(index2, 1);
  }
  await user.save();
  // remove the user from the match fans
  const index3 = match.fans.indexOf(user);
  if (index3 > -1) {
    match.fans.splice(index3, 1);
  }
  await match.save();
  // remove the seat from the user seat
  user.seat = '';
  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Reservation canceled.' });
}
module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  reserveSeat,
  getReservation,
  cancelReservation,
};

