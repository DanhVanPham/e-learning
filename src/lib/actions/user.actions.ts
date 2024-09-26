'use server'

import User, { IUser } from '@/database/user.model'
import { connectToDatabase } from '../mongoose'
import { TCreateUserParams, TGetAllUserParams, TUpdateUserParams } from '@/types'
import { parseMongoDocToPlainObject } from '@/utils/helpers'
import { FilterQuery } from 'mongoose'
import { EUserRole, EUserStatus } from '@/types/enums'
import { revalidatePath } from 'next/cache'

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

export async function getUsers(params: TGetAllUserParams): Promise<{
  items: IUser[] | undefined,
  totalPages: number
} | undefined> {
  try {
      connectToDatabase()

      const {
          page = 1,
          limit = 10,
          search,
          role,
          status
      } = params;
      const skip = (page - 1) * limit;
      const query: FilterQuery<typeof User> = {}

      if(search) {
          query.$or = [
            {name: {$regex: search, $options: 'i'}},
            {username: {$regex: search, $options: 'i'}},
            {email: {$regex: search, $options: 'i'}},
          ]
      }

      if(status && Object.values(EUserStatus).includes(status)) query.status = status;
      if(role && Object.values(EUserRole).includes(role)) query.role = role;

      const users = await User.find(query).sort({
          created_at: -1
      }).skip(skip).limit(limit);

      const itemCount = await User.countDocuments(query)

      return {
          items:  parseMongoDocToPlainObject(users),
          totalPages: Math.ceil(itemCount / limit)
      };
  } catch (error) {
      console.log(error)
  }
}

export async function updateUser(params: TUpdateUserParams) {
  try {
      connectToDatabase();
      const foundUser = await User.findById(params.id)
      if(!foundUser) return;

      const user = await User.findByIdAndUpdate(params.id, params.updateData, {
          new: true,
      });
      revalidatePath(params.path || '/');
      return {
          success: true,
          data: parseMongoDocToPlainObject(user)
      }
  } catch (error) {
      console.log(error);
  }
}