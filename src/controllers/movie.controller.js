import Movie from "../models/movieModel.js";

export const allMovies = async (req, res, next) => {
  const movies = await Movie.find();
  try {
    res.status(200).json({
      results: movies.length,
      data: {
        movies,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMovie = async (req, res, next) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      res.send("Hello");
    }
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).json({
        status: "Failed",
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
