import React from 'react'
import { IconPlay, IconExplore } from '@/components/icons'
import type { TMenuItem } from '@/types/index.t'

export const menuItems: TMenuItem[] = [
  {
    title: 'Khu vực học tập',
    url: '/',
    icon: <IconPlay className="size-5" />,
  },
  {
    title: 'Khám phá',
    url: '/explore',
    icon: <IconExplore className="size-5" />,
  },
]
