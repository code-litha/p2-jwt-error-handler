function errorHandler(err, req, res, next) {
  let status = 500;
  let message = `Internal Server Error`;

  if (err.name === "Forbidden") {
    status = 403;
    message = `You aren't authorized`;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
