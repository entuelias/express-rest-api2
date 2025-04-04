const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");


const app = express();
const PORT = 3000;

// middleware day3 part i think
app.use(cors());
app.use(bodyParser.json());

// 🟢 GET all todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});
// 🔵 POST a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "task is required" });
  }
  const query = "INSERT INTO todos (task) VALUES (?)";
  db.query(query, [task], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "todo added", id: result.insertId });
  });
});

// 🟡 UPDATE todo status
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE todos SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Todo Updated" });
  });
});

// 🔴 DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM todos WHERE id =?";
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Todo Deleted" });
  });
});

// Start server(PORT)
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
