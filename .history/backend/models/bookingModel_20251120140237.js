import db from "../config/db.js";

const Booking = {
  create: (data, callback) => {
    const query = `
      INSERT INTO bookings
      (user_id, spot_id, booking_date, start_time, end_time, total_amount, status, promo_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(
      query,
      [
        data.user_id,
        data.spot_id,
        data.booking_date,
        data.start_time,
        data.end_time,
        data.total_amount,
        data.status,
        data.promo_id,
      ],
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      `SELECT * FROM bookings WHERE id = ?`,
      [id],
      callback
    );
  },

  getByUser: (userId, callback) => {
    db.query(
      `SELECT * FROM bookings WHERE user_id = ?`,
      [userId],
      callback
    );
  }
};

export default Booking;
