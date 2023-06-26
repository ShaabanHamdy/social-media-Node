import { Router } from "express";
import { myMulter } from "../../services/multer.js";
import { asyncHandler } from "../../Utils/errorHandling.js";
import * as authControllers from './authUser.controller.js'
import auth from "../../MiddleWare/auth.js";

const router = Router()


router.patch("/profile", auth(), myMulter({}).single('pic'), asyncHandler(authControllers.profile_pic))


router.patch("/cover", auth(), myMulter({}).array('pic'), asyncHandler(authControllers.coverPic))


router.put("/updatePass" , auth() ,asyncHandler(authControllers.updatePassword))



router.post("/logout",auth(), asyncHandler(authControllers.logOut))




export default router