const mongoose = require("mongoose");

const questSchema = mongoose.Schema({
  action: {
    type: String,
    required: [true, "Please add an action"],
  },
  percentageSuccess: {
    type: Number,
    required: [true, "Please add a percentageSuccess"],
  },
  reward: {
    type: Number,
    required: [true, "Please add a reward"],
  },
});

module.exports = mongoose.model("Quest", questSchema);
