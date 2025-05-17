import { ValidationError } from "../utils/error.js"
import { Validations } from "../utils/validation.js"

export default (req,res,next) =>{
    try {
        if(req.url == "/register" && req.method == "POST"){
            let {error} = Validations.registerSchema.validate(req.body)
            if(error) throw new ValidationError(403,error.message)
        }

        if(req.url == "/login" && req.method == "POST"){
            let {error} = Validations.loginSchema.validate(req.body)
            if(error) throw new ValidationError(403, error.message)
        }

        if(req.url == "/files" && req.method == "POST"){
            let {error} = Validations.fileSchema.validate(req.body)
            if(error) throw new ValidationError(403, error.message)
        }

        next()
    } catch (error) {
        next(error)
    }
}