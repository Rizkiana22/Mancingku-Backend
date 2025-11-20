import Session from "../models/sessionModel.js";

export const getSessionBySpot = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const sessions = await Session.getBySpot(spotId);
        res.json(sessions);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching sessions" });
    }
};

export const getNextSession = async (req, res) => {
    try {
        const spotId = req.params.spotId;
        const session = await Session.getNextSession(spotId);
        res.json(session);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching next session" });
    }
};

// 🔥 FUNGSI BARU UNTUK JAM OPERASIONAL
export const getOperationalHours = async (req, res) => {
    try {
        const spotId = req.params.spotId;

        // ambil semua sesi untuk spot ini
        const sessions = await Session.getBySpot(spotId);

        if (!sessions || sessions.length === 0) {
            return res.json({ open: null, close: null });
        }

        // sesi pertama → waktu start paling kecil
        const openTime = sessions[0].start_time;

        // sesi terakhir → waktu end paling besar
        const closeTime = sessions[sessions.length - 1].end_time;

        res.json({
            open: openTime,
            close: closeTime
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching operational hours" });
    }
};
