function addController(req, res) {
  res.send(+req.params.a + +req.params.b);
}
const mulController = ({ params: { a, b } }, res) => {
  res.send(a * b);
};
const divController = (req, res) => {
  res.send("let me know later");
};
module.exports = { addController, mulController, divController };
