const mongoose = require("mongoose");
const slugify = require("slugify");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please ensure a todo has a title"],
    trim: true,
    unique: [true, "A resource already exists with that title"],
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
});

TodoSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Todo", TodoSchema);
