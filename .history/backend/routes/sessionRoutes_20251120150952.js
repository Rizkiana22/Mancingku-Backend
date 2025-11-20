import express from "express";
import { getNextSession, getSessionBySpot } from "../controllers/sessionController.js";

const router = express.Router();

router.get('/:spotId/sessions', getSessionBySpot);
router.get('/:spotId/next-session', getNextSession);

export default router;
