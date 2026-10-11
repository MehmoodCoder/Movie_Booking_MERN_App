import express from 'express'
import { protectAdmin, protectUser } from '../middlewares/auth.js'
import { getAllBookings, getAllShows, getDashboardData, isAdmin } from '../controllers/AdminController.js'
import { decideTheaterAdminRequest, getTheaterAdminRequests } from '../controllers/TheaterAdminController.js'

const AdminRouter = express.Router()

AdminRouter.get("/is-admin", protectUser, isAdmin)
AdminRouter.get("/dashboard", protectAdmin, getDashboardData)
AdminRouter.get("/all-shows", protectAdmin, getAllShows)
AdminRouter.get("/all-bookings", protectAdmin, getAllBookings)
AdminRouter.get("/theater-requests", protectAdmin, getTheaterAdminRequests)
AdminRouter.patch("/theater-requests/:requestId", protectAdmin, protectUser, decideTheaterAdminRequest)


export default AdminRouter