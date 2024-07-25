import { PropsWithChildren } from 'react'

type TActiveLink = {
  url: string
} & PropsWithChildren

type TMenuItem = {
  url: string
  title: string
  icon: React.ReactNode
}

// User
type TCreateUserParam = {
  clerkId: string
  username: string
  email: string
  name?: string
  avatar?: string
}

export type { TActiveLink, TMenuItem, TCreateUserParam }
