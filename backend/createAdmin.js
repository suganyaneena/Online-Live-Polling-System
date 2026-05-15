const bcrypt = require("bcryptjs");
const db = require("./config/db");

const createAdmin = async () => {
  const name = "Admin";
  const email = "admin@gmail.com";
  const password = "admin123";

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO admins (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword], (error, result) => {
    if (error) {
      console.log("Admin create error:", error);
      return;
    }

    console.log("Admin created successfully");
    process.exit();
  });
};

createAdmin();