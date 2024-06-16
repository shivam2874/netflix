import express from "express";
import { allMovies, getMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.route("/movies/:id").get(getMovie);
router.route("/movies").get(allMovies);
export default router;
