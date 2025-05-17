import { Schema, model } from "mongoose"

let userSchema = new Schema({
    username : {type:String,unique:true},
    password: String,
    profile_img : String,
},{strict:true})

let userModel = model("User",userSchema)

export default userModel 