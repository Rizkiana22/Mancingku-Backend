import db from "../config/db.js";

const Payment = {
  create: (data, callback) => {
    const query = `
      INSERT INTO mancingku_payments
      (booking_id, payment_method, amount, payment_date, created_at)
      VALUES (?, ?, ?, NOW(), NOW())
    `;
    db.query(
      query,
      [data.booking_id, data.payment_method, data.amount],
      callback
    );
  },

  getByBooking: (bookingId, callback) => {
    db.query(
      `SELECT * FROM mancingku_payments WHERE booking_id = ?`,
      [bookingId],
      callback
    );
  },
};

export default Payment;
