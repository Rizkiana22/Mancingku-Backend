import express from "express";
import * as SessionController from "../controllers/SessionController.js";

const router = express.Router();

router.get('/:spotId/sessions', SessionController.getSessionBySpot);
router.get('/:spotId/next-session', SessionController.getNextSession);

export default router;
