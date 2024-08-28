'use server'

import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lesson, { ILesson } from "@/database/lesson.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";
import { parseMongoDocToPlainObject } from "@/utils/helpers";

export async function createLesson(params: TCreateLessonParams) {
    try {
        connectToDatabase()

        const findCourse = await Course.findById(params.course)
        if(!findCourse) return;

        const findLecture = await Lecture.findById(params.lecture)
        if(!findLecture) return;

        const newLesson = await Lesson.create(params);
        if(!newLesson) return;

        findLecture.lessons.push(newLesson._id)
        findLecture.save()
        revalidatePath(params.path || '/');
        return {
            success: true
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateLesson(params: TUpdateLessonParams) {
    try {
        connectToDatabase()

        const findLesson = await Lesson.findById(params.lessonId)
        if(!findLesson) return;

      const res =  await Lesson.findOneAndUpdate({
            _id: params.lessonId
        }, params.updateData, {
            new: true,
        });
        if(!res) return;
        
        revalidatePath(params.path || '/');
        return {
            success: true,
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getLessonBySlug({slug, course}: {slug: string, course: string}): Promise<ILesson | undefined> {
    try {
        connectToDatabase()
        const foundLesson = await Lesson.findOne({
            slug,
            course
        })
      return parseMongoDocToPlainObject(foundLesson)
    } catch (error) {
        console.log(error)
    }
}


export async function findAllLessons({course}: { course: string}): Promise<ILesson[] | undefined> {
    try {
        connectToDatabase()
        const lessons = await Lesson.find({
            course
        })
      return parseMongoDocToPlainObject(lessons)
    } catch (error) {
        console.log(error)
    }
}