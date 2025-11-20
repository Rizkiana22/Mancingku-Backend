import Spot from "../models/sessionModel.js";

export.getSessionBySpot = async(req, res) => {
    try {
        const spotId = req.params.spotId;
        const sessions = await Session.getBySpot(spotId);
        
    } catch (error) {
        
    }
}
