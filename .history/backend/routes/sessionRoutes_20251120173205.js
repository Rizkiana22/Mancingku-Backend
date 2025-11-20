import express from "express";
import { getSessionBySpot, getNextSession, getOperationalHours } from "../controllers/sessionController.js";

const router = express.Router();

// GET /api/sessions/:spotId
router.get('/:spotId', getSessionBySpot);

// GET /api/sessions/:spotId/next
router.get('/:spotId/next', getNextSession);

// GET /api/sessions/:spotId/hours
router.get('/:spotId/hours', getOperationalHours);

export default router;
