import React from 'react'
import { menuItems } from '@/constants'
import { ActiveLink, ModeToggle } from '../common'
import type { TMenuItem } from '@/types/index.t'
import { UserButton } from '@clerk/nextjs'

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
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        <UserButton />
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
