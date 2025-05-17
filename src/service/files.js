import fileModel from "../models/filesModel.js"
import path from "path"
import { NotFoundError } from "../utils/error.js"

export class FileService{
    constructor(){}

    static async allFiles(){
        let files = await fileModel.find().populate("user_id","username profile_img")
        return files
    }

    static async singleFile(payload){
        let files = await fileModel.find(payload).populate("user_id","username profile_img")
        return files
    }

    static async postFile(data,file){
        let fileName = new Date().getTime() + "." + file.name
        data.size = Math.ceil((file.size / 1024) / 1024)
        
        data.file = fileName
        let newFile = await fileModel.create(data)

        file.mv(path.join(process.cwd(),"src","uploads",fileName),(error)=>{
            if(error) throw error
        })

        return newFile
    }

    static async readFiles(userId){
        let files = await fileModel.find({user_id:userId})
        return files
    }

    static async removeFile(fileId){
        let delFile = await fileModel.deleteOne({_id:fileId})
        console.log(delFile)
        if(!delFile.deletedCount) throw new NotFoundError(404,"File not found")

        return "File deleted"
    }

    static async renameFile(data){
        await fileModel.findByIdAndUpdate({_id:data.file_id},{$set:{title:data.title}})
        return "Updated file"
    }
}