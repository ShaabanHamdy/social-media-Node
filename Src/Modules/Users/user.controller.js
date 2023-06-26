import userModel from "../../../DB/Models/user.model.js"
import { tokenDecode, tokenGeneration } from "../../Utils/tokenFunction.js"
import sendEmail from "../../services/sendEmail.js"
import bc from 'bcryptjs'
import { nanoid } from "nanoid";


// //====================== sign up ======================
export const signUp = async (req, res, next) => {
    const { firstName,  email, password } = req.body
    const checkUser = await userModel.findOne({ email })
    if (checkUser) {
        return next(Error('email already exist'))
    }
    const newUser = new userModel({ firstName,  email, password })

    const token = tokenGeneration({ payload: { newUser } })

    if (!token) { return next(Error("Token Generation fail ", { cause: 400 })) }

    const confirmationLink = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/user/confirmation/${token}`
    const message = `<a href=${confirmationLink}>please ${firstName} click to confirm </a>`
    const emailSent = sendEmail({
        to: email,
        message: message,
        subject: "Confirmation Link"
    })
    if (!emailSent) {
        return next(Error("fail in send email"))
    }
    res.json({ message: "Check your email to confirm" })
}
// //====================================================== confirmation ===================

export const confirmation = async (req, res, next) => {
    const { token } = req.params
    const decode = tokenDecode({ payload: token })
    if (!decode?.newUser) {
        return next(Error("fail in decode", { cause: 400 }))
    }
    decode.newUser.isConfirmed = true
    const userConfirm = new userModel({ ...decode.newUser })
    const saveUser = await userConfirm.save()
    res.json({ message: "Confirmation Done" })
}
//==================================================== log in =======================

export const logIn = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, isConfirmed: true })
    if (!user) {
        return next(Error("invalid email information", { cause: 400 }))
    }
    const match = bc.compareSync(password, user.password)
    if (!match) {
        return next(Error("invalid password information", { cause: 400 }))
    }
    const token = tokenGeneration({ payload: { _id: user._id, email: user.email, isLoggedIn: true } })
    const logInUser = await userModel.findOneAndUpdate({ _id: user._id }, { isLoggedIn: true })
    if (!logInUser) {
        return next(Error("please logIn again", { cause: 400 }))
    }
    res.json({ message: "LogIn Success", token })
}
//=================================== forget password =======
export const forgetPassword = async (req, res, next) => {
    const { email } = req.body
    const generationCode = nanoid()
    const checkEmail = await userModel.findOne({ email })
    if (!checkEmail) {
        return next(Error("there is no user with this email", { cause: 401 }))
    }
    const sendCode = await sendEmail({
        to: email,
        subject: "Confirmation Code",
        message: `Your confirmation Code is ${generationCode}`
    })
    if (!sendCode) {
        return next(Error("fail in Send Confirmation Code", { cause: 400 }))
    }
    const user = await userModel.findOneAndUpdate({ email, isConfirmed: true }, { code: generationCode })
    res.json({ message: "check your email to get confirmation Code" })
}
//=======================================================changePassword ==================== 
export const restPassword = async (req, res, next) => {
    const { code, newPassword } = req.body
    const user = await userModel.find().select('code')
    if (user[0].code == code) {
        const hashPassword = bc.hashSync(newPassword, +process.env.SALT_ROUNDS)
        const changePass = await userModel.updateOne({ password: hashPassword })

        return changePass ? res.json({ message: `new password is ${newPassword}` })
            : res.json({ message: `password did not change` })
    }

    return next(Error("invalid Code information", { cause: 400 }))
}
