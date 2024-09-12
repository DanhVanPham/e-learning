import { ECouponType } from "@/types/enums";
import { Document, model, models, Schema } from "mongoose";

export interface ICoupon extends Document {
    _id: string
    title: string
    code: string
    start_date?: string
    end_date?: string
    active?: boolean
    value?: string
    type: ECouponType
    courses?: string[]
    limit?: number
    used?: number
    _destroy: boolean
}

const couponSchema = new Schema<ICoupon>({
    title: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    start_date: String,
    end_date: String,
    active: {
        type: Boolean,
        default: true
    },
    value: String,
    used: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        enum: Object.values(ECouponType),
        default: ECouponType.AMOUNT
    },
    courses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    limit: Number,
    _destroy: {
        type: Boolean,
        default: false
    }
})

const Coupon = models.Coupon || model('Coupon', couponSchema)

export default Coupon