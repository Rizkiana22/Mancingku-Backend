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
        console.error("🔥 SESSION NOT FOUND");
        return callback(new Error("Session not found"));
      }

      const session = sessionRes[0];
      const totalAmount = session.price * data.jumlah_orang;

      const insertQuery = `
        INSERT INTO bookings
        (user_id, spot_id, session_id, booking_date, jumlah_orang, total_amount, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
      `;

      db.query(
        insertQuery,
        [
          data.user_id,
          data.spot_id,
          data.session_id,
          data.booking_date,
          data.jumlah_orang,   // ✔ FIX DISINI
          totalAmount
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
  }
};

export default Booking;
