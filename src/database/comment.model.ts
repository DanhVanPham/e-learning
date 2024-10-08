import { ECommentStatus } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface IComment extends Document {
    _id: string;
    content: string;
    lesson: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
    status:ECommentStatus;
    parentId?: Schema.Types.ObjectId;
    created_at: Date;
}

const commentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: true,
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    status: {
        type: String,
        default: ECommentStatus.PENDING,
        enum: Object.values(ECommentStatus),
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
}, { collection: 'comments' })

const Comment = models.Comment || model('Comment', commentSchema)

export default Comment