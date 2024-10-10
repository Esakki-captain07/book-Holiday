import userService from "../service/userService.js";
import { Router } from "express";

const routes = Router()

routes.post('/create',userService.createUser)
routes.post('/login',userService.loginUser)
routes.get('/all-users',userService.getAllUsers)

export default routes