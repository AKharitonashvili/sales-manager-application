import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  getUserInfoByToken,
} from "../controllers/auth.mjs";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/token", refreshToken);
authRouter.post(
  "/user-info",
  getUserInfoByToken
);

export default authRouter;
