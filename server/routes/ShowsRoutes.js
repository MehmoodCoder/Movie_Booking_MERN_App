import express from 'express'
import { getNowPlayingShows, addShow } from '../controllers/ShowsController.js'

const ShowsRouter = express.Router()

ShowsRouter.get('/now-playing', getNowPlayingShows)
ShowsRouter.post('/add', addShow)

export default ShowsRouter