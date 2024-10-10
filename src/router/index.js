import { Router } from "express";
import userRouter from './userRouter.js'
import tourRouter from './tourRouter.js'
import bookingRouter from './bookingRouter.js'


const routes = Router()

routes.get('/',(req,res)=>{
    res.send(`<div>
        <h1>Welcome to Backend</h1>
    </div>`)
})

routes.use('/user',userRouter)
routes.use('/program',tourRouter)
routes.use('/tour',bookingRouter)

export default routes