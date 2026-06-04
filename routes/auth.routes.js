var express = require("express");
const { checkUserAuth } = require("../controllers/user.controllers");

var router = express.Router();

router.post("/login", checkUserAuth);

module.exports = router;
