
export let stackVar;

export const asyncHandler = (API) => {
    return ( req, res, next) => {
        API( req, res, next).catch(err => {
            if (err.code == 11000) {
                return next(Error('email already exist', { cause: 409 }))
            }
            stackVar = err.stack
            next(Error(err.message))
        })
    }
}

