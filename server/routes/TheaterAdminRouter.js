import express from "express";
import {
  getTheaterAdminRequestStatus,
  submitTheaterAdminRequest,
} from "../controllers/TheaterAdminController.js";
import { protectUser } from "../middlewares/auth.js";

const TheaterAdminRouter = express.Router();

TheaterAdminRouter.use(protectUser);
TheaterAdminRouter.get("/status", getTheaterAdminRequestStatus);
TheaterAdminRouter.post("/request", submitTheaterAdminRequest);

export default TheaterAdminRouter;
