import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { formatVndPrice } from "@/utils/helpers";
import React from "react";
import ButtonEnroll from "./ButtonEnroll";
import { TCourseUpdateParams } from "@/types";
import { IUser } from "@/database/user.model";

const CourseWidget = ({
  course,
  foundUser,
}: {
  course: TCourseUpdateParams;
  foundUser?: IUser | null;
}) => {
  return (
    <>
      <div className="p-5 bg-white rounded-lg ">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-xl font-bold text-primary">
            {formatVndPrice(Number(course.price))}
          </strong>
          <span className="text-sm line-through text-slate-500">
            {formatVndPrice(Number(course.sale_price))}
          </span>
          <span className="inline-block px-3 py-1 ml-auto text-sm font-semibold rounded-lg text-primary bg-primary bg-opacity-10">
            {course.price &&
              course.sale_price &&
              `${Math.round((course.price / course.sale_price) * 100)}%`}
          </span>
        </div>
        <h3 className="mb-3 text-sm font-bold">Khóa học gồm có:</h3>
        <ul className="flex flex-col gap-2 mb-5 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>30h học</span>
          </li>
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>
          <li className="flex items-center gap-2">
            <IconUsers className="size-4" />
            <span>Có nhóm hỗ trợ</span>
          </li>
          <li className="flex items-center gap-2">
            <IconStudy className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>
        <ButtonEnroll
          user={foundUser}
          courseId={course._id}
          total={course.price}
          amount={course.price}
          discount={0}
          coupon={null}
        />
      </div>
    </>
  );
};

export default CourseWidget;
