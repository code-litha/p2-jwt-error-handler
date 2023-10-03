const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    // console.log(`Loggger nih`);
    const { access_token } = req.headers;
    if (!access_token) {
      // dia ga valid -> kasih error
      throw { name: "Unauthenticated" };
    }

    const decoded = verifyToken(access_token);
    // console.log(decoded, "<<< decode token");

    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
      },
    });

    if (!findUser) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: findUser.id,
      role: findUser.role,
    };

    next();
  } catch (error) {
    // console.log(error, "<<< error");
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "Unauthenticated"
    ) {
      res.status(401).json({
        message: `Invalid Token`,
      });
    } else {
      res.status(500).json({
        message: `Internal Server Error`,
      });
    }
  }
}

module.exports = authentication;
