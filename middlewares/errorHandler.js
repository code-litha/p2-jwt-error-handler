function errorHandler(err, req, res, next) {
  let status = 500;
  let message = `Internal Server Error`;

  if (err.name === "Forbidden") {
    status = 403;
    message = `You aren't authorized`;
  } else if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  } else if (error.name === `Username Empty`) {
    status = 400;
    message = `Username can't be empty`;
  } else if (error.name === `Password Empty`) {
    status = 400;
    message = `Password can't be empty`;
  } else if (error.name === "InvalidLogin") {
    status = 401;
    message = "Invalid email/password";
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
