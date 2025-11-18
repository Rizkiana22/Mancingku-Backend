import Payment from "../models/paymentModel.js";

export const createPayment = (req, res) => {
  Payment.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json({ message: "Payment success", paymentId: results.insertId });
  });
};

export const getPaymentByBooking = (req, res) => {
  Payment.getByBooking(req.params.bookingId, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
};
