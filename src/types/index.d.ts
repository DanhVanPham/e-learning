import { ICourse } from '@/database/course.model'
import { ILecture } from '@/database/lecture.model'
import { ILesson } from '@/database/lesson.model'
import { PropsWithChildren } from 'react'

export type TActiveLink = {
  url: string
} & PropsWithChildren

export type TMenuItem = {
  url: string
  title: string
  icon: React.ReactNode
  onlyIcon?: boolean
}

// User
export type TCreateUserParams = {
  clerkId: string
  username: string
  email: string
  name?: string
  avatar?: string
}

// Course
export type TCreateCourseParams = {
  title: string
  slug: string
  author: string 
}

export type TUpdateCourseParams = {
  slug: string
  updateData: Partial<ICourse>,
  path?: string
}

interface ICourseUpdateLecture extends ILecture {
  lessons: ILesson[]
}

export type TCourseUpdateParams = Omit<ICourse, 'lectures'> & {
  lectures: ICourseUpdateLecture[],
}

// Lecture
export type TCreateLectureParams = {
  course: string
  title?: string
  order: number
  path?: string
}

export type TUpdateLectuteParams = {
  lectureId: string
  updateData: {
    title?: string
    order?: string
    _destroy?: boolean
  },
  path?: string
}

// Lesson
export type TCreateLessonParams  = {
  lecture: string
  course: string
  title?: string
  order?: string
  path?: string
  slug?: string
}

export type TUpdateLessonParams = {
  lessonId: string
  updateData: {
    title?: string
    order?: string
    slug?: string
    _destroy?: boolean
  },
  path?: string
}