import CouponManage from "@/components/coupon/CouponManage";
import OrderManage from "@/components/order/OrderManage";
import { getAllCoupons } from "@/lib/actions/coupon.actions";
import { getAllOrder } from "@/lib/actions/order.actions";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
  };
}) => {
  const { page, search } = searchParams;

  const paginationData = await getAllCoupons({
    page,
    limit: 5,
    search: search || "",
  });

  return (
    <CouponManage
      search={search}
      page={page}
      totalPages={paginationData?.totalPages}
      coupons={paginationData?.items}
    />
  );
};

export default page;
