require("dotenv").config();
const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var arthRouter = require("./routes/arth.routes");
var empRouter = require("./routes/emp.routes");
var fruitsRouter = require("./routes/fruit.routes");
var authRouter = require("./routes/auth.routes");
var todoRouter = require("./routes/todo.routes");
var dbConnect = require("./db");
const { authenticate } = require("./middlewares/auth.middleware");

const client = new OAuth2Client(process.env.CLIENT_ID);

dbConnect();

var UserModel = require("./model/user.model");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.post("/api/auth/google", (req, res) => {
  const { token } = req.body;
  // Verify the token with Google and extract user information
  // You can use a library like google-auth-library for this purpose
  // After verification, you can create or find the user in your database and return a response

  client
    .verifyIdToken({
      idToken: token,
      audience:
        "733215085063-2fh9hojuqr37l9hn0fsajjrurlvbovb2.apps.googleusercontent.com",
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      console.log("Google user ID:", userid);
      console.log("ticket payload:", payload);
      var { email, name, picture } = payload;

      //  DB Logic:
      UserModel.findOne({ email }).then((user) => {
        if (!user) {
          UserModel.create({ email, username: name, picture }).then((data) => {
            console.log("New user created:", data);
          });
        }
      });

      const appToken = jwt.sign(
        { email, username: name },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );
      res.send({
        msg: "success",
        username: name,
        email,
        picture,
        token: appToken,
      });
    });
});
app.use("/auth", authRouter);

app.use("/arth", arthRouter);

app.use("/employees", empRouter);

app.use("/fruits", fruitsRouter);

app.use("/todos", authenticate, todoRouter);

app.listen(process.env.PORT || 3500, () => {
  console.log(`server running on ${process.env.PORT || 3500}`);
});
