import express from "express";
import {
  getTheaterAdminRequestStatus,
  requestTheaterAdminOtp,
  verifyTheaterAdminOtp,
} from "../controllers/TheaterAdminController.js";
import { protectUser } from "../middlewares/auth.js";

const TheaterAdminRouter = express.Router();

TheaterAdminRouter.use(protectUser);
TheaterAdminRouter.get("/status", getTheaterAdminRequestStatus);
TheaterAdminRouter.post("/request-otp", requestTheaterAdminOtp);
TheaterAdminRouter.post("/verify-otp", verifyTheaterAdminOtp);

export default TheaterAdminRouter;
