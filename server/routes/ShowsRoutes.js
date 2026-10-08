import exprees from 'express'
import { getNowPlayingShows } from '../controllers/ShowsController.js'

const ShowsRouter = exprees.Router()

ShowsRouter.get('/now-playing', getNowPlayingShows)

export default ShowsRouter