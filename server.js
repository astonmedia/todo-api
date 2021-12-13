// Third party packages
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

// Custom Packages
const connectDB = require("./config/db");
// Load config env variables
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

// Create express app
const app = express();
// Body Parser
app.use(express.json());
// Set port variable
const PORT = process.env.PORT || 5000;
// Dev logging in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

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
// Start the application
server();
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  process.exit(1);
});
