import db from "../config/db.js";

const Booking = {
  create: (data, callback) => {
    const sessionQuery = `
      SELECT start_time, end_time, price 
      FROM sessions 
      WHERE id = ? LIMIT 1
    `;

    db.query(sessionQuery, [data.session_id], (err, sessionRes) => {
      if (err) {
        console.error("🔥 SESSION QUERY ERROR:", err);
        return callback(err);
      }
      if (sessionRes.length === 0) {
        return callback(new Error("Session not found"));
      }

      const session = sessionRes[0];
      const totalAmount = session.price * data.jumlah_orang;

      // FIX: total_alat harus ada
      const total_alat = data.total_alat || 0;

      const insertQuery = `
        INSERT INTO bookings
        (user_id, spot_id, session_id, booking_date, jumlah_orang, total_amount, status, created_at, total_alat)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW(), ?)
      `;

      db.query(
        insertQuery,
        [
          data.user_id,
          data.spot_id,
          data.session_id,
          data.booking_date,
          data.jumlah_orang,
          totalAmount,
          total_alat
        ],
        (err, result) => {
          if (err) {
            console.error("🔥 MYSQL INSERT ERROR:", err);
            return callback(err);
          }
          callback(null, result);
        }
      );
    });
  },


  getById: (id, callback) => {
    const query = `
      SELECT 
        b.*, 
        s.session_name, 
        s.start_time, 
        s.end_time, 
        sp.name AS spot_name
      FROM bookings b
      JOIN sessions s ON b.session_id = s.id
      JOIN spots sp ON b.spot_id = sp.id
      WHERE b.id = ?
      LIMIT 1
    `;
    db.query(query, [id], callback);
  },


  updateStatus: (bookingId, status, callback) => {
    const query = `
      UPDATE bookings
      SET status = ?
      WHERE id = ?
    `;
    db.query(query, [status, bookingId], callback);
  },


  getByUserIdPaid: (userId, callback) => {
    const query = `
      SELECT
        b.id,
        b.booking_date,
        b.jumlah_orang,
        b.total_amount,
        b.total_alat,
        b.status,
        sp.name AS spot_name,
        s.session_name,
        s.start_time,
        s.end_time
      FROM bookings b
      JOIN spots sp ON b.spot_id = sp.id
      JOIN sessions s ON b.session_id = s.id
      WHERE b.user_id = ? AND b.status = 'paid'
      ORDER BY b.created_at DESC
    `;
    db.query(query, [userId], callback);
  }
};

export default Booking;
