import Movie from "../models/movieModel.js";

/**Creating Movie */
export const createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);

    res.status(201).json({
      status: "Sucess",
      movie: {
        newMovie,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**Reading All Movies */
export const allMovies = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];

  excludedFields.forEach((el) => delete queryObj[el]);

  const movies = await Movie.find(queryObj);

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

/**Reading  Movie by ID */
export const getMovie = async (req, res, next) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);
  try {
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (error) {
    if (error.name === "CastError" || movie == null) {
      res.status(404).json({
        status: "Failed",
        message: "Invalid Id",
      });
    }
    next(error);
  }
};

/**Updating Movie */
export const updateMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "sucess",
      movie: {
        updatedMovie,
      },
    });
  } catch (error) {
    if (error.anme === "CastError") {
      res.status(404).json({
        status: "Failed",
        message: "Invalid Id",
      });
    }
    next(error);
  }
};

/**Deleting Movie */
export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Sucess",
      data: null,
    });
  } catch (error) {
    if (error.anme === "CastError") {
      res.status(404).json({
        status: "Failed",
        message: "Invalid Id",
      });
    }
    next(error);
  }
};
9;
