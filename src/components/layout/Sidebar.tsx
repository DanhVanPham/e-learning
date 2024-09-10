import React from "react";
import { menuItems } from "@/constants";
import { ActiveLink, ModeToggle } from "../common";
import type { TMenuItem } from "@/types";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { IconUsers } from "../icons";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 bottom-0 left-0 flex-col hidden p-5 border borderDarkMode bgDarkMode lg:flex w-[300px]">
      <a href="/" className="inline-block mb-5 text-3xl font-bold">
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
      <div className="flex items-center justify-end gap-3 mt-auto">
        <ModeToggle />
        <SignedOut>
          <Link
            href="/sign-in"
            className="flex items-center justify-center p-1 text-white rounded-lg size-10 bg-primary"
          >
            <IconUsers />
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </aside>
  );
};

export function MenuItem({ title = "", url = "/", icon, onlyIcon }: TMenuItem) {
  return (
    <li>
      <ActiveLink url={url}>
        {icon}
        {onlyIcon ? <></> : title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
