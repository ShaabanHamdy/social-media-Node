import joi from "joi";



export const signUpSchema ={
    body: joi.object().required().keys({
        firstName: joi.string().required().min(4).max(8),
        email: joi.string().email().required(),
        password: joi.string().required()
    })
}


export const loginSchema ={
    body: joi.object().required().keys({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
}

export const forgetSchema ={
    body: joi.object().required().keys({
        email: joi.string().email().required(),
    })
}

export const changePasswordSchema ={
    body: joi.object().required().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        code: joi.string().required()
    })
}




