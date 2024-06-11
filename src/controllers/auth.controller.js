import { createUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  const { name, email, password, picture } = req.body;

  const user = await createUser({
    name,
    email,
    picture,
    password,
  });

  try {
    res.send(user);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  res.send("Hello from Login");
};
export const logout = async (req, res, next) => {
  res.send("Hello from Logout");
};
export const refreshToken = async (req, res, next) => {
  res.send("Hello from refresh Token");
};
