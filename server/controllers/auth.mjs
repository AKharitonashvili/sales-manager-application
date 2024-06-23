import express from "express";
import bcrypt from "bcryptjs";
import { Manager } from "../models/managers.model.mjs";
import {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
} from "../utils/jwt.mjs";
import cookie from "cookie";

export const authRouter =
  express.Router();

// Register route
authRouter.post(
  "/register",
  (req, res) => {
    const {
      username,
      name,
      surname,
      password,
    } = req.body;

    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const newManager = new Manager({
          username,
          name,
          surname,
          registrationDate: new Date(),
          password: hashedPassword,
        });

        newManager
          .save()
          .then(() => {
            res.status(201).json({
              message:
                "Manager registered successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  }
);

// Login
authRouter.post(
  "/login",
  (req, res) => {
    const { username, password } =
      req.body;

    // Find manager by username
    Manager.findOne({ username })
      .then((manager) => {
        if (!manager) {
          return res.status(401).json({
            message:
              "Invalid credentials",
          });
        }

        // Compare password
        bcrypt
          .compare(
            password,
            manager.password
          )
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(401)
                .json({
                  message:
                    "Invalid credentials",
                });
            }

            // Generate JWT token
            const token =
              generateToken(manager);
            const refreshToken =
              generateRefreshToken(
                manager
              );

            // Store refresh token in database
            manager.refreshToken =
              refreshToken;
            manager.save();

            // Set tokens in cookies
            res.setHeader(
              "Set-Cookie",
              [
                cookie.serialize(
                  "token",
                  token,
                  {
                    httpOnly: true,
                    maxAge: 3600, // 1 hour (in seconds)
                    sameSite: "strict",
                    path: "/",
                    secure:
                      process.env
                        .NODE_ENV ===
                      "production",
                  }
                ),
                cookie.serialize(
                  "refreshToken",
                  refreshToken,
                  {
                    httpOnly: true,
                    maxAge:
                      7 * 24 * 60 * 60, // 7 days (in seconds)
                    sameSite: "strict",
                    path: "/",
                    secure:
                      process.env
                        .NODE_ENV ===
                      "production",
                  }
                ),
              ]
            );

            res.status(200).json({
              token,
              refreshToken,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  }
);

// Middleware to verify access token
const authenticate = (
  req,
  res,
  next
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  const verifiedUser =
    verifyToken(token);
  if (!verifiedUser) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  req.user = verifiedUser;
  next();
};

// Middleware to refresh access token using refresh token
const refreshTokenMiddleware = (
  req,
  res,
  next
) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      message:
        "Refresh token not found",
    });
  }

  const verifiedRefreshToken =
    verifyRefreshToken(refreshToken);
  if (!verifiedRefreshToken) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  // Optionally implement logic to blacklist refresh tokens

  // Generate new access token
  const token = generateToken(
    verifiedRefreshToken
  );

  // Set new token in cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 3600, // 1 hour (in seconds)
      sameSite: "strict",
      path: "/",
      secure:
        process.env.NODE_ENV ===
        "production",
    })
  );

  next();
};

// Protected route
authRouter.get(
  "/protected",
  authenticate,
  (req, res) => {
    res.status(200).json({
      message:
        "Welcome to the protected route!",
      user: req.user,
    });
  }
);

// Route to refresh access token using refresh token
authRouter.post(
  "/refresh",
  refreshTokenMiddleware,
  (req, res) => {
    res.status(200).json(req.cookies);
  }
);
