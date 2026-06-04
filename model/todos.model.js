var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
  username: String,
  title: String,
  status: Boolean,
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

var TodoModel = mongoose.model("todo", todoSchema);

module.exports = TodoModel;
