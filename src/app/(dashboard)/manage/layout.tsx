import PageNotFound from '@/app/not-found'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId, redirectToSignIn } = auth()

  if (!userId) return redirectToSignIn()

  return <div>{children}</div>
}

export default AdminLayout
