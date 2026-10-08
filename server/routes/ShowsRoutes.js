import express from 'express'
import { getNowPlayingShows } from '../controllers/ShowsController.js'

const ShowsRouter = express.Router()

ShowsRouter.get('/now-playing', getNowPlayingShows)

export default ShowsRouter