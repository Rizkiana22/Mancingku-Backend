import express from "express";
import { getNextSession, getSessionBySpot , getOperationalHours} from "../controllers/sessionController.js";

const router = express.Router();

router.get('/:spotId', getSessionBySpot);
router.get('/:spotId/next', getNextSession);
router.get('/:spotId/hours', getOperationalHours);

export default router;
