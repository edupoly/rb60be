var jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  if (req.headers.token) {
    var ob = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.username = ob.username;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = {
  authenticate,
};
