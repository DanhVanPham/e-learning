import React from 'react'
import { menuItems } from '@/constants'
import ActiveLink from '../common/ActiveLink'
import type { TMenuItem } from '@/types/index.t'

const Sidebar = () => {
  return (
    <aside className="sidebar p-5 border border-r-gray-200">
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
