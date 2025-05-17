import {UserService} from "../service/users.js"

class UserController{
    constructor(){}

    async REGISTER(req,res,next){
        try {
            let data = await UserService.createUser(req.body,req.files.img)
            res.status(201).json({status:201,data})

        } catch (error) {
            next(error)
        }
    }

    async LOGIN(req,res,next){
        try {
            let data = await UserService.userLogin(req.body)
            res.status(200).json({status:201,data})
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req,res,next){
        try {
            let data = await UserService.getUsers()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}
const newUser = new UserController()

export default newUser