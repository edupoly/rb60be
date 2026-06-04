const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
var checkUserAuth = (req, res) => {
  UserModel.find({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      console.log(data);
      if (data.length != 0) {
        var token = jwt.sign({ foo: "bar" }, "deepika is my fav");
        res.send({ msg: "success", token, username: req.body.username });
      } else {
        res.send({ msg: "failed" });
      }
    })
    .catch((err) => {
      res.send({ msg: "failed" });
    });
};
module.exports = {
  checkUserAuth,
};
