import { Router } from "express";
import auth from "../../MiddleWare/auth.js";
import * as postController from './post.controller.js'
import { asyncHandler } from "../../Utils/errorHandling.js";
import * as validationSchema from './post.validation.js'
import Validation from '../../MiddleWare/validation.js'

const router = Router()

router.post("/addPost",Validation(validationSchema.addPostSchema), auth(), asyncHandler(postController.newPost))

router.get("/getAll", asyncHandler(postController.getAllPosts))

router.get("/getUserPosts",auth(), asyncHandler(postController.getUserPosts))

router.delete("/delete/:postId",Validation(validationSchema.deleteSchema), auth(), asyncHandler(postController.deletePost))

router.put("/remove/:postId", auth(), asyncHandler(postController.removeLike))

router.put("/update/:postId", auth(),Validation(validationSchema.updateSchema), asyncHandler(postController.updatePost))

router.put("/like/:postId", auth(), asyncHandler(postController.likePost))

router.put("/removeUnlike/:postId", auth(), asyncHandler(postController.removeLike))

export default router