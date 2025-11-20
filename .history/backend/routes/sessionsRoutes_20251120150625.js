import express from "express";
import { getNextSession, getSessionBySpot } from "../controllers/SessionController.js";

const router = express.Router();

router.get('/:spotId/sessions', SessionController.getSessionBySpot);
router.get('/:spotId/next-session', SessionController.getNextSession);

export default router;
