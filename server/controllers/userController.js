const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logger = require("../logger/index");

const registerUser = asyncHandler(async (req, res) => {
  logger.info("Register User");
  logger.info(JSON.stringify(req.body));

  console.log(req.body);
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new Error("Please input field");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //   Create user
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    points: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      points: user.points,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const userLogin = asyncHandler(async (req, res) => {
  logger.info("Login User");
  logger.info(JSON.stringify(req.body));
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user === undefined || user === null) {
    res.json({ status: "ERROR", error: "Cannot Find Username" });
    throw new Error("No user");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      points: user.points,
      token: generateToken(user.id),
    });
  } else {
    res.json({
      status: "ERROR",
      error: "Wrong Username/Password",
    });
    throw new Error("Invalid Credentials");
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  logger.info("Get User Details");
  logger.info(JSON.stringify(req.query));
  const { email } = req.query;
  console.log(req.query);
  const user = await User.findOne({ email }).select(
    "_id email username points"
  );
  res.json(user);
});

const getLeaderboards = asyncHandler(async (req, res) => {
  const leaderBoards = await User.find({ points: { $exists: true } })
    .sort({ points: -1 })
    .limit(10);

  res.json(leaderBoards);
});

// Generate jwt
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

module.exports = {
  registerUser,
  userLogin,
  getUserDetails,
  getLeaderboards,
};
