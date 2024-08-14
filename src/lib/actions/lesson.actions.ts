'use server'

import { TCreateLessonParams, TUpdateLessonParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lesson from "@/database/lesson.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

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