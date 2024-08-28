import React from "react";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="wrapper block pb-20 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar />
      <div className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16 list-none z-10">
        {menuItems.map((menuItem, idx) => (
          <MenuItem
            key={idx}
            title={menuItem.title}
            url={menuItem.url}
            icon={menuItem.icon}
            onlyIcon
          />
        ))}
      </div>
      <div className="hidden lg:block" />
      <main className="p-5">{children}</main>
    </div>
  );
};

export default MainLayout;
