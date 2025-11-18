import Booking from "../models/bookingModel.js";

export const createBooking = (req, res) => {
  Booking.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", err });
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
