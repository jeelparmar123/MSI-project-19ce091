var express = require("express");
var UserController = require("../Controllers/userController");
var ProjectmappingController = require("../Controllers/projectmappingcontroller");
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

router.post("/bulkimport", (req, res) => {
  projectmappingcontroller.bulkimport(req, res);
});

router.post("/projectmappinginsert", (req, res) => {
  projectmappingcontroller.addMapping(req, res);
});

router.get("/users", (req, res) => {
  projectmappingcontroller.getUsers(req, res);
});

router.get("/projectmappingget", (req, res) => {

  projectmappingcontroller.getMapping(req, res);
});

router.get("/projectmappinggetbyid/:id", (req, res) => {

  projectmappingcontroller.getMappingbyid(req, res);
});

router.post("/projectmappingupdate", (req, res) => {
  projectmappingcontroller.updateMapping(req, res);
});

router.delete("/projectmappingdelete/:id", (req, res) => {
  projectmappingcontroller.deleteMapping(req, res);;
});

router.delete("/projectmappingdeletebulk", (req, res) => {
  projectmappingcontroller.deleteMappingbulk(req, res);;
});



module.exports = router;
