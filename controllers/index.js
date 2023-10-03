const { User, Item } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      // MENGAMBIL USERNAME DAN PASSWORD DARI CLIENT MELALUI BODY
      const { username, password, role } = req.body;

      // MEMBUAT USER
      const userCreated = await User.create({ username, password, role });

      // MENGIRIM ID DAN USERNAME YANG TELAH BERHASIL DI REGISTER
      res.status(201).json({
        id: userCreated.id,
        username: userCreated.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      // MENGAMBIL USERNAME DAN PASSWORD DARI CLIENT MELALUI BODY
      const { username, password } = req.body;

      if (!username) throw { name: `Username Empty` };
      if (!password) throw { name: `Password Empty` };

      // MEMASTIKAN BAHWA USERNAMENYA ADA DI DATABASE
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) throw { name: "InvalidLogin" };

      // MEMASTIKAN BAHWA PASSWORDNYA BENER
      const isValidPassword = comparePassword(password, user.password); // RETURN TRUE / FALSE

      if (!isValidPassword) throw { name: "InvalidLogin" };

      // GENERATE JWT
      const accessToken = signToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      // const accessToken = signToken(user.dataValues);

      res.status(200).json({
        access_token: accessToken,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async showItems(req, res, next) {
    // console.log(req.headers, "<<< header");
    try {
      const data = await Item.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async createItems(req, res, next) {
    try {
      const { title, description } = req.body;
      const data = await Item.create({ title, description });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
