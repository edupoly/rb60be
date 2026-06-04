var mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(
      "mongodb+srv://praveen:hello123@cluster0.l8nf5yw.mongodb.net/rb60?appName=Cluster0",
    )
    .then(() => {
      console.log("Connection Established");
    })
    .catch((err) => {
      console.log("Connect Error", err);
    });
}

module.exports = dbConnect;
