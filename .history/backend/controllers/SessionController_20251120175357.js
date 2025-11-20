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
        const session = await Session.getNextSession(spotId);
        res.json(session);
    } catch (err) {
        console.error("ERROR getNextSession:", err);
        res.status(500).json({ message: "Error" });
    }
};

// JAM OPERASIONAL (start dari sesi paling awal, end dari sesi terakhir)
export const getOperationalHours = async (req, res) => {
    try {
        const spotId = req.params.spotId;

        // Ambil semua sesi untuk spot ini
        const sessions = await Session.getBySpot(spotId);

        if (!sessions || sessions.length === 0) {
            return res.json({ open: null, close: null });
        }

        // Sort by start_time (jaga-jaga)
        sessions.sort((a, b) => a.start_time.localeCompare(b.start_time));

        const open = sessions[0].start_time;
        const close = sessions[sessions.length - 1].end_time;

        res.json({
            open,
            close
        });

    } catch (err) {
        console.error("ERROR getOperationalHours:", err);
        res.status(500).json({ message: "Error fetching operational hours" });
    }
};