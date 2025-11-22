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
  },

  updateRating: (spot_id, callback) => {
    db.query(
      `
      UPDATE spots 
      SET rating = (
        SELECT AVG(rating) FROM reviews WHERE spot_id = ?
      )
      WHERE id = ?
      `, [spot_id, spot_id], callback
    );
  },

  getFacilities: (spotId, callback) => {
      const sql = `
        SELECT f.id, f.nama, f.icon 
        FROM spot_facilities sf
        JOIN facilities f ON f.id = sf.facility_id
        WHERE sf.spot_id = ?
      `;
      db.query(sql, [spotId], callback);
  }
  };

export default Spot;
