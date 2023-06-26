import postModel from "../../../DB/Models/post.model.js"

//========================================== add new post =========================================
export const newPost = async (req, res, next) => {
    const { title ,desc } = req.body
    const { _id } = req.user
    const newPost = new postModel({desc, title, createdBy: _id })
    const savePost = await newPost.save()
    if (!savePost)  return next(Error("fail in save post"))

    res.json({ message: "Done", savePost })
}
//========================================== delete post =========================================
export const deletePost = async (req, res, next) => {
    const { postId } = req.params
    const { _id } = req.user
    const checkUserAndDelete = await postModel.findOneAndDelete({ _id: postId, createdBy: _id })

    if (!checkUserAndDelete) {
        return next(Error("you cant delete this post"))
    }

    res.json({ message: "deleted Done" })
}
//========================================== delete post =========================================
export const updatePost = async (req, res, next) => {
    const { title , desc } = req.body
    const { postId } = req.params
    const { _id } = req.user
    const update = await postModel.findOneAndUpdate({ _id: postId, createdBy: _id },{
        title,desc
    },{
        new:true
    })

    if (!update) {
        return next(Error("you cant update this post "))
    }

    res.json({ message: "updated Done " , update})
}

// /============================================= grt all posts ============================

export const getAllPosts = async (req, res, next) => {
    const posts = await postModel.find()
    if (!posts) {
        return next(Error("there are not  posts "))
    }
    res.json({ message: "all posts", posts })
}
// //==================================================== get only user posts =====================
export const getUserPosts = async (req, res, next) => {
    const { _id } = req.user

    const Post = await postModel.find({ createdBy: _id }).populate([
        {
            path: "comments",
            select: "comment",
            populate: [{
                path: "commentBy",
                select: "firstName -_id"
            }]
        }
    ])

    if (!Post.length) {
        return next(Error("there are not  posts for this user"))
    }
 
    res.json({ message: "all posts", Post })
}


//======================================== like post ====================

export const likePost = async (req, res, next) => {
    const { postId } = req.params
    const { _id } = req.user
    const post = await postModel.findByIdAndUpdate({ _id: postId }, {
        $addToSet: {
            likes: _id
        }
    }, { new: true })

    if (!post) {
        return next(Error("not allow to add 2 Likes"))
    }
    res.status(201).json({ message: "like post Done", post })
}
//========================== remove like ============ 
export const removeLike = async (req, res, next) => {
    const { postId } = req.params
    const { _id } = req.user
    const post = await postModel.findByIdAndUpdate({ _id: postId }, {
        $pull: {
            likes: _id
        }
    }, { new: true })

    if (!post) {
        return next(Error("not allow to remove Likes"))
    }
    res.status(201).json({ message: "remove like  Done", post })
}
