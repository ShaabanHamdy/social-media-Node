import { Router } from "express";
import { asyncHandler } from "../../Utils/errorHandling.js";
import * as userController from './user.controller.js'
import Validation from "../../MiddleWare/validation.js";
import * as validationSchema from './user.validation.js'
const router = Router()



//============= sign up  ====================================
router.post("/signUp", Validation(validationSchema.signUpSchema) ,asyncHandler(userController.signUp))

//============= confirmation mail ====================================
router.get("/confirmation/:token", asyncHandler(userController.confirmation))

//============= log in ====================================
router.post("/logIn", Validation(validationSchema.loginSchema), asyncHandler(userController.logIn))

//============= forgetPassword ====================================
router.post("/forgetPassword", asyncHandler(userController.forgetPassword))

//============= restPassword ====================================
router.post("/restPassword",Validation(validationSchema.forgetSchema), asyncHandler(userController.restPassword))





export default router