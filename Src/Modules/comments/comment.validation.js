import joi from "joi";





export const addSchema ={
    body: joi.object().required().keys({
        postId:joi.string().required(),
        comment:joi.string().required()
    })
}


export const deleteSchema ={
    params: joi.object().required().keys({
        commentId:joi.string().required().min(24).max(24),
    })
}

