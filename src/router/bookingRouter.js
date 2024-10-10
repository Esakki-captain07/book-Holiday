import bookingService from "../service/bookingService.js";
import { Router } from "express";
import {verify,verifyAdmin} from '../midleware/verifyAdmin.js'

const routes = Router()

routes.post('/booking',verify,bookingService.createBooking)
routes.get('/booked-status',verify,verifyAdmin,bookingService.getAllBookings)
routes.get('/user-booked-status',verify,bookingService.getBookingsByUserId)


export default routes