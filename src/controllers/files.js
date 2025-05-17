import { FileService } from "../service/files.js"

class FilesController{
    constructor(){}

    async getAllFiles(req,res,next){
        try {
            let files 
            if(req.query){
                files = await FileService.singleFile(req.query)  
            }else {
                files = await FileService.allFiles()
            }
            
            res.status(200).json(files)
        } catch (error) {
            next(error)
        }
    }

    async getSingelFiles(req,res,next){
        try {
            let file = await FileService.singleFile({user_id:req.params.userId})
            res.status(200).json(file)
        } catch (error) {
            next(error)
        }
    }

    async createFile(req,res,next) {
        try {
            req.body.user_id = req.userId
            let dataFile = await FileService.postFile(req.body,req.files.file)
            res.status(201).json(dataFile)
        } catch (error) {
            next(error)
        }
    }
    async getFiles(req,res,next) {
        try {
            let files = await FileService.readFiles(req.userId)
            res.status(200).json(files)
        } catch (error) {
            next(error)
        }
    }

    async deleteFile(req,res,next){
        try {
            let del = await FileService.removeFile(req.params.fileId)
            res.status(200).json(del)
        } catch (error) {
            next(error)
        }
    }

    async updateFile(req,res,next) {
        try {
            let update = await FileService.renameFile(req.body)
            res.status(201).json(update)
        } catch (error) {
            next(error)
        }
    }
}

const newFile = new FilesController()

export default newFile