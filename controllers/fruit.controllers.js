var FruitsModel = require("../model/fruit.model");

var getAllFruits = (req, res) => {
  FruitsModel.find().then((data) => {
    res.send(data);
  });
};
module.exports = {
  getAllFruits,
};
