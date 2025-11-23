import express from "express";
import { createPayment, getPaymentByBooking } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/:bookingId", getPaymentByBooking);

export default router;
