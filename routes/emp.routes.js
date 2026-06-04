let router = require("express").Router();

router.get("/", (req, res) => {
  res.send("I will give you employees");
});

module.exports = router;
