import React from "react";
import {
  IconPlay,
  IconExplore,
  IconOrder,
  IconComment,
  IconUsers,
  IconStudy,
  IconCurrency,
  IconStar,
} from "@/components/icons";
import type { TMenuItem, TRatingIcon } from "@/types";
import {
  ECommentStatus,
  ECouponType,
  ECourseLevel,
  ECourseStatus,
  EOrderStatus,
  ERatingStatus,
  EUserRole,
  EUserStatus,
} from "@/types/enums";
import { z } from "zod";

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
    role: [EUserRole.ADMIN, EUserRole.EXPERT],
  },
  {
    title: "Quản lý thành viên",
    url: "/manage/member",
    icon: <IconUsers className="size-5" />,
    role: [EUserRole.ADMIN],
  },
  {
    title: "Quản lý đơn hàng",
    url: "/manage/order",
    icon: <IconOrder className="size-5" />,
    role: [EUserRole.ADMIN],
  },
  {
    title: "Quản lý coupon",
    url: "/manage/coupon",
    icon: <IconCurrency className="size-5" />,
    role: [EUserRole.ADMIN],
  },
  {
    title: "Quản lý đánh giá",
    url: "/manage/rating",
    icon: <IconStar className="size-5" />,
    role: [EUserRole.ADMIN],
  },
  {
    title: "Quản lý bình luận",
    url: "/manage/comment",
    icon: <IconComment className="size-5" />,
    role: [EUserRole.ADMIN],
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

export const orderStatusTitle: Record<EOrderStatus, string> = {
  [EOrderStatus.PENDING]: "Chờ duyệt",
  [EOrderStatus.COMPLETED]: "Hoàn thành",
  [EOrderStatus.CANCELED]: "Đã hủy",
};

// User
export const userStatusTile: Record<EUserStatus, string> = {
  [EUserStatus.UNACTIVE]: "Chưa hoạt động",
  [EUserStatus.ACTIVE]: "Đang hoạt động",
  [EUserStatus.BANNED]: "Bị chặn",
};

export const userStatus: {
  title: string;
  value: EUserStatus;
  className?: string;
}[] = [
  {
    title: userStatusTile[EUserStatus.UNACTIVE],
    value: EUserStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: userStatusTile[EUserStatus.ACTIVE],
    value: EUserStatus.ACTIVE,
    className: "text-green-500 bg-green-500",
  },
  {
    title: userStatusTile[EUserStatus.BANNED],
    value: EUserStatus.BANNED,
    className: "text-red-500 bg-red-500",
  },
];

export const userRoleTile: Record<EUserRole, string> = {
  [EUserRole.USER]: "Người dùng",
  [EUserRole.EXPERT]: "Chuyên gia",
  [EUserRole.ADMIN]: "Quản trị viên",
};

export const userRole: {
  title: string;
  value: EUserRole;
}[] = [
  {
    title: userRoleTile[EUserRole.USER],
    value: EUserRole.USER,
  },
  {
    title: userRoleTile[EUserRole.EXPERT],
    value: EUserRole.EXPERT,
  },
  {
    title: userRoleTile[EUserRole.ADMIN],
    value: EUserRole.ADMIN,
  },
];

export const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: orderStatusTitle[EOrderStatus.PENDING],
    value: EOrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: orderStatusTitle[EOrderStatus.COMPLETED],
    value: EOrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: orderStatusTitle[EOrderStatus.CANCELED],
    value: EOrderStatus.CANCELED,
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

export const couponTypes: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: "Phần trăm",
    value: ECouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: ECouponType.AMOUNT,
  },
];

export const ratingStatusTitle: Record<ERatingStatus, string> = {
  [ERatingStatus.UNACTIVE]: "Chưa duyệt",
  [ERatingStatus.ACTIVE]: "Đã duyệt",
};

export const ratingStatus: {
  title: string;
  value: ERatingStatus;
  className?: string;
}[] = [
  {
    title: ratingStatusTitle[ERatingStatus.UNACTIVE],
    value: ERatingStatus.UNACTIVE,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: ratingStatusTitle[ERatingStatus.ACTIVE],
    value: ERatingStatus.ACTIVE,
    className: "text-green-500 bg-green-500",
  },
];

export const commentStatusTitle: Record<ECommentStatus, string> = {
  [ECommentStatus.PENDING]: "Chờ duyệt",
  [ECommentStatus.APPROVED]: "Đã duyệt",
};

export const commentStatus: {
  title: string;
  value: ECommentStatus;
  className?: string;
}[] = [
  {
    title: courseStatusTitle[ECommentStatus.PENDING],
    value: ECommentStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: courseStatusTitle[ECommentStatus.APPROVED],
    value: ECommentStatus.APPROVED,
    className: "text-green-500 bg-green-500",
  },
];

export const commonClassName = {
  status:
    "bg-opacity-10 bg-current border border-current rounded-md font-medium text-sm px-3 py-1 whitespace-nowrap",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
  paginationButton:
    "size-10 flex justify-center items-center rounded-full bg-white bgDarkMode border borderDarkMode  hover:border-primary hover:text-primary transition-all disabled:text-gray-300 disabled:pointer-events-none ",
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

export const couponFormSchema = z
  .object({
    title: z
      .string({
        message: "Tiêu đề không được để trống",
      })
      .min(10, "Tiêu đề phải có ít nhất 10 ký tự"),
    code: z
      .string({
        message: "Mã giảm giá không được để trống",
      })
      .min(3, "Mã giảm giá phải có ít nhất 3 ký tự")
      .max(10, "Mã giảm giá không được quá 10 ký tự")
      .regex(
        /^[A-Z0-9\-]{3,9}$/,
        "Mã giảm giá phải có 3-9 ký tự, bao gồm A-Z, 0-9 và dấu '-'"
      ),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    active: z.boolean().optional(),
    value: z.number().optional(),
    type: z.enum([ECouponType.AMOUNT, ECouponType.PERCENT]),
    courses: z
      .array(
        z.object({
          _id: z.string().min(1),
        })
      )
      .optional(),
    limit: z.number().optional(),
  })
  .refine(
    (data) =>
      !data.start_date || !data.end_date || data.end_date > data.start_date,
    {
      message: "Ngày kết thúc phải sau ngày bắt đầu",
      path: ["end_date"],
    }
  )
  .refine(
    (data) =>
      data.type !== ECouponType.PERCENT ||
      (data.value !== undefined && data.value >= 0 && data.value <= 100),
    {
      message: "Giá trị phải nằm trong khoảng 0-100",
      path: ["value"],
    }
  )
  .refine(
    (data) =>
      data.type !== ECouponType.AMOUNT ||
      (data.value !== undefined && data.value >= 0),
    {
      message: "Giá trị phải lớn hơn hoặc bằng 0",
      path: ["value"],
    }
  );

export const formatDateStr = "dd/MM/yyyy";

export const ratingList: {
  title: TRatingIcon;
  value: number;
  icon: TRatingIcon;
}[] = [
  { title: "awesome", value: 5, icon: "awesome" },
  { title: "good", value: 4, icon: "good" },
  { title: "meh", value: 3, icon: "meh" },
  { title: "bad", value: 2, icon: "bad" },
  { title: "terrible", value: 1, icon: "terrible" },
];

export const allValue = "ALL";

export const ITEMS_PER_PAGE = 5;
