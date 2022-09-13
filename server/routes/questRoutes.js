const express = require("express");
const router = express.Router();

const {
  getAllQuests,
  attackMonster,
} = require("../controllers/questController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllQuests);
router.post("/attackMonster", protect, attackMonster);

module.exports = router;
