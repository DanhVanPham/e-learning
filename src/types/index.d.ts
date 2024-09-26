import { ICourse } from '@/database/course.model'
import { ILecture } from '@/database/lecture.model'
import { ILesson } from '@/database/lesson.model'
import { PropsWithChildren } from 'react'
import { ECommentStatus, ECouponType, ECourseStatus, EOrderStatus, ERatingStatus, EUserRole, EUserStatus } from './enums'
import { IOrder } from '@/database/order.model'
import { IUser } from '@/database/user.model'
import { ICoupon } from '@/database/coupon.model'
import { IRating } from '@/database/rating.model'
import { IComment } from '@/database/comment.model'

export type TActiveLink = {
  url: string
} & PropsWithChildren

export type TMenuItem = {
  url: string
  title: string
  role?: EUserRole[]
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

export type TGetAllUserParams = {
  page: number,
  limit: number,
  search: string,
  role?: EUserRole,
  status?: EUserStatus
}

export type TUpdateUserParams = {
  id: string
  updateData: Partial<IUser>,
  path?: string
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

export type TGetAllOrderResponse = Omit<IOrder, 'course', 'user', 'coupon'> & {
  course: ICourse,
  user: IUser,
  coupon?: {
    _id: string,
    code: string
  }
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
  active?: string
}

export type TGetCouponResponse = Omit<ICoupon, 'courses'> & {
  courses: ICourse[],
}

export type TUpdateCouponParams = {
  code: string
  updateData: Partial<ICoupon>,
  path?: string
}

// Rating
export type TRatingIcon = 'awesome' | 'good' | 'meh' | 'bad' | 'terrible'

export type TCreateRatingParams = {
  rate: number
  content: string
  user: string
  course: string
}

export type TGetAllRatingParams = {
  page: number,
  limit: number,
  search: string,
  status?: ERatingStatus
}

export type TGetAllRatingResponse = Omit<IRating, 'course', 'user', > & {
  course: ICourse,
  user: IUser,
}

export type TUpdateRatingParams = {
  id: string
  updateData: Partial<IRating>,
  path?: string
}

// Comment
export type TCreateCommentParams = {
  parentId?: string
  content: string
  lesson: string
  user: string
}

export type TGetCommentItem = Omit<IComment, 'user'> & {
  user: {
    _id: string,
    name: string,
    username: string,
    avatar: string
  },
  replyCount?: number
}

export type TCommentItemManage = Omit<IComment, 'user', 'lesson'> & {
  user: {
    _id: string,
    name: string,
    username: string,
    avatar: string
  },
  lesson: {
    course: {
      _id: string,
      slug: string,
      title: string,
      image?: string
    }
  }
}

export type TGetAllCommentParams = {
  page: number,
  limit: number,
  search: string,
  status?: ECommentStatus
}

export type TUpdateCommentParams = {
  id: string
  updateData: Partial<IComment>,
  path?: string
}
