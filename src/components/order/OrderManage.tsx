"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import { allValue, orderStatus } from "@/constants";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { EOrderStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { formatVndPrice } from "@/utils/helpers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChangeEvent } from "react";
import { debounce } from "lodash";
import type { TGetAllOrderResponse } from "@/types";
import { updateOrderStatus } from "@/lib/actions/order.actions";
import { StatusBadge } from "../common";
import useQueryString from "@/app/hooks/useQueryString";
import TableActions from "../common/TableActions";
import TableActionItem from "../common/TableActionItem";
import Pagination from "../common/Pagination";
import EmptyData from "../common/EmptyData";

function OrderManage({
  orders,
  totalPages = 1,
  page = 1,
  search,
  status,
}: {
  orders: TGetAllOrderResponse[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  status: EOrderStatus;
}) {
  const { onSearch, onChangeFilterStatus, onChangePage } = useQueryString();

  const handleChangeStatus = async (orderId: string, status: EOrderStatus) => {
    const isCanceling = status === EOrderStatus.CANCELED;
    Swal.fire({
      title: isCanceling
        ? "Bạn có chắc muốn hủy đơn hàng này không?"
        : "Bạn có chắc muốn xác nhận đơn hàng này không",
      icon: isCanceling ? "warning" : "question",
      showCancelButton: true,
      confirmButtonText: isCanceling ? "Đồng ý" : "Cập nhật",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateOrderStatus({
            orderId,
            status,
            path: "/manage/order",
          });
          if (res?.success) {
            toast.success("Cập nhật đơn hàng thành công");
          }
          onChangeFilterStatus("");
        } catch (error) {}
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm đơn hàng..."
              onChange={onSearch}
            />
          </div>
          <Select
            value={status || allValue}
            onValueChange={(value) =>
              onChangeFilterStatus<EOrderStatus | string>(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {orderStatus.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!orders?.length && <EmptyData />}
          {!!orders?.length &&
            orders?.map((order) => {
              const foundOrderStatus = orderStatus.find(
                (status) => status.value === order.status
              );
              return (
                <TableRow key={order._id}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{formatVndPrice(order.amount)}</span>
                      {order.discount > 0 && (
                        <span>{formatVndPrice(order.discount)}</span>
                      )}
                      <span
                        className={cn(
                          foundOrderStatus?.className,
                          "bg-inherit"
                        )}
                      >
                        {formatVndPrice(order.total)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>{order.coupon?.code || ""}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      item={{
                        className: foundOrderStatus?.className,
                        title: foundOrderStatus?.title || "",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TableActions>
                      {order.status === EOrderStatus.PENDING && (
                        <TableActionItem
                          type="check"
                          onClick={() =>
                            handleChangeStatus(
                              order._id,
                              EOrderStatus.COMPLETED
                            )
                          }
                        />
                      )}
                      {order.status !== EOrderStatus.CANCELED && (
                        <TableActionItem
                          type="cancel"
                          onClick={() =>
                            handleChangeStatus(order._id, EOrderStatus.CANCELED)
                          }
                        />
                      )}
                    </TableActions>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        currPage={page}
        totalPage={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
}

export default OrderManage;
