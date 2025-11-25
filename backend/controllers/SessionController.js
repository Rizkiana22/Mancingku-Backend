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

export const getSessionBySpotAndDate = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const date = req.query.date; // read ?date=

        if (!date) return res.status(400).json({ message: "Tanggal wajib dikirim" });

        const sessions = await Session.getBySpotAndDate(spotId, date);
        res.json(sessions);
    } catch (err) {
        console.error("ERROR:", err);
        res.status(500).json({ message: "Error" });
    }
};

// AMBIL SESI TERDEKAT / BERIKUTNYA
export const getNextSession = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const session = await Session.getNextSession(spotId);
        res.json(session);
    } catch (err) {
        console.error("ERROR getNextSession:", err);
        res.status(500).json({ message: "Error" });
    }
};

export const getOperationalHours = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const sessions = await Session.getBySpot(spotId);

        if (!sessions || sessions.length === 0) {
            return res.json({ open: null, close: null });
        }

        // sesi paling awal
        const earliest = sessions.reduce((min, s) =>
            s.start_time < min.start_time ? s : min
        );

        // sesi paling akhir
        const latest = sessions.reduce((max, s) =>
            s.end_time > max.end_time ? s : max
        );

        res.json({
            open: earliest.start_time,
            close: latest.end_time
        });

    } catch (err) {
        console.error("ERROR getOperationalHours:", err);
        res.status(500).json({ message: "Error" });
    }
};