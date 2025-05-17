import userModel from "../models/usersModel.js"
import { ValidationError } from "../utils/error.js"
import sha256 from "sha256"
import JWT from "../utils/jwt.js"
import path from "path"
export class UserService{
    constructor(){}

    static generateToken(data){
        console.log(data)
        return {
            accessToken: JWT.sign(data),
            refreshToken: JWT.signRef(data)
        }
    }

    static async createUser(data,file){
        let user = await userModel.findOne({username:data.username})
        if(user) throw new ValidationError(403,"User already exists")
        let fileName = new Date().getTime() + "." + file.name
        data.profile_img = fileName

        let newUser = await userModel.create({...data,password:sha256(data.password)})

        file.mv(path.join(process.cwd(),"src","uploads",fileName),(error)=>{
            if(error) throw error
        })

        return this.generateToken({_id:newUser._id,username:newUser.username})
    }

    static async userLogin(data){
        let user = await userModel.findOne({username:data.username,password:sha256(data.password)},{username:1})
        if(!user) throw new ValidationError(403,"User register qilmagan")
        
        return this.generateToken({_id:user._id,username:user.username})
    }

    static async getUsers(){
        let users = await userModel.find({},{username:1,profile_img:1})

        return users    
    }
}

