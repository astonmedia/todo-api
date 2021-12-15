const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load Models
const Todo = require("./models/Todo");

// Connect to database
mongoose.connect(process.env.MONGO_URI);

// Read Json files
const todos = JSON.parse(
  fs.readFileSync(`${__dirname}/data/todos.json`, "utf-8")
);

// Import into database
const importData = async () => {
  try {
    await Todo.create(todos);
    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Todo.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
