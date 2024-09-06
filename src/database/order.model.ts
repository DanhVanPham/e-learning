import { ECourseLevel, ECourseStatus, EOrderStatus } from '@/types/enums'
import { Document, Schema, model, models } from 'mongoose'

export interface IOrder extends Document {
    _id: string
    code: string
    course: Schema.Types.ObjectId
    user: Schema.Types.ObjectId
    created_at: Date
    total: number
    amount: number
    discount: number
    status: EOrderStatus
    coupon: Schema.Types.ObjectId
}

const orderSchema = new Schema<IOrder>({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coupon: {
        type: Schema.Types.ObjectId,
        ref: 'Coupon'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
    },
    amount: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    status: {
        type: String,
        enum: Object.values(EOrderStatus),
        default: EOrderStatus.PENDING
    }
})

const Order = models.Order || model('Order', orderSchema)

export default Order
