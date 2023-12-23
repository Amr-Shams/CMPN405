// this is an admmin controller for the admin page where the admin can see all the users and delete them and accpet or reject the pending users

const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const userStatus = {
    Pending: 'Pending',
    Approved: 'Approved',
    Deleted: 'Deleted',
};

// get all the appending users
const getallpendingusers = async (req, res) => {
    // select only the users with the status pending
    const users = await User.find({ Status: 'Pending' }).select('-password');

    res.status(StatusCodes.OK).json({ users });
};

// approve the pending users
const approveuser = async (req, res) => {
    const user = await User.UpdateOne({ _id: req.params.id },{"Status":"Approved"});
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

const deleteuser = async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.id },{"Status":"Deleted"});
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

module.exports = {
    getallpendingusers,
    approveuser,
    deleteuser
};