import express from "express";
import {
  getManagers,
  getManager,
  createManager,
  updateManager,
  deleteManager,
} from "../controllers/managers.controller.mjs";

export const managerRouter =
  express.Router();

managerRouter.get("/", getManagers);
managerRouter.get("/:id", getManager);

managerRouter.post("/", createManager);

// update a manager
managerRouter.put(
  "/:id",
  updateManager
);

// delete a manager
managerRouter.delete(
  "/:id",
  deleteManager
);
