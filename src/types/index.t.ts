import { PropsWithChildren } from 'react'

type TActiveLink = {
  url: string
} & PropsWithChildren

type TMenuItem = {
  url: string
  title: string
  icon: React.ReactNode
}

export type { TActiveLink, TMenuItem }
