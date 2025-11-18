// routes/spotRoutes.js
import express from "express";
import { getAllSpots, getSpotById } from "../controllers/spotController.js";
const router = express.Router();

router.get("/", getAllSpots);
router.get("/:id", getSpotById);

export default router;
