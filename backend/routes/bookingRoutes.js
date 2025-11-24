import express from "express";
import { createBooking, getBookingById, updateStatus, getByUserIdPaid } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/user/:id", getByUserIdPaid);
router.get("/:id", getBookingById);
router.put("/:id/status", updateStatus);


export default router;
