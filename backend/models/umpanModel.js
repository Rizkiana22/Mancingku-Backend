import db from "../config/db.js";

export const getAllUmpan = (result) => {
    db.query("SELECT * FROM umpan", (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const createUmpan = (data, result) => {
    db.query("INSERT INTO umpan SET ?", data, (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const updateUmpan = (data, id, result) => {
    db.query("UPDATE umpan SET ? WHERE id = ?", [data, id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const deleteUmpan = (id, result) => {
    db.query("DELETE FROM umpan WHERE id = ?", [id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};
