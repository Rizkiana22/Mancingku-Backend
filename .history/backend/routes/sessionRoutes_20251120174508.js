import express from "express";
import { getNextSession, getSessionBySpot , getOperationalHours} from "../controllers/sessionController.js";

const router = express.Router();

router.get('/:spotId/sessions', getSessionBySpot);
router.get('/:spotId/next-session', getNextSession);
router.get('/:spotId/operational-hours', getOperationalHours);
export default router;
