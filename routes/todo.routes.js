var express = require("express");
const { addTodo, getUserTodos } = require("../controllers/todo.controller");

var router = express.Router();

router.post("/", addTodo);

router.get("/:username", getUserTodos);

module.exports = router;
