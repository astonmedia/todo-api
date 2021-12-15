const Todo = require("../models/Todo");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc Get all todos
// @route GET /api/v1/todos
// @access Public
exports.getTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();
  res.status(200).json({
    success: true,
    count: todos.count,
    data: todos,
  });
});
