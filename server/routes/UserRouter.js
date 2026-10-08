import express from 'express'
import { getFavorites, getUserBookings, updateFavorite } from '../controllers/UserController.js'

const UserRouter = express.Router()

UserRouter.get('/bookings', getUserBookings)
UserRouter.post("/update-favorite", updateFavorite)
UserRouter.get("/favorites", getFavorites)

export default UserRouter