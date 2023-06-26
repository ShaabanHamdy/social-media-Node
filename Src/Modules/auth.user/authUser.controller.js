import cloudinary from "../../services/cloudinary.js"
import userModel from "../../../DB/Models/user.model.js"
import bc from 'bcryptjs'



export const profile_pic = async (req, res, next) => {
  
    const { _id, firstName } = req.user
  
    if (!req.file)  return next(Error("please upload your picture", { cause: 400 }))
    
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `profile/${firstName}`})
    
    const user = await userModel.findOneAndUpdate(_id, {  profile_picture: secure_url,  profileId: public_id })
    
    if (!user) return next(Error("please login first", { cause: 400 }))

    const deleteDate = await cloudinary.uploader.destroy(user.profileId)

    res.json({ message: "Done" })
}
//================================================================================ coverPic ==============
export const coverPic = async (req, res, next) => {
    const { _id, firstName } = req.user
    if (!req.files.length)  return next(Error("please upload your picture", { cause: 400 }))
    let images = []
    let publicId = []
    for (const file of req.files) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
            folder: `covers/${firstName}`
        })
        images.push(secure_url),
            publicId.push(public_id)
    }

    const user = await userModel.findByIdAndUpdate(_id, {
        covers: images,
        coversId: publicId
    })

    if (!user)  return next(Error("please login first", { cause: 400 }))

    const deleteUserCover = await cloudinary.api.delete_resources(user.coversId)

    res.json({ message: "Done" })
}
//================================================================================ update Password ===========
export const updatePassword = async (req, res, next) => {
    const { _id } = req.user
    const { oldPassword, newPassword } = req.body

    const user = await userModel.findById({ _id })
    if (!user)  return next(Error("please login first", { cause: 400 }))
    
    const match = bc.compareSync(oldPassword, user.password)
    if (!match)    return next(Error("wrong old password", { cause: 400 }))
    
    const hashPass = bc.hashSync(newPassword, +process.env.SALT_ROUNDS)
    const updated = await userModel.findByIdAndUpdate({ _id }, { password: hashPass })
    if (!updated) return next(Error("try again ", { cause: 400 }))
    res.json({ message: "password updated" })

}
//======================================================================================= log out ===================
export const logOut = async (req, res, next) => {
    const { _id } = req.user
    const user = await userModel.findByIdAndUpdate({ _id }, { isLoggedIn: false })
    
    user ? res.json({ message: "LogUot success" }) : next(Error("LogUot fail"))
}