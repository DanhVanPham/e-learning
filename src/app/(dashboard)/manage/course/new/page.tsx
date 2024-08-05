import Heading from '@/components/common/Heading'
import CourseAddNew from '@/components/course/CourseAddNew'
import { getUserInfo } from '@/lib/actions/user.actions'
import { parseMongoDocToPlainObject } from '@/utils/helpers'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {
  const { userId } = await auth()
  if(!userId) return null;

  const mongoUser = await getUserInfo({userId})
  if(!mongoUser) return null;
  
  return (
    <div>
      <Heading>Tạo khóa học</Heading>
      <CourseAddNew user={parseMongoDocToPlainObject(mongoUser)} />
    </div>
  )
}

export default page
