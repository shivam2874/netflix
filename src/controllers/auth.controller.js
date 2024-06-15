import { createUser, signUser } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

/** Register Controller */

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

    // Refresh Token
    const refresh_token = await generateToken(
      { userID: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.REFRESH_TOKEN_SECRET
    );

    //Setting Cookie
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 1000, //30 Days
    });

    res.status(200).json({
      status: "Sucess",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**Login Controller */
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await signUser(email, password);
  const access_token = await generateToken(
    { userId: user._id },
    process.env.TOKEN_EXPIRE,
    process.env.REFRESH_TOKEN_SECRET
  );

  // Refresh Token
  const refresh_token = await generateToken(
    { userID: user._id },
    process.env.TOKEN_EXPIRE,
    process.env.REFRESH_TOKEN_SECRET
  );

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/auth/refreshtoken",
    maxAge: 30 * 24 * 60 * 1000, //30 days
  });

  res.status(200).json({
    status: "sucess",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      status: user.status,
      access_token,
    },
  });
};

/**Logout Controller */
export const logout = async (req, res, next) => {
  try {
    //Clear Cookie

    res.clearCookie("refreshtoken", { path: "api/v1/auth/refreshtoken" });

    res.status(200).json({
      status: "Sucess",
      message: "Logged out Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

/**RefreshToken Controller */
export const refreshToken = async (req, res, next) => {
  res.send("Hello from refresh Token");
};
