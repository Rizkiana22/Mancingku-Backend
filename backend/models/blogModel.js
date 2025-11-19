import db from "../config/db.js";

export const getAllPosts = (result) => {
    db.query("SELECT * FROM blogs ORDER BY created_at DESC", (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const getPostBySlug = (slug, result) => {
    db.query("SELECT * FROM blogs WHERE slug = ? LIMIT 1", [slug], (err, res) => {
        if (err) return result(err, null);
        result(null, res[0]);
    });
};

export const createPost = (data, result) => {
    db.query("INSERT INTO blogs SET ?", data, (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const updatePost = (data, id, result) => {
    db.query("UPDATE blogs SET ? WHERE id = ?", [data, id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};

export const deletePost = (id, result) => {
    db.query("DELETE FROM blogs WHERE id = ?", [id], (err, res) => {
        if (err) return result(err, null);
        result(null, res);
    });
};
