import db from "../config/db.js";

const Spot = {
  getAll: (callback) => {
    db.query("SELECT * FROM spots", callback);
  },

  getBySlug: (slug, callback) => {
    db.query("SELECT * FROM spots WHERE slug = ?", [slug], callback);
  },

  getById: (id, callback) => {
  db.query("SELECT * FROM spots WHERE id = ?", [id], callback);
  }


updateRating: (spot_id, callback) => {
  db.query(
    `UPDATE spots SET rating = (SELECT AVG(rating) FROM reviews WHERE spot_id = ?)
    WHERE id = ?`, [spot_id, spot_id], callback
  )
}
};
export default Spot;
