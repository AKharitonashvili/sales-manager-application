import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.mjs";

const JWT_SECRET = "your_jwt_secret";
const JWT_REFRESH_SECRET =
  "your_jwt_refresh_secret";

export const register = (req, res) => {
  const { username, password } =
    req.body;
  const hashedPassword =
    bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  newUser
    .save()
    .then(() =>
      res
        .status(201)
        .send("User registered")
    )
    .catch((err) =>
      res
        .status(500)
        .send(
          "Error registering the user"
        )
    );
};

export const login = (req, res) => {
  const { username, password } =
    req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send("Invalid credentials");
      }

      const isPasswordValid =
        bcrypt.compareSync(
          password,
          user.password
        );

      if (!isPasswordValid) {
        return res
          .status(401)
          .send("Invalid credentials");
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_REFRESH_SECRET
      );

      user.refreshToken = refreshToken;
      return user
        .save()
        .then(() =>
          res.json({
            token,
            refreshToken,
          })
        );
    })
    .catch((err) =>
      res
        .status(500)
        .send(
          "Error logging in the user"
        )
    );
};

export const refreshToken = (
  req,
  res
) => {
  const { token: refreshToken } =
    req.body;

  if (!refreshToken) {
    return res
      .status(403)
      .send(
        "Refresh token is required"
      );
  }

  jwt.verify(
    refreshToken,
    JWT_REFRESH_SECRET,
    (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .send(
            "Invalid refresh token"
          );
      }

      User.findById(decoded.id)
        .then((user) => {
          if (
            !user ||
            user.refreshToken !==
              refreshToken
          ) {
            return res
              .status(403)
              .send(
                "Invalid refresh token"
              );
          }

          const newToken = jwt.sign(
            {
              id: user._id,
              username: user.username,
            },
            JWT_SECRET,
            { expiresIn: "15m" }
          );
          res.json({ token: newToken });
        })
        .catch(() =>
          res
            .status(403)
            .send(
              "Invalid refresh token"
            )
        );
    }
  );
};
