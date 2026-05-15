const express = require("express");
const router = express.Router();

const {
  castVote,
  getVoteSummary,
} = require("../controllers/voteController");

const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", castVote);
router.get("/summary", verifyAdmin, getVoteSummary);

module.exports = router;