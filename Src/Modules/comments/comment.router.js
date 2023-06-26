import { Router } from "express";
import auth  from "../../MiddleWare/auth.js";
import * as commentController from './comment.controller.js'
import { asyncHandler } from "../../Utils/errorHandling.js";
import Validation from '../../MiddleWare/validation.js'
import * as VSchema from './comment.validation.js'
const router = Router()




router.post("/addComment", auth(),Validation(VSchema.addSchema), asyncHandler(commentController.addComment))


router.delete("/delete/:commentId", auth(),Validation(VSchema.deleteSchema), asyncHandler(commentController.deleteComment))


router.post("/addReply", auth(), asyncHandler(commentController.addReply))


router.post("/addReplyOn", auth(), asyncHandler(commentController.addReplyOnReply))







export default router