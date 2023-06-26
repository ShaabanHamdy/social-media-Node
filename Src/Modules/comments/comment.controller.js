
import commentModel from "../../../DB/Models/comment.js"
import postModel from "../../../DB/Models/post.model.js"
import replyModel from "../../../DB/Models/reply.model.js"




export const addComment = async (req, res, next) => {

    const { commentBody, postId } = req.body
    const { _id } = req.user

    const post = await postModel.findOne({ _id: postId })
    if (!post) {
        return next(Error("invalid post id"), { cause: 400 })
    }

    const comment = new commentModel({
        commentBody, postId, commentBy: _id
    })

    const saveComment = await comment.save()
    if (!saveComment) {
        return next(Error("fail in saveComment"))
    }

    const check = await postModel.updateOne({ _id: postId }, {
        $push: {
            comments: comment._id,
            comments: commentBody
        }
    })

    if (!check.modifiedCount) {
        return next(Error("push in  fail "))

    }

    res.status(201).json({ message: "saveComment done", saveComment })

}
//================================================================ delete comment 

export const deleteComment = async (req, res, next) => {
    const { commentId } = req.params
    const { _id } = req.user
    const deleteComment = await commentModel.findOneAndDelete({ _id: commentId, commentBy: _id })
    if (!deleteComment) {
        return next(Error("you cant delete this comment"))
    }

    const check = await postModel.updateOne({ _id: deleteComment.postId }, {
        $pull: {
            comments: deleteComment._id
        }
    })

    if (!check.modifiedCount) {
        return next(Error("pull in fail"))

    }
    res.status(201).json({ message: "deleted Done" })

}

//========================================================reply comment ==========

export const addReply = async (req, res, next) => {
    const { reply_id, replyBody } = req.body
    const { _id } = req.user
    const comment = await commentModel.findById(reply_id)
    if (!comment) {
        return next(Error("invalid comment id"))
    }
    const newReply = new replyModel({
        reply_id, replyBody, replyBy: _id
    })
    const saveReply = await newReply.save()
    const check = await commentModel.updateOne({ _id: reply_id }, {
        $push: {
            replies: newReply._id
        }
    })
    if (!check.modifiedCount) {
        return next(Error("push in fail"))

    }
    res.json({ message: "reply comment Done", saveReply })
}
//=================================================================addReplyOnReply=======================
export const addReplyOnReply = async (req, res, next) => {
    const { reply_id, replyBody } = req.body
    const { _id } = req.user
    const comment = await replyModel.findById(reply_id)
    if (!comment) {
        return next(Error("invalid reply id"))
    }
    const newReply = new replyModel({
        reply_id, replyBody, replyBy: _id
    })
    const saveReply = await newReply.save()
    const check = await replyModel.updateOne({ _id: reply_id }, {
        $push: {
            replies: newReply._id
        }
    })
    if (!check.modifiedCount) {
        return next(Error("push in fail"))

    }
    res.json({ message: "reply comment Done", saveReply })
}
//=========================================================================
