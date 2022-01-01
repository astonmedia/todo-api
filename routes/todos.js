const router = require("express").Router();
const Todo = require("../models/Todo");
const advancedResults = require("../middleware/advancedResults");

const { protect } = require("../middleware/auth");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.use(protect);

router.route("/").get(advancedResults(Todo), getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
