"use client";

import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { formatVndPrice } from "@/utils/helpers";
import React, { useMemo, useState } from "react";
import ButtonEnroll from "./ButtonEnroll";
import { TCourseUpdateParams, TGetCouponResponse } from "@/types";
import { IUser } from "@/database/user.model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  getCouponByCode,
  getValidateCoupon,
} from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enums";
import { parseMinutesToHours } from "@/lib/utils";

const CourseWidget = ({
  course,
  foundUser,
  duration,
}: {
  course: TCourseUpdateParams;
  foundUser?: IUser | null;
  duration?: number;
}) => {
  const [applyCoupon, setApplyCoupon] = useState<TGetCouponResponse>();
  const [couponCode, setCouponCode] = useState<string>("");

  const handleChangeCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value.toUpperCase());
  };

  const handleApplyCoupon = async () => {
    try {
      if (!couponCode) return;
      const foundCoupon = await getValidateCoupon({
        code: couponCode,
        courseId: course._id,
      });

      if (!foundCoupon) {
        setApplyCoupon(undefined);
        toast.error("Mã giảm giá không hợp lệ");
        return;
      }

      setApplyCoupon(foundCoupon);
      toast.success("Áp dụng mã giảm giá thành công");
    } catch (error) {
      setApplyCoupon(undefined);
      toast.error("Vui lòng thử lại sau!");
    }
  };

  const currentPrice = useMemo(() => {
    if (!applyCoupon || !applyCoupon?.value) return Number(course.price);
    if (applyCoupon.type === ECouponType.AMOUNT)
      return Number(course.price) - Number(applyCoupon.value);
    return Math.floor(
      Number(course.price) * (1 - Number(applyCoupon.value) / 100)
    );
  }, [applyCoupon, course]);

  const discount = course?.price ? Number(course?.price) - currentPrice : 0;

  return (
    <>
      <div className="p-5 bg-white rounded-lg ">
        <div className="flex items-center gap-2 mb-3">
          <strong className="text-xl font-bold text-primary">
            {formatVndPrice(currentPrice <= 0 ? 0 : currentPrice)}
          </strong>
          <span className="text-sm line-through text-slate-500">
            {formatVndPrice(Number(course.sale_price))}
          </span>
          <span className="inline-block px-3 py-1 ml-auto text-sm font-semibold rounded-lg text-primary bg-primary bg-opacity-10">
            {currentPrice &&
              course.sale_price &&
              `${Math.round(
                ((course.sale_price - currentPrice) / course.sale_price) * 100
              )}%`}
          </span>
        </div>
        <h3 className="mb-3 text-sm font-bold">Khóa học gồm có:</h3>
        <ul className="flex flex-col gap-2 mb-5 text-sm text-slate-500">
          <li className="flex items-center gap-2">
            <IconPlay className="size-4" />
            <span>{parseMinutesToHours(duration || 0)} học</span>
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
          amount={course.price}
          discount={discount}
          total={currentPrice}
          coupon={applyCoupon?._id || undefined}
        />
        <div className="mt-5 h-10 rounded-lg has-[input:focus]:border-primary flex items-center justify-between border borderDarkMode p-2 transition-all">
          <Input
            placeholder="Nhập mã giảm giá"
            className="font-bold uppercase border-none bg-transparent text-sm px-0 pr-2 w-full placeholder:font-medium"
            value={couponCode}
            onChange={handleChangeCoupon}
          />
          <button
            className="bg-grayDarkest font-semibold text-xs dark:bg-white dark:text-grayDarkest text-white
          px-3 h-full flex-shrink-0 rounded disabled:opacity-60 disabled:pointer-events-none
          "
            disabled={!couponCode}
            onClick={handleApplyCoupon}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseWidget;
