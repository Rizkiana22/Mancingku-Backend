import Session from "../models/sessionModel.js";

// AMBIL SEMUA SESI DARI SPOT
export const getSessionBySpot = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const sessions = await Session.getBySpot(spotId);
        res.json(sessions);
    } catch (err) {
        console.error("ERROR getSessionBySpot:", err);
        res.status(500).json({ message: "Error" });
    }
};

// AMBIL SESI TERDEKAT / BERIKUTNYA
export const getNextSession = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const session = await Session.getNextSession(spotId
