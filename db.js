const mysql = require("mysql2");

//connect db with mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todos_db",
});
// real connection happens here
db.connect((err) => {
  if (err) {
    console.error("database connection failed:", err);
  }
  console.log("Mysql connected...");
});

//creating my todoss table inside my todos_db
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    status ENUM("pending", "completed") DEFAULT "pending"
  )
`;


db.query(createTableQuery, (err, result) => {
  if (err) console.error("Error creating a table:", err);
  else console.log("Todos table ready!");
});

// exporting the database connection
module.exports = db;
