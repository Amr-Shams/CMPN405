// this is an admmin controller for the admin page where the admin can see all the users and delete them and accpet or reject the pending users

const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// get all the appending users
const getallPendingUsers = async (req, res) => {
    // select only the users with the status pending
    const users = await User.find({ status: 'Pending' }).select('-password');

    res.status(StatusCodes.OK).json({ users });
};

// approve the pending users
const approveUser = async (req, res) => {
    const user = await User.updateOne({ _id: req.params.id }, { status: 'Approved' });
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

const deleteUser = async (req, res) => {
    const user = await User.deleteOne({ _id: req.params.id },{status:"Deleted"});
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}
const deleteAllUsers = async (req, res) => {
    // all the users will be deleted even the one that requested to be deleted
    const user = await User.deleteMany({}, { status: "Deleted" });
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

module.exports = {
    getallPendingUsers,
    approveUser,
    deleteUser,
    deleteAllUsers,
};