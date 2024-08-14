'use server'

import { TCreateLectureParams, TUpdateLectuteParams } from "@/types"
import { connectToDatabase } from "../mongoose"
import Course from "@/database/course.model"
import Lecture from "@/database/lecture.model"
import { revalidatePath } from "next/cache"

export  async function createLecture(params: TCreateLectureParams) {
    try {
        connectToDatabase()
        const findCourse = await Course.findById(params.course)
        if(!findCourse) return;

        const newLecture = await Lecture.create(params);
        findCourse.lectures.push(newLecture._id)
        findCourse.save()
        revalidatePath(params.path || '/');

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateLecture(params: TUpdateLectuteParams) {
    try {
        connectToDatabase()
        const findLecture = await Lecture.findById(params.lectureId)
        if(!findLecture) return;

      const res =  await Lecture.findOneAndUpdate({
            _id: params.lectureId
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