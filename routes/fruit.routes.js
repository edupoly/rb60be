const { getAllFruits } = require("../controllers/fruit.controllers");
let router = require("express").Router();

router.get("/", getAllFruits);

module.exports = router;
