const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization is in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      req.user = await User.findById(decoded.id).select(
        "_id username email points"
      );

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized, no token");
  }
});

module.exports = { protect };
