import { Router } from "express";
import { getReviewsBySpot, createReview } from "../controllers/reviewController.js";

const router = Router();

router.post("/reviews", createReview);
router.get("/:spotId", getReviewsBySpot);

export default router;
