'use server'

import User, { IUser } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { TCreateUserParams } from '@/types'
import { parseMongoDocToPlainObject } from '@/utils/helpers'

export async function createUser(
  params: TCreateUserParams,
): Promise<IUser | undefined> {
  try {
    connectToDatabase()
    const newUser = await User.create(params)
    return newUser
  } catch (error) {
    console.log(error)
  }
}

export async function getUserInfo({
  userId,
}: {
  userId: string
}): Promise<IUser | null | undefined> {
  try {
    connectToDatabase()
    const foundUser = await User.findOne({ clerkId: userId })
    if (!foundUser) return null
    return parseMongoDocToPlainObject(foundUser)
  } catch (error) {
    console.log(error)
  }
}
