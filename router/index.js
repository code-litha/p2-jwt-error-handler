const router = require("express").Router();
const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);

router.post("/login", Controller.login);

router.use(authentication);
router.get("/items", Controller.showItems);

router.post("/items", authorization, Controller.createItems);

module.exports = router;
