export const allMovies = async (req, res, next) => {
  try {
    res.send("Hello from  All Movies");
  } catch (error) {
    next(error);
  }
};
