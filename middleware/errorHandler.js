const errorHandler = (err, req, res, next) => {
  // logic error handler
  let status = 500;
  let message = "Internal Server Error";

  // console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "InvalidLogin":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = `You aren't allow access this point`;
      break;
    case `Username can't be empty`:
      status = 400;
      message = `Username can't be empty`;
      break;
    case `Password can't be empty`:
      status = 400;
      message = `Password can't be empty`;
      break;
    default:
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
