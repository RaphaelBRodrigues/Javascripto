var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const adminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/validate',adminAuth, HomeController.validate);

router.post('/user',UserController.create);
router.get("/user",adminAuth,UserController.listUsers);
router.get("/user/:id",UserController.getUserById);
router.put("/user/:id",adminAuth,UserController.edit);
router.delete("/user/:id",adminAuth,UserController.deleteUser);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/auth",UserController.login);
module.exports = router;