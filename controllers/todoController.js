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

// @desc Get single todo by ID
// @route GET /api/v1/todos/id
// @access Public
exports.getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  // Check to make sure a todo was found
  if (!todo) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc Create new todo
// @route DELETE /api/v1/todos/id
// @access Public
exports.createTodo = asyncHandler(async (req, res, next) => {
  const { title, details } = req.body;
  const todo = await Todo.create({ title, details });
  res.status(201).json({
    success: true,
    data: todo,
  });
});

// @desc Update todo
// @route PUT /api/v1/todos/id
// @access Public
exports.updateTodo = asyncHandler(async (req, res, next, id) => {
  let todo = await Todo.findById(req.params.id);
  // Check to make sure a todo was found
  if (!todo) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  // Save todo in database
  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc Create new todo
// @route DELETE /api/v1/todos/id
// @access Public
exports.deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  // Check to make sure a todo was found
  if (!todo) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  todo.remove();
  res.status(201).json({
    success: true,
    data: `resource with id of ${req.params.id} has been deleted`,
  });
});
