import { verifyToken } from '../common/auth.js'; 
import userModel from '../model/userModel.js';

export const verify = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if (token) {
            let payload = await verifyToken(token);
            if (payload.exp > Math.floor(Date.now() / 1000)) {
                req.userId = payload._id; 
                next();
            } else {
                res.status(401).send({ message: "Token Expired" });
            }
        } else {
            res.status(401).send({ message: "Invalid Token" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Internal Server error" });
    }
};



export const verifyAdmin = async (req,res,next)=>{
    try {
        let token = req.headers.authorization?.split(" ")[1]
        if(token)
        {
            let payload = await verifyToken(token)
            let user = await userModel.findById(payload._id)

            if(user && payload.role === 'admin' && user.role === payload.role)
                next()
            else
            {
                res.status(401).send({
                    message:"Unauthorized Access"
                })
            }
        }
        else
            res.status(401).send({
                message:"Invalid Token"
            })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server error"
        })
    }
}
export default verifyAdmin;
