import express from "express";
import {
  allMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  createMovie,
} from "../controllers/movie.controller.js";
import trimRequest from "trim-request";

const router = express.Router();

router
  .route("/movies/:id")
  .get(getMovie)
  .delete(deleteMovie)
  .post(trimRequest.all, updateMovie);

router.route("/movies").get(allMovies).post(trimRequest.all, createMovie);

export default router;
