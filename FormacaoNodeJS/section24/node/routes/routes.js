var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

router.get('/', HomeController.index);

router.post('/user',UserController.create);
router.get("/user",UserController.listUsers);
router.get("/user/:id",UserController.getUserById);
router.put("/user/:id",UserController.edit);
router.delete("/user/:id",UserController.deleteUser);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/auth",UserController.login);
module.exports = router;