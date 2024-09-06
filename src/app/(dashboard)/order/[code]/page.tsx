import React from "react";
import { getOrderDetails } from "@/lib/actions/order.actions";
import PageNotFound from "@/app/not-found";
import { formatVndPrice } from "@/utils/helpers";

const OrderDetails = async ({ params }: { params: { code: string } }) => {
  const code = params.code;

  const orderDetails = await getOrderDetails({ code });
  console.log(orderDetails);
  if (!orderDetails) return <PageNotFound />;

  return (
    <div className="flex flex-col gap-5">
      <p>
        Cảm ơn bạn đã mua khóa học{" "}
        <strong className="text-primary">{orderDetails.course.title}</strong>{" "}
        với số tiền là{" "}
        <strong className="text-primary">
          {formatVndPrice(orderDetails.total)}
        </strong>
      </p>
      <p>
        Bạn vui lòng thanh toán theo thông tin tài khoản dưới đây với nội dung{" "}
        <strong className="text-primary">{orderDetails.code}</strong>
      </p>
    </div>
  );
};

export default OrderDetails;
