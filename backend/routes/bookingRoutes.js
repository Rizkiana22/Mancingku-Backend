import express from "express";
import { createBooking, getBookingById, updateStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id/status", updateStatus);

export default router;
