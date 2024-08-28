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
  btnPrimary:
    "w-full flex items-center justify-center rounded-lg text-white font-semibold bg-primary h-12 button-primary",
};

export const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});

export const lastLessonKey = "lastLesson";
