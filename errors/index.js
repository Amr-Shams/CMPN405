const CustomAPIError = require('./custom-api');
const BadRequestError = require('./bad_req');
const UnauthenticatedError = require('./UnauthenticatedError');
const NotFoundError = require('./not-found');
const UnauthorizedError = require('./unauthorized');
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
};
