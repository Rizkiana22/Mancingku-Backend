import db from "../config/db.js";

const Review = {
  create: (data, callback) => {
    db.query(
      `
      INSERT INTO reviews 
      (user_id, spot_id, rating, comment, created_at)
      VALUES (?, ?, ?, ?, NOW())
      `,
      [data.user_id, data.spot_id, data.rating, data.comment],
      callback
    );
  },

getBySpot: (spotId, callback) => {
  db.query(
    `
    SELECT reviews.*, users.name AS user_name
    FROM reviews
    JOIN users ON reviews.user_id = users.id
    WHERE reviews.spot_id = ?
    ORDER BY reviews.created_at DESC
    `,
    [spotId],
    callback
  );
},

  getAverageRating: (spot_id, callback) => {
    db.query(
      `SELECT AVG(rating) AS avg_rating FROM reviews WHERE spot_id = ?`,
      [spot_id],
      callback
    );
  }
};

export default Review;
