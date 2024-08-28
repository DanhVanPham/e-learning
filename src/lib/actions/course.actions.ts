'use server'

import { StudyCoursesProps, TCourseUpdateParams, TCreateCourseParams, TUpdateCourseParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course, { ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";
import Lecture from "@/database/lecture.model";
import Lesson from "@/database/lesson.model";
import { auth } from "@clerk/nextjs/server";
import User from "@/database/user.model";
import { parseMongoDocToPlainObject } from "@/utils/helpers";

export async function getAllCoursesPublic(): Promise<StudyCoursesProps[] | undefined> {
    try {
        connectToDatabase()
        const courses = await Course.find()
        return parseMongoDocToPlainObject(courses);
    } catch (error) {
        console.log(error);
    }
}

export async function getCourseBySlug({slug}: {slug: string}): Promise<TCourseUpdateParams | undefined> {
    try {
        connectToDatabase();
        const foundCourse = await Course.findOne({slug})
        .populate({
            path: 'lectures',
            model: Lecture,
            select: "_id title order",
            match: {
                _destroy: false
            },
            
            populate: {
                path: 'lessons',
                model: Lesson,
                match: {
                    _destroy: false
                },
            }
        })
        return parseMongoDocToPlainObject(foundCourse)
    } catch (error) {
        console.log(error)
    }
}

export async function createCourse(params: TCreateCourseParams) {
    try {
        connectToDatabase();
        const existCourse = await Course.findOne({slug: params.slug})
        if(existCourse) {
            return {
                success: false,
                message: 'Đường dẫn khóa học đã tồn tại!'
            }
        }

        const course = await Course.create(params);
        
        return {
            success: true,
            data: parseMongoDocToPlainObject(course)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateCourse(params: TUpdateCourseParams) {
    try {
        connectToDatabase();
        const existCourse = await Course.findOne({
            slug: params.slug
        })
        if(!existCourse) return;

        const course = await Course.findOneAndUpdate({
            slug: params.slug
        }, params.updateData, {
            new: true,
        });
        revalidatePath(params.path || '/');
        return {
            success: true,
            data: parseMongoDocToPlainObject(course)
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAllCourses(): Promise<ICourse[]| undefined> {
    try{
        connectToDatabase()
        const courses = await Course.find();
        return parseMongoDocToPlainObject(courses);
    }catch(error) {
        console.log(error)
    }
}

export async function getAllMyCourses(): Promise<StudyCoursesProps[]| undefined> {
    try{
        connectToDatabase()
        const { userId } = auth()
        const findUser = await User.findOne({clerkId: userId}).populate({
            path: 'courses',
            model: Course,

            populate: {
                path: 'lectures',
                model: Lecture,
                select: "lessons",
                populate: {
                    path: "lessons",
                    model: Lesson,
                    select: "slug",
                },
            },
        });  
        return parseMongoDocToPlainObject(findUser?.courses);
    }catch(error) {
        console.log(error)
    }
}