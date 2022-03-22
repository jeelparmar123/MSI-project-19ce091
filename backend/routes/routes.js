var express = require("express");
var UserController = require("../Controllers/userController");
var ProjectmappingController=require("../Controllers/projectmappingcontroller");
userController = new UserController();
projectmappingcontroller = new ProjectmappingController();
var router = express.Router();

router.get("/", (req, res) => {
  console.log("API Works");
});

router.post("/login", (req, res) => {
  userController.login(req, res);
});

router.post("/verifyToken", (req, res) => {
  userController.verifyToken(req, res);
});

// router.post("/register", (req, res) => {
//   userController.register(req, res);
// });

router.post("/projectmappinginsert", (req, res) => {
  projectmappingcontroller.addMapping(req, res);
});

router.post("/projectmappingupdate",(req, res) => {
  projectmappingcontroller.updateMapping(req, res);
});

router.post("/projectmappingdelete",(req, res) => {
  projectmappingcontroller.deleteMapping(req, res);;
});



module.exports = router;
