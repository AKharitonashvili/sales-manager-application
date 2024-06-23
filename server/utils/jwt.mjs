import jwt from "jsonwebtoken";
import { Manager } from "../models/managers.model.mjs";

const JWT_SECRET = "your_jwt_secret";
const REFRESH_TOKEN_SECRET =
  "your_refresh_token_secret";

// Function to generate JWT token
export const generateToken = (
  manager
) => {
  return jwt.sign(
    {
      id: manager._id,
      username: manager.username,
    },
    JWT_SECRET,
    { expiresIn: "10m" } // Token expires in 10 minutes
  );
};

// Function to generate refresh token
export const generateRefreshToken = (
  manager
) => {
  return jwt.sign(
    {
      id: manager._id,
      username: manager.username,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

// Function to verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );
    return Manager.findById(decoded.id);
  } catch (error) {
    return null;
  }
};

// Function to verify refresh token
export const verifyRefreshToken = (
  refreshToken
) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    return Manager.findById(decoded.id);
  } catch (error) {
    return null;
  }
};
