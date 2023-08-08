const { verifyToken } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async function (req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    console.log(access_token, "<<< access token nih");
    // console.log("LEWAT AUTHENTICATION NICHHHH");
    const decoded = verifyToken(access_token);

    console.log(decoded, "<<< decoded");

    // CHECK apakah hasil decoded kita ada di database atau gak
    const findUser = await User.findOne({
      where: {
        id: decoded.id,
        username: decoded.username,
      },
    });

    if (!findUser) {
      throw { name: "Unauthenticated" };
    }
    // console.log(findUser, "<<< ");
    // req.headers.authenticationStatus = findUser;
    req.user = {
      id: findUser.id,
      username: findUser.username,
      role: findUser.role,
    };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
