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

            db.query(query, [spotId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        }) ;
    },

    getNextSession: (spotId) => {
        return new Promise((resolve, reject) => {
            const q = `
            SELECT
                s.*, (s.capacity - COUNT(b.id)) AS seats_left
            FROM sessions s
            LEFT JOIN bookings b
                ON b.session_id = s.id
                AND b.booking_date =CURDATE()
            WHERE s.spot_id = ?
            order BY
                (TIME(NOW()) > s.end_time),
                s.start_time
            LIMIT 1;`
        })
    }
}