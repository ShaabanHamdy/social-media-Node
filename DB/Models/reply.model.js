import { model, Schema } from "mongoose";

const replySchema = new Schema({
    replyBody: {
        type: String,
        required: true
    },
    replyBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    comment_id: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "Reply"
    }]

},
    {
        timestamps: true
    })
const replyModel = model.Reply || model('Reply', replySchema)

export default replyModel
