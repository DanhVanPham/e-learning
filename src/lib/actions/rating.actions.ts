'use server'

import Rating, { IRating } from "@/database/rating.model";
import { connectToDatabase } from "../mongoose"
import { TCreateRatingParams, TGetAllRatingParams, TGetAllRatingResponse, TUpdateRatingParams } from "@/types";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import Course from "@/database/course.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { ERatingStatus } from "@/types/enums";
import { revalidatePath } from "next/cache";

export async function createRating(params: TCreateRatingParams): Promise<IRating | undefined> {
    try {
        connectToDatabase();
        const findCourse = await Course.findOne({
            _id: params.course
        }).populate({
            path: 'rating',
            model: Rating
        });
        const newRating = await Rating.create(params);
        if(findCourse) {
            findCourse.rating.push(newRating._id);
            await findCourse.save()
        }
        return parseMongoDocToPlainObject(newRating);
    } catch (error) {
        console.log(error)
    }
}

export async function checkUserAlreadyRatingCourse(userId: string, courseId: string): Promise<boolean> {
    try {
        const foundRating = await Rating.findOne({user: userId, course: courseId});
        return !!foundRating;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function getRatings(params: TGetAllRatingParams): Promise<{
    items: TGetAllRatingResponse[] | undefined,
    totalPages: number
} | undefined> {
    try {
        connectToDatabase()

        const {
            page = 1,
            limit = 10,
            search,
            status
        } = params;
        const skip = (page - 1) * limit;
        const query: FilterQuery<typeof Rating> = {}

        if(search) {
           // Find matching courses by title
            const matchingCourses = await Course.find({ 
                title: { $regex: search, $options: 'i' } 
            }).select('_id'); // Only get the _id of matching courses

            const courseIds = matchingCourses.map(course => course._id);

            // Step 2: Create query for ratings
            query.$or = [
                { content: { $regex: search, $options: 'i' } },
                { course: { $in: courseIds } } // Match the found course IDs
            ];
        }

        if(status && Object.values(ERatingStatus).includes(status)) query.status = status;

        const ratings = await Rating.find(query).populate({
            path: 'course',
            model: Course,
            select: "_id slug title image",
        }).populate({
            path: 'user',
            model: User,
            select: '_id name username email'
        }).sort({
            created_at: -1
        }).skip(skip).limit(limit);

        const itemCount = await Rating.countDocuments(query)

        return {
            items:  parseMongoDocToPlainObject(ratings),
            totalPages: Math.ceil(itemCount / limit)
        };
    } catch (error) {
        console.log(error)
    }
}

export async function deleteRating(id: string, path?: string): Promise<boolean | undefined> {
    try {
        connectToDatabase()
       await Rating.findOneAndDelete({ _id: id })
       revalidatePath(path || '/');
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export async function updateRating(params: TUpdateRatingParams) {
    try {
        connectToDatabase();
        const foundRating = await Rating.findById(params.id)
        if(!foundRating) return;

        const rating = await Rating.findByIdAndUpdate(params.id, params.updateData, {
            new: true,
        });
        revalidatePath(params.path || '/');
        return {
            success: true,
            data: parseMongoDocToPlainObject(rating)
        }
    } catch (error) {
        console.log(error);
    }
}