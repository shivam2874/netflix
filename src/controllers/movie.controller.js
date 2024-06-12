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
