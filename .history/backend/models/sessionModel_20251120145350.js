import db from "../config/db.js";

const Session = {
    getBySpot: (spotId) => {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT 
            s.*, (s.capacity - COUNT(b.id)) AS seats_left
            FROM sessions s
            LEFT JOIN bookings b
                ON b.session_id = s.id
                AND b.booking_date = CURDATE()
            WHERE s.spot_id = ?
            GROUP BY s.id
            ORDER BY s.start_time ASC`;
        }) 
    }
}