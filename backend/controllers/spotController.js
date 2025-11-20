import Spot from "../models/spotModel.js";

export const getAllSpots = (req, res) => {
  Spot.getAll((err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};

export const getSpotById = (req, res) => {
  const { id } = req.params;

  Spot.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(404).json({ message: "Spot not found" });

    res.json(results[0]);
  });
};

export const getSpotBySlug = (req, res) => {
  Spot.getBySlug(req.params.slug, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(404).json({ message: "Spot not found" });

    const spot = results[0];

    // Query fasilitas berdasarkan ID spot
    Spot.getFacilities(spot.id, (err2, fasilitas) => {
      if (err2) return res.status(500).json({ message: "Fasilitas DB error" });

      // Masukkan fasilitas ke objek spot
      spot.fasilitas = fasilitas;

      res.json(spot);
    });
  });
};