const express = require("express");
const router = express.Router();

const {
  registerUser,
  userLogin,
  getUserDetails,
  getLeaderboards,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getUserDetails", protect, getUserDetails);
router.get("/getLeaderboards", protect, getLeaderboards);
router.post("/", registerUser);
router.post("/login", userLogin);

module.exports = router;
