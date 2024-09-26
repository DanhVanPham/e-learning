import React from "react";
import { getOrderDetails } from "@/lib/actions/order.actions";
import PageNotFound from "@/app/not-found";
import { formatVndPrice } from "@/utils/helpers";
import Link from "next/link";

const OrderDetails = async ({ params }: { params: { code: string } }) => {
  const code = params.code;

  const orderDetails = await getOrderDetails({ code });

  if (!orderDetails) return <PageNotFound />;

  return (
    <div className="bg-white rounded-lg border bgDarkMode borderDarkMode p-5 flex text-sm lg:text-base flex-col gap-3 font-medium">
      <div>
        Cảm ơn bạn đã đặt mua khóa học{" "}
        <strong className="text-primary">{orderDetails.course.title}</strong>.
      </div>
      <div>
        Bạn vui lòng thanh toán vào thông tin tài khoản dưới đây với nội dung
        chuyển khoản là{" "}
        <strong className="text-secondary">{orderDetails.code}</strong>
      </div>
      <div className="max-w-[400px]">
        <div className="relative w-full rounded-lg overflow-auto border borderDarkMode">
          <table className="w-full caption-bottom text-xs lg:text-sm">
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b border-slate-200 dark:border-opacity-10 h-12">
                <td className="p-4 align-middle">Số tài khoản</td>
                <td className="p-4 align-middle">
                  <strong>xxxxxxx</strong>
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-opacity-10 h-12">
                <td className="p-4 align-middle">Tên tài khoản</td>
                <td className="p-4 align-middle">
                  <strong>Pham Van Danh</strong>
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-opacity-10 h-12">
                <td className="p-4 align-middle">Ngân hàng</td>
                <td className="p-4 align-middle">
                  <strong>Ngân hàng Vietcombank</strong>
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-opacity-10 h-12">
                <td className="p-4 align-middle">Số tiền cần thanh toán</td>
                <td className="p-4 align-middle">
                  <strong className="text-secondary">
                    {formatVndPrice(orderDetails.total)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        Nếu bạn cần hỗ trợ, vui lòng liên hệ Admin qua fb cá nhân:{" "}
        <Link
          className="text-primary cursor-pointer hover:underline"
          href="https://www.facebook.com/pham.vn.7"
        >
          Danh_pham
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
