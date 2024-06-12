import express from "express";
import authRoutes from "./auth.route.js";
import movieRoutes from "./movie.route.js";
const router = express.Router();

//Authentication Routes
router.use("/auth", authRoutes);

//Movie Routes
router.use("/services", movieRoutes);

export default router;
