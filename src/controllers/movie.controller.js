export const allMovies = async (res, res, next) => {
  try {
    res.send("Hello from  All Movies");
  } catch (error) {
    next(error);
  }
};
