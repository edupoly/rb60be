var mongoose = require("mongoose");

var fruitSchema = mongoose.Schema({
  name: String,
  price: Number,
  calories: Number,
  protine: Number,
});

var FruitModel = mongoose.model("fruit", fruitSchema);

module.exports = FruitModel;
