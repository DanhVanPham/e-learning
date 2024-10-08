import OrderManage from "@/components/order/OrderManage";
import { ITEMS_PER_PAGE } from "@/constants";
import { getAllOrder } from "@/lib/actions/order.actions";
import { EOrderStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: EOrderStatus;
  };
}) => {
  const { page, search, status } = searchParams;

  const paginationData = await getAllOrder({
    page,
    limit: ITEMS_PER_PAGE,
    search: search || "",
    status: status,
  });
  const currPage = Number(page) || 1;

  return (
    <OrderManage
      search={search}
      page={currPage}
      totalPages={paginationData?.totalPages}
      status={status}
      orders={paginationData?.items}
    />
  );
};

export default page;
