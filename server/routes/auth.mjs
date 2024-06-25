import { Router } from "express";
import {
  register,
  login,
  refreshToken,
} from "../controllers/auth.mjs";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/token", refreshToken);

export default authRouter;
