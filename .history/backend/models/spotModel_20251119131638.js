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
};

export default Spot;
