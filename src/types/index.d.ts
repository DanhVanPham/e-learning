import { ICourse } from '@/database/course.model'
import { ILecture } from '@/database/lecture.model'
import { ILesson } from '@/database/lesson.model'
import { PropsWithChildren } from 'react'
import { ECouponType, ECourseStatus, EOrderStatus } from './enums'
import { IOrder } from '@/database/order.model'
import { IUser } from '@/database/user.model'
import { ICoupon } from '@/database/coupon.model'

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

export interface StudyCoursesProps extends Omit<ICourse, "lectures"> {
  lectures: {
    lessons: {
      slug: string;
    }[];
  }[];
}

export type TGetAllCourseParams = {
  page?: number,
  limit?: number,
  search?: string,
  status?: ECourseStatus
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
    duration?: number
    video_url?: string
    content?: string
    _destroy?: boolean
  },
  path?: string
}

// History
export type TCreateHistoryParams = {
  course: string
  lesson: string
  checked: boolean | string
  path?: string
}

// Order
export type TCreateOrderParams = {
  code: string;
  course: string;
  user: string
  total?: number
  amount?: number
  discount?: number
  coupon?: string | null
}

export type TGetAllOrderParams = {
  page: number,
  limit: number,
  search?: string,
  status?: EOrderStatus
}

export type TGetAllOrderResponse = Omit<IOrder, 'course', 'user'> & {
  course: ICourse,
  user: IUser
}

export type TUpdateOrderStatusParams = {
  orderId: string
  status: EOrderStatus,
  path?: string
}

// Coupon
export type TCreateCouponParams = {
  title: string
  code: string;
  start_date?: string;
  end_date?: string
  active: boolean
  value?: string
  limit?: number
  type: ECouponType
  courses?: string[];
}

export type TGetAllCouponParams = {
  page?: number,
  limit?: number,
  search?: string,
}

export type TGetCouponResponse = Omit<ICoupon, 'courses'> & {
  courses: ICourse[],
}

export type TUpdateCouponParams = {
  code: string
  updateData: Partial<ICoupon>,
  path?: string
}