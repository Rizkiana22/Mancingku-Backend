import db from "../config/db.js";

export const getAllAlat = (result) => {
    db.query("SELECT * FROM alat_pancing", (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const createAlat = (data, result) => {
    db.query("INSERT INTO alat_pancing SET ?", data, (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const updateAlat = (data, id, result) => {
    db.query("UPDATE alat_pancing SET ? WHERE id = ?", [data, id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const deleteAlat = (id, result) => {
    db.query("DELETE FROM alat_pancing WHERE id = ?", [id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};
