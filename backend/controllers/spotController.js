// controllers/spotController.js
import db from "../config/db.js";

export const getAllSpots = (req, res) => {
  db.query("SELECT * FROM spots", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};

export const getSpotById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM spots WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(404).json({ message: "Spot not found" });
    res.json(results[0]);
  });
};


