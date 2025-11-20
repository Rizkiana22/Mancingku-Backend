import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import spotRoutes from "./routes/spotRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import alatRoutes from "./routes/alatRoutes.js";
import umpanRoutes from "./routes/umpanRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import sessionRoutes from "./routes/sessionsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/spots", spotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/alat", alatRoutes);
app.use("/api/umpan", umpanRoutes);
app.use("/api/blog", blogRoutes);

export default app;
