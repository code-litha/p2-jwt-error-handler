const router = require("express").Router();
const { comparePassword } = require("../helper/bcrypt");
const { signToken, verifyToken } = require("../helper/jwt");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const { User, Item } = require("../models");

router.post("/register", async (req, res, next) => {
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
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // MENGAMBIL USERNAME DAN PASSWORD DARI CLIENT MELALUI BODY
    const { username, password } = req.body;

    if (!username) throw { name: `Username can't be empty` };
    if (!password) throw { name: `Password can't be empty` };

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
    });

    res.status(200).json({
      access_token: accessToken,
    });
  } catch (err) {
    next(err);
  }
});

router.use(authentication);

router.get("/items", async (req, res, next) => {
  try {
    const items = await Item.findAll();

    res.status(200).json({
      data: items,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/items", authorization, async (req, res, next) => {
  // AMBIL DARI REQ BODY
  const { title, description } = req.body;

  try {
    const result = await Item.create({
      title: title,
      description: description,
    });

    res.status(201).json({
      result,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/items/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const destroy = await Item.destroy({
      where: { id: +id },
    });
    res.status(200).json({
      message: `Successfully delete item`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
