import express from "express";
import { getNextSession, getSessionBySpot , getOperationalHours, getSessionBySpotAndDate} from "../controllers/SessionController.js";

const router = express.Router();

router.get('/:spotId/next-session', getNextSession);
router.get('/:spotId/operational-hours', getOperationalHours);
router.get('/:spotId/sessions', getSessionBySpot); // letakkan yang paling general di paling bawah
router.get("/:spotId/sessions-by-date", getSessionBySpotAndDate);
export default router;
