import { ICourse } from '@/database/course.model'
import { PropsWithChildren } from 'react'

export type TActiveLink = {
  url: string
} & PropsWithChildren

export type TMenuItem = {
  url: string
  title: string
  icon: React.ReactNode
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
  updateData: Partial<ICourse>
}

