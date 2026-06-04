const express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var arthRouter = require("./routes/arth.routes");
var empRouter = require("./routes/emp.routes");
var fruitsRouter = require("./routes/fruit.routes");
var authRouter = require("./routes/auth.routes");
var todoRouter = require("./routes/todo.routes");
var dbConnect = require("./db");
dbConnect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use("/auth", authRouter);

app.use("/arth", arthRouter);

app.use("/employees", empRouter);

app.use("/fruits", fruitsRouter);

app.use("/todos", todoRouter);

app.listen(3500, () => {
  console.log("server running on 3500");
});
