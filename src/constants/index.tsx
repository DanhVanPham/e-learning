import React from "react";
import {
  IconPlay,
  IconExplore,
  IconOrder,
  IconComment,
  IconUsers,
  IconStudy,
} from "@/components/icons";
import type { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

export const menuItems: TMenuItem[] = [
  {
    title: "Khám phá",
    url: "/",
    icon: <IconExplore className="size-5" />,
  },
  {
    title: "Khu vực học tập",
    url: "/study",
    icon: <IconStudy className="size-5" />,
  },
  {
    title: "Quản lý khóa học",
    url: "/manage/course",
    icon: <IconPlay className="size-5" />,
  },
  {
    title: "Quản lý thành viên",
    url: "/manage/member",
    icon: <IconUsers className="size-5" />,
  },
  {
    title: "Quản lý đơn hàng",
    url: "/manage/order",
    icon: <IconOrder className="size-5" />,
  },
  {
    title: "Quản lý bình luận",
    url: "/manage/comment",
    icon: <IconComment className="size-5" />,
  },
];

export const courseStatusTitle: Record<ECourseStatus, string> = {
  [ECourseStatus.PENDING]: "Chờ duyệt",
  [ECourseStatus.APPROVED]: "Đã duyệt",
  [ECourseStatus.REJECTED]: "Từ chối",
};

export const courseStatus: {
  title: string;
  value: ECourseStatus;
  className?: string;
}[] = [
  {
    title: courseStatusTitle[ECourseStatus.PENDING],
    value: ECourseStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: courseStatusTitle[ECourseStatus.APPROVED],
    value: ECourseStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: courseStatusTitle[ECourseStatus.REJECTED],
    value: ECourseStatus.REJECTED,
    className: "text-red-500 bg-red-500",
  },
];

export const courseLevelTitle: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Cơ bản",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Nâng cao",
};

export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: courseLevelTitle[ECourseLevel.BEGINNER],
    value: ECourseLevel.BEGINNER,
  },
  {
    title: courseLevelTitle[ECourseLevel.INTERMEDIATE],
    value: ECourseLevel.INTERMEDIATE,
  },
  {
    title: courseLevelTitle[ECourseLevel.ADVANCED],
    value: ECourseLevel.ADVANCED,
  },
];

export const commonClassName = {
  status:
    "bg-opacity-10 bg-current border border-current rounded-md font-medium text-sm px-3 py-1 whitespace-nowrap",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
  paginationButton:
    "size-10 rounded-md border borderDarkMode bgDarkMode flex items-center justify-center hover:border-primary hover:text-primary transition-all",
};
