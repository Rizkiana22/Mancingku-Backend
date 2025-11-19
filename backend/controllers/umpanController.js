import { getAllUmpan, createUmpan, updateUmpan, deleteUmpan } from "../models/umpanModel.js";

export const showUmpan = (req, res) => {
    getAllUmpan((err, data) => {
        if (err) res.send(err);
        res.json(data);
    });
};

export const addUmpan = (req, res) => {
    const data = req.body;
    createUmpan(data, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Umpan added", result });
    });
};

export const editUmpan = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateUmpan(data, id, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Umpan updated", result });
    });
};

export const removeUmpan = (req, res) => {
    const id = req.params.id;
    deleteUmpan(id, (err, result) => {
        if (err) res.send(err);
        res.json({ message: "Umpan deleted", result });
    });
};
