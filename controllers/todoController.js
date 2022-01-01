const Todo = require("../models/Todo");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
//const advancedResults = require("../middleware/advancedResults");

// @desc Get all todos
// @route GET /api/v1/todos
// @access Public
exports.getTodos = asyncHandler(async (req, res, next) => {
  // Send Json Response
  //res.status(200).json(res.advancedResults);
  // Get todos based on logged in user and populate with user name
  const todos = await Todo.find({ user: req.user.id }).populate({
    path: "user",
    select: "name",
  });
  if (!todos) {
    return next(
      new ErrorResponse("You do not have any todos, please create some", 404)
    );
  }
  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos,
  });
});

// @desc Get single todo by ID
// @route GET /api/v1/todos/id
// @access Public
exports.getTodo = asyncHandler(async (req, res, next) => {
  // Get todo from database
  const todo = await Todo.findById(req.params.id);
  // Check to make sure a todo was found
  if (!todo) {
    return next(
      new ErrorResponse(`Resource not found with ID of ${req.params.id}`, 404)
    );
  }
  // Check to make sure the logged in user is the todo owner
  if (todo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`
      )
    );
  }
  res.status(200).json({
    success: true,
    data: todo,
  });
});

// @desc Create new todo
// @route POST /api/v1/todos/id
// @access Public
exports.createTodo = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const todo = await Todo.create(req.body);
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
  // Check to make sure the logged in user is the todo owner
  if (todo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`
      )
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
  // Check to make sure the logged in user is the todo owner
  if (todo.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this todo`
      )
    );
  }
  todo.remove();
  res.status(201).json({
    success: true,
    data: `resource with id of ${req.params.id} has been deleted`,
  });
});
