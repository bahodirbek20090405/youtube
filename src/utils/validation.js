import JOI from "joi"

export class Validations{
    constructor(){}

    static registerSchema = JOI.object({
        username: JOI.string().min(3).max(20).alphanum().required(),
        password:JOI.string().min(8).max(16).required()
    })

    static loginSchema = JOI.object({
        username: JOI.string().min(3).max(20).alphanum().required(),
        password:JOI.string().min(8).max(16).required()
    })

    static fileSchema = JOI.object({
        title: JOI.string().min(3).max(20).alphanum().required(),
        user_id:JOI.string().required()
    })
}