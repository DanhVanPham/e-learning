'use server'

import mongoose from 'mongoose'

// singleton connection
let isConnected: boolean = false

export const connectToDatabase = async () => {
  if (!process.env.MONGO_DB_URL) throw new Error('MONGO_DB_URL is not set')

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: 'ucademy',
    })
    isConnected = true
    console.log('Using new database connection')
  } catch (error) {
    console.log('Error while connecting database: ', error)
  }
}
