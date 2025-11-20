// routes/spotRoutes.js
import express from "express";
import { getAllSpots, getSpotById, getSpotBySlug } from "../controllers/spotController.js";
const router = express.Router();

router.get("/", getAllSpots);
router.get("/detail/:id", getSpotById);
router.get("/slug/:slug", getSpotBySlug);


export default router;
