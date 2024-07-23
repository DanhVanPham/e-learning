'use client'
import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import type { TActiveLink } from '@/types/index.t'

const ActiveLink = ({ url, children }: TActiveLink) => {
  const pathname = usePathname()

  const isActive = url === pathname

  return (
    <Link
      href={url}
      className={clsx(
        'p-3 rounded-md flex items-center gap-3  transition-all dark:text-grayDark',
        isActive
          ? '!text-white bg-primary svg-animate'
          : 'hover:!text-primary hover:!bg-primary hover:!bg-opacity-10 ',
      )}
    >
      {children}
    </Link>
  )
}

export default ActiveLink
