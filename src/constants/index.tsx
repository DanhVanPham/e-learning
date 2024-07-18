import React from 'react'
import {
  IconPlay,
  IconExplore,
  IconOrder,
  IconComment,
  IconUsers,
  IconStudy,
} from '@/components/icons'
import type { TMenuItem } from '@/types/index.t'

export const menuItems: TMenuItem[] = [
  {
    title: 'Khám phá',
    url: '/',
    icon: <IconExplore className="size-5" />,
  },
  {
    title: 'Khu vực học tập',
    url: '/study',
    icon: <IconStudy className="size-5" />,
  },
  {
    title: 'Quản lý khóa học',
    url: '/manage/course',
    icon: <IconPlay className="size-5" />,
  },
  {
    title: 'Quản lý thành viên',
    url: '/manage/member',
    icon: <IconUsers className="size-5" />,
  },
  {
    title: 'Quản lý đơn hàng',
    url: '/manage/order',
    icon: <IconOrder className="size-5" />,
  },
  {
    title: 'Quản lý bình luận',
    url: '/manage/comment',
    icon: <IconComment className="size-5" />,
  },
]
