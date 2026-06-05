var jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  if (req.headers.token) {
    var ob = jwt.verify(req.headers.token, "deepika is my fav");
    req.username = ob.username;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = {
  authenticate,
};
