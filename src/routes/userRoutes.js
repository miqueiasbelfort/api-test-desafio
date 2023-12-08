const router = require("express").Router();
const userController = require("../controllers/userController");
const { checkToken } = require("../helpers/token");

router.get("/", checkToken, userController.AllUsers);
router.get("/user", userController.User);
router.post("/signup", userController.SignUpUser);
router.post("/signin", userController.SignInUser);

module.exports = router;