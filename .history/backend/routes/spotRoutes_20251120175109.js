// routes/spotRoutes.js
import express from "express";
import { getAllSpots, getSpotById, getSpotBySlug } from "../controllers/spotController.js";
const router = express.Router();

router.get("/", getAllSpots);
router.get("/:slug", getSpotBySlug);
router.get("/id/:id", getSpotById);


export default router;
