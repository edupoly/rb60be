require("dotenv").config();
const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("inside storage::", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

var cors = require("cors");
var arthRouter = require("./routes/arth.routes");
var empRouter = require("./routes/emp.routes");
var fruitsRouter = require("./routes/fruit.routes");
var authRouter = require("./routes/auth.routes");
var todoRouter = require("./routes/todo.routes");
var dbConnect = require("./db");
const { authenticate } = require("./middlewares/auth.middleware");
dbConnect();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

app.use("/auth", authRouter);

app.use("/arth", arthRouter);

app.use("/employees", empRouter);

app.use("/fruits", fruitsRouter);

app.use("/todos", authenticate, todoRouter);

app.post("/uploadFile", upload.single("profilepic"), (req, res) => {
  console.log("req for uploadFile", req.body);
  res.send("Lets see");
});

app.listen(process.env.PORT || 3500, () => {
  console.log(`server running on ${process.env.PORT || 3500}`);
});
