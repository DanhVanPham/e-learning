'use server'

import Comment, { IComment } from "@/database/comment.model";
import { connectToDatabase } from "../mongoose"
import { TCommentItemManage, TCreateCommentParams, TGetAllCommentParams, TGetCommentItem, TUpdateCommentParams } from "@/types";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { ECommentStatus } from "@/types/enums";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Lesson from "@/database/lesson.model";
import Course from "@/database/course.model";
import { revalidatePath } from "next/cache";

export async function createComment(params: TCreateCommentParams): Promise<IComment | undefined> {
    try {
        connectToDatabase();
        const newComment = await Comment.create(params);
        return parseMongoDocToPlainObject(newComment);        
    } catch (error) {
        console.log(error)
    }
}

export async function getCommentsByLesson(lessonId: string): Promise<TGetCommentItem[] | undefined> {
    try {
        connectToDatabase()
        const comments = await Comment.find({
            lesson: lessonId,
            status: ECommentStatus.APPROVED
        }).populate({
            path: 'user',
            model: User,
            select: "_id username name avatar",
        }).sort({
            created_at: -1
        });
        return parseMongoDocToPlainObject(comments);
    } catch (error) {
        console.log(error)
    }
}

export async function getComments(params: TGetAllCommentParams): Promise<{
    items: TCommentItemManage[] | undefined,
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
        const query: FilterQuery<typeof Comment> = {}

        if(search) {
            query.$or = [{content: {$regex: search, $options: 'i'}}]
        }

        if(status && Object.values(ECommentStatus).includes(status)) query.status = status;

        const comments = await Comment.find(query).populate({
            path: 'lesson',
            model: Lesson,
            populate: {
                path: 'course',
                model: Course
            }
        }).populate({
            path: 'user',
            model: User,
            select: '_id name username email'
        }).sort({
            created_at: -1
        }).skip(skip).limit(limit);

        const itemCount = await Comment.countDocuments(query)

        return {
            items:  parseMongoDocToPlainObject(comments),
            totalPages: Math.ceil(itemCount / limit)
        };
    } catch (error) {
        console.log(error)
    }
}

export async function updateComment(params: TUpdateCommentParams) {
    try {
        connectToDatabase();
        const foundComment = await Comment.findById(params.id)
        if(!foundComment) return;

        const comment = await Comment.findByIdAndUpdate(params.id, params.updateData, {
            new: true,
        });
        revalidatePath(params.path || '/');
        return {
            success: true,
            data: parseMongoDocToPlainObject(comment)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function deleteComment(id: string, path?: string): Promise<boolean | undefined> {
    try {
        connectToDatabase()
       await Comment.findOneAndDelete({ _id: id })
       revalidatePath(path || '/');
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}