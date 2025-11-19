import { getAllAlat, createAlat, updateAlat, deleteAlat } from "../models/alatModel.js";

export const showAlat = (req, res) => {
    getAllAlat((err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
};

export const addAlat = (req, res) => {
    const data = req.body;
    createAlat(data, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Alat pancing added", result });
    });
};

export const editAlat = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateAlat(data, id, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Alat pancing updated", result });
    });
};

export const removeAlat = (req, res) => {
    const id = req.params.id;
    deleteAlat(id, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Alat pancing deleted", result });
    });
};
