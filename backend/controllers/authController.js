const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.adminLogin = (req, res) => {
//   const { email, password } = req.body;

//   const sql = "SELECT * FROM admins WHERE email = ?";

//   db.query(sql, [email], async (error, result) => {
//     if (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Database error",
//       });
//     }

//     if (result.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const admin = result[0];

//     const isMatch = await bcrypt.compare(password, admin.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: admin.id,
//         email: admin.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin.id,
//         name: admin.name,
//         email: admin.email,
//       },
//     });
//   });
// };

// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;

  console.log("Login request body:", req.body);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const sql = "SELECT * FROM admins WHERE email = ?";

  db.query(sql, [email], async (error, result) => {
    if (error) {
      console.log("Login DB error:", error);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    console.log("Admin found:", result.length);

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = result[0];

    console.log("DB email:", admin.email);
    console.log("DB password:", admin.password);

    const isMatch = await bcrypt.compare(password, admin.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  });
};