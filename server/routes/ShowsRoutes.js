import express from "express";
import { getNowPlayingShows, addShow, getShows, getShow } from "../controllers/ShowsController.js";
import { protectAdmin } from "../middlewares/auth.js";

const ShowsRouter = express.Router();

ShowsRouter.get("/now-playing", protectAdmin, getNowPlayingShows);
ShowsRouter.post("/add", protectAdmin, addShow);
ShowsRouter.get("/all", getShows)
ShowsRouter.get("/:movieId", getShow)

export default ShowsRouter;
