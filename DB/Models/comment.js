import { model, Schema } from "mongoose";

const commentSchema = new Schema({
    commentBody: {
        type: String,
        required: true
    },
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "Reply"
    }]

},
    {
        timestamps: true
    })
const commentModel = model.Comment || model('Comment', commentSchema)

export default commentModel
