import jwt from 'jsonwebtoken'
import userModel from '../../DB/Models/user.model.js'


const auth = () => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers
            if (!token) {
                return res.json({ message: "fail in token" })
            }
            // if (!token.startsWith(process.env.PREFIX)) {
            //     return res.json({ message: "wrong prefix" })
            // }
            // const getToken = token.split(process.env.PREFIX)[1]
            const decode = jwt.verify(token, process.env.TOKEN_SIGNATURE)
            const user = await userModel.findById(decode._id)
            if (!user) {
                return res.json({ message: "invalid user id" })
            }
            req.user = user
            next()



        } catch (error) {
            res.json({ message: "catch error in auth", error })
        }
    }
}
export default auth