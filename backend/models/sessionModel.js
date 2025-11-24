import db from "../config/db.js";

const Session = {
    getBySpot: (spotId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    s.*,
                    (
                        s.capacity - COALESCE(SUM(b.jumlah_orang), 0)
                    ) AS seats_left
                FROM sessions s
                LEFT JOIN bookings b ON 
                    b.session_id = s.id 
                    AND b.status = 'paid'
                    AND b.booking_date = CURDATE()
                WHERE s.spot_id = ?
                GROUP BY s.id
                ORDER BY s.start_time ASC;
            `;

            db.query(query, [spotId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    getNextSession: (spotId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    s.*,
                    (
                        s.capacity - COALESCE(SUM(b.jumlah_orang), 0)
                    ) AS seats_left
                FROM sessions s
                LEFT JOIN bookings b ON 
                    b.session_id = s.id 
                    AND b.status = 'paid'
                    AND b.booking_date = CURDATE()
                WHERE s.spot_id = ?
                GROUP BY s.id
                ORDER BY 
                    (TIME(NOW()) > s.end_time),
                    s.start_time
                LIMIT 1;
            `;

            db.query(query, [spotId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    }
};

export default Session;
