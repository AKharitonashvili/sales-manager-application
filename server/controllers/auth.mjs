import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.mjs";
import { Manager } from "../models/managers.model.mjs";

const JWT_SECRET = "your_jwt_secret";
const JWT_REFRESH_SECRET =
  "your_jwt_refresh_secret";

export const register = (req, res) => {
  const {
    username,
    name,
    surname,
    password,
  } = req.body;

  User.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        return res
          .status(400)
          .send(
            "Username already exists"
          );
      }

      const hashedPassword =
        bcrypt.hashSync(password, 10);

      const newManager = new Manager({
        username,
        name,
        surname,
        registrationDate: new Date(),
      });

      const newUser = new User({
        username,
        password: hashedPassword,
        managerID: newManager.id,
      });

      return newManager
        .save()
        .then(() => newUser.save())
        .then(() =>
          res.status(201).send(null)
        )
        .catch((err) => {
          if (
            err instanceof
            mongoose.Error
              .ValidationError
          ) {
            res
              .status(400)
              .send("Validation error");
          } else {
            res
              .status(500)
              .send(
                "Error registering the user or manager"
              );
            User.deleteOne({
              username,
            }).exec(); // Cleanup in case of error
            Manager.deleteOne({
              username,
            }).exec();
          }
        });
    })
    .catch((err) =>
      res
        .status(500)
        .send("Database query error")
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
      return user.save().then(() =>
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
