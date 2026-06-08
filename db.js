var mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connection Established to MongoDB " + process.env.MONGO_URL);
    })
    .catch((err) => {
      console.log("Connect Error", err);
    });
}

module.exports = dbConnect;
