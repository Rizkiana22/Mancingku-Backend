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
      `SELECT * FROM reviews WHERE spot_id = ? ORDER BY created_at DESC`,
      [spotId],
      callback
    );
  }
};

export default Review;
