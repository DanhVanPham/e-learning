import CouponManage from "@/components/coupon/CouponManage";
import { ITEMS_PER_PAGE } from "@/constants";
import { getAllCoupons } from "@/lib/actions/coupon.actions";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    active: string;
  };
}) => {
  const { page, search, active } = searchParams;

  const paginationData = await getAllCoupons({
    page,
    limit: ITEMS_PER_PAGE,
    search: search || "",
    active,
  });

  const currPage = Number(page) || 1;

  return (
    <CouponManage
      search={search}
      page={currPage}
      totalPages={paginationData?.totalPages}
      coupons={paginationData?.items}
    />
  );
};

export default page;
