import userModel from "../models/usersModel.js"
import { ValidationError } from "../utils/error.js"
import JWT  from "../utils/jwt.js"


export default async(req,res,next) => {
    try {
        let { token } = req.headers
        
        if(!token) throw new ValidationError(404,"Token is required")

        let {username,_id} = JWT.verify(token)
        let user = await userModel.findOne({username})
        if(!user){
            throw new ValidationError(404,"User not found")
        }
        req.userId = _id
        
        next()
    } catch (error) {
        if(error.name == "TokenExpiredError"){
            next(new ValidationError(404,"Token expire!"))
        }
        if(error.name == "JsonWebTokenError"){
            next(new ValidationError(400,"Invalid token"))
        }
        next(error)
    }
}