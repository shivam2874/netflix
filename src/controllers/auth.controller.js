import { createUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, picture } = req.body;

    const user = await createUser({
      name,
      email,
      picture,
      password,
    });
    // Generate the access token
    const access_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      user,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
};
export const logout = async (req, res, next) => {
  res.send("Hello from Logout");
};
export const refreshToken = async (req, res, next) => {
  res.send("Hello from refresh Token");
};
