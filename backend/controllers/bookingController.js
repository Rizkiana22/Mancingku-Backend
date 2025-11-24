import Booking from "../models/bookingModel.js";

export const createBooking = (req, res) => {
  Booking.create(req.body, (err, results) => {
    if (err) {
      console.log("🔥 BOOKING ERROR:", err);   // ← CETAK ERROR JELAS
      return res.status(500).json({ message: "DB error", err });
    }
    res.json({ message: "Booking created", bookingId: results.insertId });
  });
};
export const getBookingById = (req, res) => {
  Booking.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (results.length === 0) return res.status(404).json({ message: "Booking not found" });
    res.json(results[0]);
  });
};

export const updateStatus = (req, res) => {
  const bookingId = req.params.id;

  Booking.updateStatus(bookingId, "paid", (err, result) => {
    if (err) {
      console.error("UPDATE STATUS ERROR:", err);
      return res.status(500).json({ message: "Gagal update status", err });
    }

    res.json({
      message: "Status booking berhasil diupdate menjadi PAID",
      result
    });
  });
};

export const getByUserIdPaid = (req, res) => {
  const userId = req.params.id;

  Booking.getByUserIdPaid(userId, (err, results) => {
    if (err) {
      console.error("Error mengambil booking user:", err);
      return res.status(500).json({ message: "Gagal mengambil booking user" });
    }

    res.json(results);
  });
};
