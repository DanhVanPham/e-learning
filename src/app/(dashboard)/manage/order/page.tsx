import OrderManage from "@/components/order/OrderManage";
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
    limit: 5,
    search: search || "",
    status: status,
  });

  return (
    <OrderManage
      search={search}
      page={page}
      totalPages={paginationData?.totalPages}
      status={status}
      orders={paginationData?.items}
    />
  );
};

export default page;
