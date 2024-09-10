import Heading from "@/components/common/Heading";
import CouponAddNew from "@/components/coupon/CouponAddNew";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading>Tạo mới mã giảm giá</Heading>
      <CouponAddNew />
    </div>
  );
};

export default page;
