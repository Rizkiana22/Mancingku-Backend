import Spot from "../models/sessionModel.js";

export.getSessionBySpot = async(req, res) => {
    try {
        const spotId = req.params.spotId;
        const sessions = await Session.getBySpot(spotId);
        res.json(sessions);
        
    } catch (err) {
        res.status(500).json({ message: Error});
    }
};

export.getNextSession = async(req, res) => {
    
}
