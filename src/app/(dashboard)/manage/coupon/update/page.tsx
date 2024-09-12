import Heading from "@/components/common/Heading";
import CouponUpdate from "@/components/coupon/CouponUpdate";
import CourseUpdate from "@/components/course/CourseUpdate";
import { getCouponByCode } from "@/lib/actions/coupon.actions";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    code: string;
  };
}) => {
  const { code } = searchParams;

  const foundCoupon = await getCouponByCode({ code });

  if (!foundCoupon) return notFound();

  return (
    <div>
      <Heading className="mb-8">Cập nhật mã giảm giá</Heading>
      <CouponUpdate coupon={parseMongoDocToPlainObject(foundCoupon)} />
    </div>
  );
};

export default page;
