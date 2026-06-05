var TodoModel = require("../model/todos.model");
function addTodo(req, res) {
  var newTodo = new TodoModel({
    username: req.body.username,
    title: req.body.title,
    status: false,
  });
  newTodo.save();
  res.send("please wait... im preparing...");
}
function getUserTodos(req, res) {
  TodoModel.find({ username: req.username }).then((data) => {
    res.send(data);
  });
}
module.exports = { addTodo, getUserTodos };
