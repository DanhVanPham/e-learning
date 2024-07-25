'use server'

import User, { IUser } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { TCreateUserParam } from '@/types/index.t'

export default async function createUser(
  params: TCreateUserParam,
): Promise<IUser | undefined> {
  try {
    connectToDatabase()
    const newUser = await User.create(params)
    return newUser
  } catch (error) {
    console.log(error)
  }
}
