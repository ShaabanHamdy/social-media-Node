import { Schema, model } from "mongoose";
import bc from "bcryptjs";


const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    profile_picture: String,
    profileId: String,
    covers:[String] ,
    coversId:[String],
    code: String
}, {
    timestamps: true
})

userSchema.pre('save', function (next, doc) {
    this.password = bc.hashSync(this.password, +process.env.SALT_ROUNDS)
    next()
})



const userModel = model.User || model("User", userSchema)

export default userModel