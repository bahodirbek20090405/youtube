import { Schema, model, now } from "mongoose"

let fileSchema = new Schema({
    title : String,
    file: String,
    size : Number,
    user_id:{type:Schema.Types.ObjectId, ref:"User"},
    createAt: {type:Date,default:new Date()},
},{strict:true})

let fileModel = model("File",fileSchema)

export default fileModel 