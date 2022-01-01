const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });
  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }
  // Check for user
  const user = await User.findOne({ email }).select("+password");
  // Check to make sure user exists
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  // Check to see if passwords match
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

// @desc      Logout user
// @route     POST /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get User information
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  // set options
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
