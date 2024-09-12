'use server'

import Coupon, { ICoupon } from "@/database/coupon.model"
import { connectToDatabase } from "../mongoose"
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { TCreateCouponParams, TGetAllCouponParams, TGetCouponResponse, TUpdateCouponParams } from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Course from "@/database/course.model";

export async function createCoupon(params: TCreateCouponParams) {
    try {
        connectToDatabase()
        const newCoupon = await Coupon.create(params);
        return parseMongoDocToPlainObject(newCoupon);
    } catch (error) {
        console.log(error)
    }
}

export async function getAllCoupons(params: TGetAllCouponParams): Promise<{
    items: ICoupon[]| undefined,
    totalPages: number
} | undefined> {
    try{
        connectToDatabase()
        const {
            page = 1,
            limit = 10,
            search,
        } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Coupon> = {}

        if(search) {
            query.$or = [{title: {$regex: search, $options: 'i'}}]
        }

        const coupons = await Coupon.find(query).skip(skip).limit(limit).sort({
            created_at: 1
        });
        const itemCount = await Coupon.countDocuments(query)
        return {
            items:parseMongoDocToPlainObject(coupons),
            totalPages: Math.ceil(itemCount / limit)
        };
    }catch(error) {
        console.log(error)
    }
}

export async function getCouponByCode({code}: {code: string}): Promise<TGetCouponResponse | undefined> {
    try {
        connectToDatabase();
        const foundCoupon = await Coupon.findOne({code})
        .populate({
            path: 'courses',
            model: Course,
        })
        return parseMongoDocToPlainObject(foundCoupon)
    } catch (error) {
        console.log(error)
    }
}

export async function deleteCoupon(id: string, path?: string): Promise<boolean | undefined> {
    try {
        connectToDatabase()
       await Coupon.findOneAndDelete({ _id: id })
       revalidatePath(path || '/');
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function updateCoupon(params: TUpdateCouponParams) {
    try {
        connectToDatabase();
        const existCoupon = await Coupon.findOne({
            code: params.code
        })
        if(!existCoupon) return;

        const coupon = await Coupon.findOneAndUpdate({
            code: params.code
        }, params.updateData, {
            new: true,
        });
        revalidatePath(params.path || '/');
        return {
            success: true,
            data: parseMongoDocToPlainObject(coupon)
        }
    } catch (error) {
        console.log(error);
    }
}