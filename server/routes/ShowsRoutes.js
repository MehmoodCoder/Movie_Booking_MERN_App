import express from "express";
import { getNowPlayingShows, addShow } from "../controllers/ShowsController.js";
import { protectAdmin } from "../middlewares/auth.js";

const ShowsRouter = express.Router();

ShowsRouter.get("/now-playing", protectAdmin, getNowPlayingShows);
ShowsRouter.post("/add", protectAdmin, addShow);

export default ShowsRouter;
