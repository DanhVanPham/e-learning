'use server'

import Coupon, { ICoupon } from "@/database/coupon.model"
import { connectToDatabase } from "../mongoose"
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { TCreateCouponParams, TGetAllCouponParams, TGetCouponResponse, TUpdateCouponParams } from "@/types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import Course from "@/database/course.model";
import { isNil } from "lodash";

export async function createCoupon(params: TCreateCouponParams) {
    try {
        connectToDatabase()
        const couponByCode = await getCouponByCode({code: params.code })
        if(couponByCode) {
            return {
                success: false,
                message: 'Code coupon đã tồn tại!',
            }
        }
        const newCoupon = await Coupon.create(params);
        return {
            success: true,
            data: parseMongoDocToPlainObject(newCoupon)
        };
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
            active,
        } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Coupon> = {}
console.log(!isNil(active), active)
        if(!isNil(active)) query.active = Number(active) === 1;
        if(search) {
            query.$or = [{title: {$regex: search, $options: 'i'}}]
        }

        const coupons = await Coupon.find(query).sort({
            created_at: -1
        }).skip(skip).limit(limit);
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

export async function getValidateCoupon({code, courseId}: {code: string, courseId: string}): Promise<TGetCouponResponse | undefined> {
    try {
        connectToDatabase();
        const foundCoupon = await Coupon.findOne({code})
        .populate({
            path: 'courses',
            model: Course,
        })
        const coupon = parseMongoDocToPlainObject(foundCoupon)
        const couponCourses = coupon?.courses?.map((course: any) => course?._id);

        let isActive = true;
        if (!coupon || !coupon?.active) isActive = false;
        if(couponCourses?.length && !couponCourses?.includes(courseId)) isActive = false;
        if (coupon?.used && coupon?.limit && coupon?.used + 1 > coupon?.limit)
          isActive = false;
        if (
          (coupon?.start_date && new Date(coupon.start_date) > new Date()) ||
          (coupon?.end_date && new Date(coupon.end_date) < new Date())
        )
          isActive = false;

        return isActive ? coupon : undefined;
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
        const foundCoupon = await Coupon.findOne({
            code: params.code
        })
        if(!foundCoupon) return;

        const couponByCode = await getCouponByCode({code: params.updateData?.code || ''})
        if(couponByCode && String(couponByCode._id) !== String(foundCoupon._id)) {
            return {
                success: false,
                message: 'Code coupon đã tồn tại!',
            }
        }

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