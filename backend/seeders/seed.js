const db = require("../config/db");
const bcrypt = require("bcryptjs");

const seedData = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminSql = `
    INSERT IGNORE INTO admins (id, name, email, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    adminSql,
    [1, "Default Admin", "admin@gmail.com", hashedPassword],
    (error) => {
      if (error) {
        console.log("Admin seed error:", error);
      } else {
        console.log("Default admin seeded");
      }
    }
  );

  const nominees = [
    ["Nominee One", "Party A", ""],
    ["Nominee Two", "Party B", ""],
    ["Nominee Three", "Party C", ""],
    ["Nominee Four", "Party D", ""],
    ["Nominee Five", "Party E", ""],
  ];

  nominees.forEach((nominee) => {
    const nomineeSql = `
      INSERT INTO nominees (name, party_name, image_url)
      SELECT ?, ?, ?
      WHERE NOT EXISTS (
        SELECT 1 FROM nominees WHERE name = ?
      )
    `;

    db.query(
      nomineeSql,
      [nominee[0], nominee[1], nominee[2], nominee[0]],
      (error) => {
        if (error) {
          console.log("Nominee seed error:", error);
        }
      }
    );
  });

  setTimeout(() => {
    console.log("Seeder completed");
    process.exit();
  }, 1000);
};

seedData();