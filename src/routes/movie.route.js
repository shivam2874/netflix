import express from "express";
import { allMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.route("/movies").get(allMovies);

export default router;
