import jwt from 'jsonwebtoken'



//=========================== sign token ===================
const tokenGeneration = ({
    payload = {},
    signature = process.env.TOKEN_SIGNATURE,
    expiresIn = '3hour'
}) => {
    if (Object.keys(payload).length) {
        const token = jwt.sign( payload, signature , { expiresIn })
        return token
    }
    return false
}
//================================= verify token =============================
const tokenDecode = ({
    payload = '',
    signature = process.env.TOKEN_SIGNATURE,

}) => {
    if (!payload) {
        return false
    }
    const decode = jwt.verify(payload, signature)
    return decode

}
export { tokenDecode, tokenGeneration }