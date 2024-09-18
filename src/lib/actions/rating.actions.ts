'use server'

import Rating, { IRating } from "@/database/rating.model";
import { connectToDatabase } from "../mongoose"

export async function createRating(params: any): Promise<IRating | undefined> {
    try {
        connectToDatabase();
        const newRating = await Rating.create(params);
        return newRating;
    } catch (error) {
        console.log(error)
    }
}