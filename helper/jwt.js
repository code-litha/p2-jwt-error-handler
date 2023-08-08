const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET_KEY || "SECRET";

const signToken = (payload) => {
  console.log(SECRET, "<<< secret nih");
  return jwt.sign(payload, SECRET);
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
