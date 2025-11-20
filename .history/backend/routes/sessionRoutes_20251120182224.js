import express from "express";
import { getNextSession, getSessionBySpot , getOperationalHours} from "../controllers/sessionController.js";

const router = express.Router();

router.get('/:spotId/next-session', getNextSession);
router.get('/:spotId/operational-hours', getOperationalHours);
router.get('/:spotId/sessions', getSessionBySpot); // letakkan yang paling general di paling bawah

export default router;
