import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const prtectedRoute = async(req, res, next)=>{

    try {
        const tokenValue = req.cookies.jwt;
        if(!tokenValue){
            return res.status(400).json({error:"No token Provided"})
        }

        const userDecode = jwt.verify(tokenValue, process.env.JWT_SECRET)
        if(!userDecode){
            return res.status(404).json({error:"Invalid Token"})
        }

        const userGet = await User.findById(userDecode.userId).select("-password");
        if(!userGet){
            return res.status(404).json({error:"No User Found"})

        }
        req.user = userGet;
        next();
    } catch (error) {
        // console.log("Error in protected rote", error.messege)
        return res.status(500).json({error:"Internal Server Error"})
    }


}