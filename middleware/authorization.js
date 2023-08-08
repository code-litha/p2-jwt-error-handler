// HANYA ADMIN YANG DAPAT MEMANIPULASI DATA ITEM
const authorization = function (req, res, next) {
  // console.log(req.headers.authenticationStatus, "<<< req.header");
  console.log(req.user, "<<< req. user yang lagi login");
  if (req.user.role === "ADMIN") {
    next();
  } else {
    next({ name: "Forbidden" });
  }
};

module.exports = authorization;
