import express from "express";
import { createPayment, getPaymentByBooking } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);
router.get("/booking/:bookingId", getPaymentByBooking);

export default router;
