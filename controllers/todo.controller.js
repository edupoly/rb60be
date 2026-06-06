var TodoModel = require("../model/todos.model");
function addTodo(req, res) {
  var newTodo = new TodoModel({
    username: req.username,
    title: req.body.title,
    status: false,
  });
  newTodo.save();
  res.send({ msg: "todo added" });
}
function getUserTodos(req, res) {
  TodoModel.find({ username: req.username }).then((data) => {
    res.send(data);
  });
}
module.exports = { addTodo, getUserTodos };
