import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Movie must have a Title"],
    },
    description: {
      type: String,
      required: [true, "A movie must have an Title"],
    },
    genre: {
      type: [String],
      required: [true, "A movie Must have a Genre eample Crime, Action etc.."],
    },
    release_year: {
      type: Number,
      required: [true, "Please Provide when the movie was released"],
    },
    director: {
      type: String,
      required: [true, "Please Provide the Director Name"],
    },
    rating: {
      type: String,
      required: [true, "Please provide the Rating"],
    },
    cast: {
      type: [String],
      required: [true, "Please procide the Cast for the movie"],
    },
    duration_minutes: {
      type: Number,
      required: [true, "Please Provide the Time "],
    },
    poster: String,
  },
  { collection: "movies", timestamps: true }
);

const Moviemodel =
  mongoose.model.MovieModel || mongoose.model("Movie", movieSchema);

export default Moviemodel;
