'use server'

import Order, { IOrder } from "@/database/order.model"
import { connectToDatabase } from "../mongoose"
import { TCreateOrderParams, TGetAllOrderParams, TGetAllOrderResponse, TUpdateOrderStatusParams } from "@/types"
import { parseMongoDocToPlainObject } from "@/utils/helpers"
import { EOrderStatus } from "@/types/enums"
import { FilterQuery } from "mongoose"
import Course from "@/database/course.model"
import User from "@/database/user.model"
import { revalidatePath } from "next/cache"
import Coupon from "@/database/coupon.model"

export async function createOrder(params: TCreateOrderParams) {
    try {
        connectToDatabase()
        if(params.coupon) {
            await Coupon.findByIdAndUpdate(params.coupon, {
                // increment used times
                $inc: {used: 1}
            })
        }
        const newOrder = await Order.create(params)
        return parseMongoDocToPlainObject(newOrder)
    } catch (error) {
        console.log(error)
    }
}


export async function getAllOrder(params: TGetAllOrderParams): Promise<{
    items: TGetAllOrderResponse[]| undefined,
    totalPages: number
} | undefined> {
    try{
        connectToDatabase()
        const {
            page = 1,
            limit = 10,
            search,
            status
        } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Order> = {}

        if(search) {
            query.$or = [{code: {$regex: search, $options: 'i'}}]
        }

       if(status && Object.values(EOrderStatus).includes(status)) query.status = status;

        const orders = await Order.find(query)
        .populate([{
            path: 'course',
            model: Course,
            select: "_id title",
            match: {
                _destroy: false
            },
        }, {
            path: 'user',
            model: User,
            select: "_id name email username avatar",
        },
        {
            path: 'coupon',
            model: Coupon,
            select: "_id code",
        }
    ]).sort({
        created_at: -1
    }).skip(skip).limit(limit);
        const itemCount = await Order.countDocuments(query)

        return {
            items:parseMongoDocToPlainObject(orders),
            totalPages: Math.ceil(itemCount / limit)
        };
    }catch(error) {
        console.log(error)
    }
}

export async function updateOrderStatus(params: TUpdateOrderStatusParams) {
    try {
        connectToDatabase();
        const existOrder = await Order.findOne({
            _id: params.orderId
        }).populate({
            path: 'course',
            model: Course,
            select: '_id'
        }).populate({
            path: 'user',
            model: User,
            select: '_id'
        })
        if(!existOrder) return;

        if(existOrder.status === EOrderStatus.CANCELED) return;

        const order = await Order.findOneAndUpdate({
            _id: params.orderId
        }, {
            status: params.status
        }, {
            new: true,
        });
        
        const user = await User.findOne({
            _id: existOrder.user._id
        });

        if(
            params.status === EOrderStatus.COMPLETED &&
            existOrder.status === EOrderStatus.PENDING
        ) {
            user.courses.push(existOrder.course._id)
            user.save()
        }

        if(
            params.status === EOrderStatus.CANCELED &&
            existOrder.status === EOrderStatus.COMPLETED
        ) {
            user.courses = user.courses.filter(
                (el: any) => el.toString() !== existOrder.course._id.toString()
            )
            user.save()
        }

        revalidatePath(params.path || '/');
        return {
            success: true,
            data: parseMongoDocToPlainObject(order)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getOrderDetails({code}: {code: string}){
    try {
        connectToDatabase()
        const order = await Order.findOne({
            code
        }).populate({
            path: 'course',
            model: Course,
            select: '_id title'
        })

        return order ? parseMongoDocToPlainObject(order) : null
    } catch (error) {
        console.log(error)
    }
}