const e = require("express");
const asyncHandler = require("express-async-handler");
const Quest = require("../Models/questModel");
const User = require("../Models/userModel");

const getAllQuests = asyncHandler(async (req, res) => {
  const allQuests = await Quest.find({});
  res.json(allQuests);
});

const attackMonster = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { userID, monsterID } = req.body;
  // console.log(monsterID);
  // console.log(userID);

  const quest = await Quest.findOne({ _id: monsterID });
  const { percentageSuccess } = quest;

  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    throw new Error("user not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { points } = user;

  // const myAttack = Math.floor(Math.random() * (1000 - 100) + 100) / 100;

  // Generate from 0 to 0.999
  // const myAttack = Math.floor(Math.random() * (1000 - 100) + 100) / 1000;

  const myAttack = Math.floor(Math.random() * 11);

  const percentageInNumber = percentageSuccess * 10;

  if (myAttack > percentageInNumber) {
    console.log("Victory");
    console.log(
      `My Attack is ${myAttack} | percentage is ${percentageInNumber} `
    );

    // Add points to user
    const totalPoints = points + quest.reward;

    await User.findByIdAndUpdate(
      { _id: userID },
      { points: totalPoints },
      { new: true }
    );

    res.json({
      result: "Victory",
      reward: quest.reward,
      monster: quest.action.split(" ")[2],
    });
  } else if (myAttack === percentageInNumber) {
    console.log("Draw");
    console.log(
      `My Attack is ${myAttack} | percentage is ${percentageInNumber} `
    );
    res.json({
      result: "Draw",
      reward: 0,
      monster: quest.action.split(" ")[2],
    });
  } else {
    console.log("Defeat");
    console.log(
      `My Attack is ${myAttack} | percentage is ${percentageInNumber} `
    );
    res.json({
      result: "Defeat",
      reward: 0,
      monster: quest.action.split(" ")[2],
    });
  }
});

module.exports = {
  getAllQuests,
  attackMonster,
};
