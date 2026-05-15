const db = require("../config/db");

exports.getNominees = (req, res) => {
  const sql = "SELECT * FROM nominees ORDER BY id DESC";

  db.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.status(200).json({
      success: true,
      nominees: result,
    });
  });
};