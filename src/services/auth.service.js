import createHttpError from "http-errors";
import validator from "validator";
import UserModel from "../models/userModel.js";

export const createUser = async (userData) => {
  const { name, email, password, picture } = userData;

  try {
    //check if all fields are empty
    if (!name || !email || !password) {
      throw createHttpError.BadRequest("Please Fill All Fields");
    }

    //Checking Length of the Name
    if (
      !validator.isLength(name, {
        min: 3,
        max: 16,
      })
    ) {
      throw createHttpError.BadRequest(
        "Name Should be between 3 and 16 characters"
      );
    }

    //Validating the Email
    if (!validator.isEmail(email)) {
      throw createHttpError.BadRequest("Please Provide a Valid Email");
    }

    //check if user already exists
    const checkDb = UserModel.findOne({ email });
    if (checkDb) {
      createHttpError.Conflict("This Email Address already exists");
    }

    //check password length
    if (
      !validator.isLength(password, {
        min: 6,
        max: 128,
      })
    ) {
      createHttpError.BadRequest(
        "Please make sure your password is between 6 to 128 characters"
      );
    }

    //Hash Password in the user Model

    const user = await new UserModel({
      name,
      email,
      picture: picture || "https://avatar.iran.liara.run/public",
      password,
    }).save();
    return user;
  } catch (error) {
    return error;
  }
};
