import React from 'react'
import { menuItems } from '@/constants'
import { ActiveLink, ModeToggle } from '../common'
import type { TMenuItem } from '@/types/index.t'
import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { IconUsers } from '../icons'

const Sidebar = () => {
  return (
    <aside className="sidebar p-5 border border-r-gray-200 dark:border-opacity-10 bg-white dark:bg-grayDarker flex flex-col">
      <a href="/" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary">E</span>
        Learning
      </a>
      <ul className="flex flex-col gap-2">
        {menuItems.map((menuItem, idx) => (
          <MenuItem
            key={idx}
            title={menuItem.title}
            url={menuItem.url}
            icon={menuItem.icon}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-3">
        <ModeToggle />
        <SignedOut>
          <Link
            href="/sign-in"
            className="size-10 bg-primary text-white flex items-center justify-center p-1 rounded-lg"
          >
            <IconUsers />
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </aside>
  )
}

function MenuItem({ title = '', url = '/', icon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  )
}

export default Sidebar
