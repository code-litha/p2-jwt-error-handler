const bcrypt = require("bcryptjs");
const SALT = bcrypt.genSaltSync(10);

// INI UNTUK NGEHASH PASSWORD
const hashPassword = (plainPassword = "") => {
  return bcrypt.hashSync(plainPassword, SALT);
};

// INI UNTUK COMPARE PASSWORD YANG PLAIN DENGAN YANG KE HASH
const comparePassword = (plainPassword = "", hashedPassword = "") => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
