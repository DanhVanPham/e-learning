import React from "react";
import Sidebar, { MenuItem } from "@/components/layout/Sidebar";
import { menuItems } from "@/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { EUserStatus } from "@/types/enums";
import BannedAccount from "@/components/common/BannedAccount";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { userId } = auth();

  const foundUser = await getUserInfo({ userId: userId || "" });

  const filteredMenuItems = menuItems.filter((menuItem) => {
    if (!menuItem?.role) return true;
    return foundUser?.role && menuItem.role.includes(foundUser.role);
  });
  const isBanned = foundUser?.status === EUserStatus.BANNED;

  return (
    <div className="wrapper block pb-20 lg:grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
      <Sidebar menuItems={filteredMenuItems} />
      <div className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16 list-none z-10">
        {filteredMenuItems.map((menuItem, idx) => (
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
      <main className="p-5">
        {isBanned && <BannedAccount />}
        {!isBanned && children}
      </main>
      <SpeedInsights />
      <Analytics />
    </div>
  );
};

export default MainLayout;
