const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please add an email"],
  },
  username: {
    type: String,
    required: [true, "Please add a userName"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  points: {
    type: Number,
    required: [true, "Please add a points"],
  },
});

module.exports = mongoose.model("User", userSchema);
