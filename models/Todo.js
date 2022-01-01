const mongoose = require("mongoose");
const slugify = require("slugify");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "Please ensure a todo has a title"],
    trim: true,
    maxlength: [100, "title cannot be more than 100 characters"],
  },
  slug: String,
  details: {
    type: [String],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

TodoSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Todo", TodoSchema);
