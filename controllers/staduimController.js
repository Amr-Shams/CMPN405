const User = require('../models/User');
const Match = require('../models/Match');
const Team = require('../models/Team');
const Stadium = require('../models/Stadium');
const Token = require('../models/Token');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// create a stadium
const createStadium = async (req, res) => {
    const { name, location, rowCount,columnCount } = req.body;
    if(!name || !location || !rowCount || !columnCount){
        throw new CustomError.BadRequestError('Please provide all values');
    }
    capacity = rowCount * columnCount;
    const stadium = await Stadium.create({
        name: name,
        location: location,
        capacity: capacity,
        rowCount: rowCount,
        columnCount: columnCount
    });
    res.status(StatusCodes.CREATED).json({ stadium });
};

// get all stadiums
const getAllStadiums = async (req, res) => {
    const stadiums = await Stadium.find({});
    res.status(StatusCodes.OK).json({ stadiums });
};

// get a single stadium
const getSingleStadium = async (req, res) => {
    const stadium = await Stadium.findOne({ _id: req.params.id });
    if (!stadium) {
        throw new CustomError.NotFoundError(`No stadium with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ stadium });
}

// update a stadium
const updateStadium = async (req, res) => {
    const { name, location, rowCount,columnCount } = req.body;
    if (!name || !location || !rowCount || !columnCount) {
        throw new CustomError.BadRequestError('Please provide all values');
    }
    const stadium = await Stadium.findOne({ _id: req.params.id });

    stadium.name = name;
    stadium.location = location;
    stadium.rowCount = rowCount;
    stadium.columnCount = columnCount;
    stadium.capacity = rowCount * columnCount;

    await stadium.save();

    res.status(StatusCodes.OK).json({ stadium });
}
// delete a stadium
const deleteStadium = async (req, res) => {
    const stadium = await Stadium.deleteOne({ _id: req.params.id });
    if (!stadium) {
        throw new CustomError.NotFoundError(`No stadium with id : ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ stadium });
}


module.exports = {
    createStadium,
    getAllStadiums,
    getSingleStadium,
    updateStadium,
    deleteStadium
}