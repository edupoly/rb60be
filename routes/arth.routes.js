var express = require("express");
const {
  addController,
  mulController,
  divController,
} = require("../controllers/arth.controllers");
var router = express.Router();

router.get("/add/:a/:b", addController);

router.get("/mul/:a/:b", mulController);

router.get("/div", divController);

module.exports = router;
