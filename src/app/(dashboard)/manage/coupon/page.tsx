import CouponManage from "@/components/coupon/CouponManage";
import OrderManage from "@/components/order/OrderManage";
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

  const paginationData = await getAllOrder({
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
