"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.model";
import { createOrder } from "@/lib/actions/order.actions";
import { createOrderCode } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ButtonEnroll = ({
  user,
  courseId,
  total,
  amount,
  discount,
  coupon,
}: {
  user?: IUser | null;
  courseId: string;
  total?: number;
  amount?: number;
  discount?: number;
  coupon?: string | null;
}) => {
  const router = useRouter();

  const handleEnrollCourse = async () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập trước khi mua khóa học");
      return;
    }
    // create new order
    const orderCode = createOrderCode();
    // create order
    try {
      const newOrder = await createOrder({
        code: orderCode,
        user: user._id,
        course: courseId,
        amount,
        coupon,
        discount,
        total,
      });
      router.push(`/order/${newOrder.code}`);
    } catch (error) {}
  };

  return (
    <Button variant="primary" className="w-full" onClick={handleEnrollCourse}>
      Mua khóa học
    </Button>
  );
};

export default ButtonEnroll;
