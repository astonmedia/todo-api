const router = require("express").Router();
const Todo = require("../models/Todo");
const advancedResults = require("../middleware/advancedResults");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.route("/").get(advancedResults(Todo), getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
