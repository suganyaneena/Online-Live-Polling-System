const db = require("../config/db");

const getVoteSummaryData = (callback) => {
  const sql = `
    SELECT 
      n.id,
      n.name,
      n.party_name,
      COUNT(v.id) AS vote_count
    FROM nominees n
    LEFT JOIN votes v ON n.id = v.nominee_id
    GROUP BY n.id, n.name, n.party_name
    ORDER BY n.id ASC
  `;

  db.query(sql, (error, result) => {
    if (error) {
      return callback(error, null);
    }

    const totalVotes = result.reduce(
      (sum, item) => sum + Number(item.vote_count),
      0
    );

    callback(null, {
      totalVotes,
      nominees: result,
    });
  });
};

exports.castVote = (req, res) => {
  const { nominee_id, session_id } = req.body;

  if (!nominee_id || !session_id) {
    return res.status(400).json({
      success: false,
      message: "Nominee ID and session ID are required",
    });
  }

  const sql = `
    INSERT INTO votes (nominee_id, session_id)
    VALUES (?, ?)
  `;

  db.query(sql, [nominee_id, session_id], (error) => {
    if (error) {
      if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: "You have already voted in this session",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    getVoteSummaryData((summaryError, summary) => {
      if (!summaryError) {
        const io = req.app.get("io");
        io.emit("voteUpdated", summary);
      }
    });

    res.status(201).json({
      success: true,
      message: "Vote submitted successfully",
    });
  });
};

exports.getVoteSummary = (req, res) => {
  getVoteSummaryData((error, summary) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.status(200).json({
      success: true,
      ...summary,
    });
  });
};