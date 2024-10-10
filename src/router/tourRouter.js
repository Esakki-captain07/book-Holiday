import tourService from "../service/tourService.js";
import { Router } from "express";
import {verify,verifyAdmin} from '../midleware/verifyAdmin.js'


const routes = Router()

routes.post('/create-program',verify,verifyAdmin,tourService.createProgram)
routes.get('/all-programs',tourService.getAllPrograms)
routes.get('/top-rated',tourService.topRatedPlace)
routes.get('/upcomming',tourService.upCommingProgram)
routes.get('/view-tour/:tourId',tourService.viewTourById)
routes.get('/country',tourService.countryViseData)
routes.get('/beach',tourService.fetchBeach)
routes.get('/hills',tourService.fetchHills)
routes.get('/heritage',tourService.fetchHeritage)
routes.get('/adventure',tourService.fetchAdventure)
routes.get('/religeos',tourService.fetchReligeos)
routes.get('/top-honeymoon-packeages',tourService.topHoneymoonPackages)




export default routes