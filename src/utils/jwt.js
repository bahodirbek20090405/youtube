import JWT from "jsonwebtoken"

export default {
    sign: payload => JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE}),
    signRef: payload => JWT.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE_REF}),
    verify: token => JWT.verify(token,process.env.JWT_SECRET)
}