// Third party packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Custom Packages
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todos");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const errorHandler = require("./middleware/error");
// Load config env variables
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// Create express app
const app = express();
// Body Parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
// Set port variable
const PORT = process.env.PORT || 5000;
// Dev logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// Mount Routers to URLS
app.use("/api/v1/todos", todoRoutes);
// Load custom error handler
app.use(errorHandler);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Start server
const server = async () => {
  try {
    // Connection to the database
    await connectDB();
    app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port :${PORT}`.yellow
          .bold
      )
    );
    // Once connected start the server
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};
// Custom Error Handler
app.use(errorHandler);
// Start the application
server();
// Handle unhandled promise rejectionsjju
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  process.exit(1);
});
