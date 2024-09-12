'use server'

import Coupon from "@/database/coupon.model"
import { connectToDatabase } from "../mongoose"
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { TCreateCouponParams } from "@/types";

export async function createCoupon(params: TCreateCouponParams) {
    try {
        connectToDatabase()
        const newCoupon = await Coupon.create(params);
        return parseMongoDocToPlainObject(newCoupon);
    } catch (error) {
        console.log(error)
    }
}