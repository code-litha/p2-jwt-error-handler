function authorization(req, res, next) {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    throw { name: "Forbidden" };
  }
}

module.exports = authorization;
