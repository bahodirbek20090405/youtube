import { Router } from "express";
import validation from "../middleware/validation.js";
import fileController from "../controllers/files.js"
import checkToken from "../middleware/checkToken.js";

const router = Router()

router
    .get("/api/file/all",fileController.getAllFiles)
    .get("/api/file/single/:userId",fileController.getSingelFiles)
    .post("/api/files",validation, checkToken, fileController.createFile)
    .get("/api/files",checkToken,fileController.getFiles)
    .delete("/api/file/:fileId",checkToken,fileController.deleteFile)
    .put("/api/file",checkToken,fileController.updateFile)

export default router

